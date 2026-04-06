# ============================================================
# Plastic Reuse Engine - Gemma 4 Fine-tuning with Unsloth
# Paste each CELL section as a separate cell in Google Colab
# Runtime: T4 GPU (free tier)
# ============================================================

# ---- CELL 1: Install ----
# !pip install unsloth trl datasets transformers accelerate bitsandbytes
# !pip install --upgrade --no-cache-dir unsloth unsloth_zoo

# ---- CELL 2: Load Gemma 4 ----
from unsloth import FastLanguageModel
import torch

model, tokenizer = FastLanguageModel.from_pretrained(
    model_name="unsloth/gemma-4-E4B-it-unsloth-bnb-4bit",
    max_seq_length=2048,
    dtype=None,
    load_in_4bit=True,
)
print("Model loaded")

# ---- CELL 3: Add LoRA adapters ----
model = FastLanguageModel.get_peft_model(
    model,
    r=16,
    target_modules=["q_proj","k_proj","v_proj","o_proj","gate_proj","up_proj","down_proj"],
    lora_alpha=16,
    lora_dropout=0,
    bias="none",
    use_gradient_checkpointing="unsloth",
    random_state=42,
)
print("LoRA ready")

# ---- CELL 4: Build dataset ----
from datasets import Dataset

SYSTEM = (
    "Eres PlasticAI, experto en clasificacion y reutilizacion de plasticos integrado en el Plastic Reuse Engine. "
    "Recibes el resultado de un modelo de vision por computadora que identifico un objeto plastico. "
    "Tu trabajo es interpretar ese resultado, confirmar el tipo de plastico, y dar recomendaciones practicas. "
    "Siempre respondes en el idioma del usuario. Eres conciso, practico y seguro."
)

EXAMPLES = [
    # Botellas PET
    ("Vision: 'water bottle (71%), plastic bottle (12%)'. Tipo: PET. Score: 82/100.",
     "Botella PET en buenas condiciones, score 82/100. "
     "Usos: maceta cortando la parte superior, porta-lapices, comedero para pajaros, mini invernadero. "
     "Limpiala bien antes de usar. Quieres explorar usos mas creativos?"),

    ("Vision: 'pop bottle (65%), soda bottle (18%)'. Tipo: PET. Score: 75/100.",
     "Botella PET de refresco, score 75/100. "
     "Lavala con agua caliente y bicarbonato para eliminar azucar residual. "
     "Usos: maceta, lampara decorativa, o ecobrick rellenandola con plastico compactado."),

    ("Vision: 'beer bottle (45%), wine bottle (22%)'. Tipo: PET. Score: 70/100.",
     "Botella PET, score 70/100. Lavala bien para eliminar residuos. "
     "Usos: maceta, organizador, proyecto decorativo. "
     "El PET transparente es ideal para ver el contenido."),

    # Envases HDPE
    ("Vision: 'detergent (68%), soap dispenser (15%)'. Tipo: HDPE. Score: 88/100.",
     "Envase HDPE de detergente, score 88/100, excelente para reutilizar. "
     "Lavalo varias veces con agua caliente. "
     "Usos: regadera perforando la tapa, organizador de herramientas, maceta para exteriores."),

    ("Vision: 'shampoo (72%), hair dryer (8%)'. Tipo: HDPE. Score: 85/100.",
     "Envase de shampoo HDPE, score 85/100. "
     "Usos: dispensador de agua para plantas, organizador de brochas, molde para fundicion. "
     "El HDPE es uno de los plasticos mas seguros para manipular."),

    ("Vision: 'milk can (55%), jug (20%)'. Tipo: HDPE. Score: 90/100.",
     "Envase de leche HDPE, score 90/100, condicion excelente. "
     "Usos: maceta grande, regadera, almacenamiento de granos, comedero de pajaros. "
     "El HDPE blanco refleja el calor, ideal para plantas en exteriores."),

    # Bolsas LDPE
    ("Vision: 'plastic bag (78%), shopping bag (12%)'. Tipo: LDPE. Score: 45/100.",
     "Bolsa plastica LDPE, score 45/100. "
     "Usos inmediatos: reutilizar para compras, bolsa de basura pequena. "
     "Proyecto: tejerla en plarn con otras bolsas para hacer bolsos impermeables."),

    ("Vision: 'plastic wrap (62%), cling wrap (18%)'. Tipo: LDPE. Score: 35/100.",
     "Film plastico LDPE, score 35/100. "
     "Si esta limpio: proteger objetos en almacenamiento. "
     "Para reciclaje: llevalo a puntos de recoleccion de plastico flexible."),

    # Contenedores PP
    ("Vision: 'cup (58%), tub (15%), beaker (10%)'. Tipo: PP. Score: 65/100.",
     "Recipiente PP, score 65/100. "
     "El PP resiste hasta 100 grados. "
     "Usos: maceta pequena, organizador de semillas, molde para jabones, almacenamiento de tornillos."),

    ("Vision: 'food container (70%), container (15%)'. Tipo: PP. Score: 72/100.",
     "Contenedor de alimentos PP, score 72/100. "
     "Usos: organizador de escritorio, maceta, contenedor para semillas, molde para manualidades. "
     "El PP resiste la mayoria de quimicos de limpieza."),

    ("Vision: 'bathtub (42%), bucket (25%)'. Tipo: PP. Score: 68/100.",
     "Recipiente grande PP, score 68/100. "
     "Usos: maceta para plantas medianas, contenedor de herramientas, base para compostaje. "
     "El PP es duradero y resistente a la intemperie."),

    # Poliestireno PS
    ("Vision: 'tray (55%), plate (20%), foam (12%)'. Tipo: PS. Score: 25/100.",
     "Bandeja PS, score 25/100, opciones muy limitadas. "
     "Usos posibles: maceta temporal, base para manualidades ligeras. "
     "Evita calentarlo. Busca puntos de recoleccion especificos para PS."),

    ("Vision: 'breastplate (35%), goblet (12%)'. Tipo: PS. Score: 30/100.",
     "Objeto PS, score 30/100. Opciones de reutilizacion limitadas. "
     "Usos decorativos o de almacenamiento ligero son los mas adecuados. "
     "No apliques calor, el PS es fragil."),

    # UNKNOWN - baja confianza
    ("Vision: 'oxygen mask (22%), gas helmet (18%)'. Tipo: UNKNOWN. Score: 20/100.",
     "No pude identificar claramente este plastico, score 20/100. "
     "Busca el simbolo de reciclaje en la base: triangulo con numero del 1 al 7. "
     "Sin identificacion clara, llevalo a un punto de reciclaje para clasificacion profesional."),

    ("Vision: 'sunglasses (28%), dark glasses (15%)'. Tipo: UNKNOWN. Score: 15/100.",
     "Deteccion con baja confianza, UNKNOWN score 15/100. "
     "Para identificar: busca el simbolo triangular en la base, "
     "o prueba si flota en agua (HDPE/PP/LDPE flotan, PET/PVC se hunden)."),

    # Conversacion post-deteccion
    ("Vision: PET score 82. Usuario pregunta: quiero hacer una lampara.",
     "Para lampara con botella PET: "
     "1. Limpia bien la botella. "
     "2. Corta la base para crear la pantalla. "
     "3. Usa tira LED de bajo voltaje dentro. "
     "4. Calienta suavemente con pistola de calor para crear texturas. "
     "El PET transparente difunde la luz de manera muy bonita."),

    ("Vision: HDPE score 88. Usuario pregunta: puedo hacer muebles?",
     "Si, el HDPE es ideal para muebles de exterior. "
     "Con envases grandes puedes hacer taburetes apilando y uniendo con tornillos. "
     "Fundiendo HDPE puedes crear tablas para bancas o mesas. "
     "El HDPE fundido resiste agua, UV y no se pudre."),

    ("Vision: PP score 65. Usuario pregunta: sirve para jardin?",
     "Si, el PP es excelente para el jardin con score 65. "
     "Usos: macetas, bandejas para semilleros, soportes para plantas, contenedores para compost. "
     "Perfora la base para drenaje con un clavo caliente."),

    ("Vision: LDPE score 45. Usuario pregunta: que hago con muchas bolsas?",
     "Con muchas bolsas LDPE: "
     "Plarn: tejelas en hilo para bolsos o tapetes impermeables. "
     "Laminado: plancha capas entre papel encerado para crear telas plasticas. "
     "Ecobrick: usaas para rellenar botellas PET compactadas."),

    ("Vision: PVC score 20. Usuario pregunta: es peligroso?",
     "El PVC con score 20 requiere precaucion. "
     "No es peligroso en uso normal, pero si lo calientas libera gases toxicos con cloro. "
     "Reutilizacion segura: usalo en frio para estructuras de jardin o decoracion. "
     "Nunca lo quemes ni lo uses para alimentos."),

    # Preguntas rapidas
    ("Vision detecto bottle water. Que tipo es?",
     "PET, codigo 1. Transparente, reciclable, score tipico 70-85."),

    ("Vision detecto plastic bag. Que tipo es?",
     "LDPE, codigo 4. Flexible, score tipico 35-50."),

    ("Vision detecto detergent container. Que tipo es?",
     "HDPE, codigo 2. Opaco rigido, score tipico 80-92."),

    ("Vision detecto foam tray. Que tipo es?",
     "PS expandido, codigo 6. Dificil reciclar, score tipico 20-30."),

    ("Vision detecto food container. Que tipo es?",
     "PP, codigo 5. Semitransparente, score tipico 60-75."),

    ("Vision detecto shampoo bottle. Que tipo es?",
     "HDPE, codigo 2. Score tipico 82-90."),

    ("Vision detecto cup plastic. Que tipo es?",
     "PP o PS. Si resiste calor es PP (score 60-70), si es fragil es PS (score 25-35)."),

    ("Vision detecto milk jug. Que tipo es?",
     "HDPE, codigo 2. Score tipico 88-95."),

    ("Vision detecto plastic wrap. Que tipo es?",
     "LDPE, codigo 4. Score tipico 30-45."),

    ("Vision detecto pipe tube. Que tipo es?",
     "PVC, codigo 3. Score tipico 15-25. Manejo especial requerido."),
]

def fmt(instruction, response):
    return {
        "text": (
            f"<start_of_turn>user\n{SYSTEM}\n\n{instruction}<end_of_turn>\n"
            f"<start_of_turn>model\n{response}<end_of_turn>"
        )
    }

dataset = Dataset.from_list([fmt(i, r) for i, r in EXAMPLES])
print(f"Dataset: {len(dataset)} examples")
print(dataset[0]["text"][:200])

# ---- CELL 5: Train ----
from trl import SFTTrainer
from transformers import TrainingArguments
from unsloth import is_bfloat16_supported

trainer = SFTTrainer(
    model=model,
    tokenizer=tokenizer,
    train_dataset=dataset,
    dataset_text_field="text",
    max_seq_length=2048,
    dataset_num_proc=2,
    packing=False,
    args=TrainingArguments(
        per_device_train_batch_size=2,
        gradient_accumulation_steps=4,
        warmup_steps=5,
        num_train_epochs=3,
        learning_rate=2e-4,
        fp16=not is_bfloat16_supported(),
        bf16=is_bfloat16_supported(),
        logging_steps=1,
        optim="adamw_8bit",
        weight_decay=0.01,
        lr_scheduler_type="linear",
        seed=42,
        output_dir="/content/plastic_gemma4",
        report_to="none",
    ),
)
trainer.train()
print("Training complete")

# ---- CELL 6: Test ----
FastLanguageModel.for_inference(model)

def ask(q):
    prompt = f"<start_of_turn>user\n{SYSTEM}\n\n{q}<end_of_turn>\n<start_of_turn>model\n"
    inputs = tokenizer([prompt], return_tensors="pt").to("cuda")
    out = model.generate(**inputs, max_new_tokens=200, temperature=0.7, top_p=0.9, use_cache=True)
    text = tokenizer.batch_decode(out)[0]
    return text.split("<start_of_turn>model")[-1].replace("<end_of_turn>", "").strip()

print(ask("Vision: 'shampoo (72%), lotion (8%)'. Tipo: HDPE. Score: 85/100."))
print("---")
print(ask("Vision: 'plastic bag (78%)'. Tipo: LDPE. Score: 45/100. Usuario: que hago con 50 bolsas?"))

# ---- CELL 7: Export GGUF for LiteRT/MediaPipe ----
model.save_pretrained_gguf(
    "/content/plastic_gemma4_gguf",
    tokenizer,
    quantization_method="q4_k_m",
)
import os
for f in os.listdir("/content/plastic_gemma4_gguf"):
    mb = os.path.getsize(f"/content/plastic_gemma4_gguf/{f}") / 1024 / 1024
    print(f"{f}: {mb:.1f} MB")

# ---- CELL 8: Upload to HuggingFace (optional) ----
# model.push_to_hub_gguf(
#     "YOUR_USERNAME/plastic-gemma4",
#     tokenizer,
#     quantization_method="q4_k_m",
#     token="YOUR_HF_TOKEN"
# )

# ---- CELL 9: Download ----
from google.colab import files
import glob
for f in glob.glob("/content/plastic_gemma4_gguf/*.gguf"):
    files.download(f)
