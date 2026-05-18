/**
 * Base de conocimiento enriquecida en español — Plastic Reuse Engine
 * Estructura compatible: KB[tipo] = [ { kw:['palabras','clave'], r:'respuesta' }, ... ]
 * Consultar con: matchKB(tipo, pregunta)
 *
 * Esta versión amplía considerablemente los ejemplos de uso por material:
 * PET, HDPE, PP, PS, LDPE, PVC, OTHER y UNKNOWN.
 * Incluye respuestas conservadoras para seguridad, limpieza, reciclaje y reutilización.
 */
const KB = {
  "PET": [
    {
      "kw": [
        "calor",
        "microondas",
        "hervir",
        "temperatura"
      ],
      "r": "No calientes PET ni lo uses en microondas. Para líquidos calientes o comida caliente, usa vidrio o un recipiente PP apto para microondas."
    },
    {
      "kw": [
        "reciclar",
        "reciclaje",
        "codigo 1",
        "botella"
      ],
      "r": "El PET código 1 suele ser reciclable si está limpio, seco y aplastado. Separa tapas y etiquetas si el programa local lo solicita."
    },
    {
      "kw": [
        "olor",
        "leche",
        "jugo",
        "limpiar"
      ],
      "r": "Si tuvo leche o jugo, lava con jabón, enjuaga y deja secar boca abajo; si conserva olor fuerte, es mejor reciclarlo."
    },
    {
      "kw": [
        "maceta colgante",
        "maceta",
        "planta",
        "colgante",
        "jardin",
        "pet"
      ],
      "r": "Uso recomendado para PET: maceta colgante. corta la botella por la mitad, abre drenajes y cuélgala con cuerda; úsala para plantas livianas o aromáticas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "semillero individual",
        "semillero",
        "siembra",
        "semilla",
        "germinacion",
        "pet"
      ],
      "r": "Uso recomendado para PET: semillero individual. corta la base, perfora drenajes y úsala para germinar semillas antes de trasplantarlas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "jardín vertical",
        "jardin vertical",
        "pared verde",
        "huerta vertical",
        "pet"
      ],
      "r": "Uso recomendado para PET: jardín vertical. une varias botellas PET a una tabla o malla y crea módulos de siembra vertical para espacios pequeños. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "regadera suave",
        "regadera",
        "riego",
        "regar",
        "agua",
        "pet"
      ],
      "r": "Uso recomendado para PET: regadera suave. perfora la tapa con varios agujeros pequeños y úsala para regar plantas sin maltratar la tierra. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "embudo",
        "trasvasar",
        "llenar",
        "pet"
      ],
      "r": "Uso recomendado para PET: embudo. corta la parte superior y úsala como embudo para pasar semillas, arena o líquidos fríos no peligrosos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de lápices",
        "lapiz",
        "portalapiz",
        "escritorio",
        "boligrafo",
        "pet"
      ],
      "r": "Uso recomendado para PET: organizador de lápices. corta la base a la altura deseada, lija el borde y decora para guardar lápices, tijeras o marcadores. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de cables",
        "cable",
        "usb",
        "cargador",
        "organizar",
        "pet"
      ],
      "r": "Uso recomendado para PET: organizador de cables. corta cilindros cortos, redondea bordes y úsalos para separar cargadores, cables USB o audífonos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "dispensador de bolsas",
        "bolsa",
        "dispensador",
        "cocina",
        "pet"
      ],
      "r": "Uso recomendado para PET: dispensador de bolsas. abre una ventana lateral, coloca bolsas limpias adentro y sácalas por la boca de la botella. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "comedero para aves",
        "comedero",
        "ave",
        "pajaro",
        "semilla",
        "pet"
      ],
      "r": "Uso recomendado para PET: comedero para aves. haz orificios laterales, inserta una percha de madera y llena con semillas; cuélgalo lejos de gatos y zonas de mucho viento. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "bebedero para aves",
        "bebedero",
        "ave",
        "agua",
        "pajaro",
        "pet"
      ],
      "r": "Uso recomendado para PET: bebedero para aves. puedes usarla como depósito de agua fría para aves, lavándola con frecuencia para evitar algas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de plántulas",
        "protector",
        "plantula",
        "huerta",
        "viento",
        "pet"
      ],
      "r": "Uso recomendado para PET: protector de plántulas. corta la base y coloca la botella como campana sobre plántulas pequeñas para protegerlas de viento o insectos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "mini invernadero",
        "invernadero",
        "germinacion",
        "humedad",
        "pet"
      ],
      "r": "Uso recomendado para PET: mini invernadero. usa la botella transparente como cubierta para conservar humedad en semilleros, ventilando a diario. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "terrario simple",
        "terrario",
        "observacion",
        "insecto",
        "pet"
      ],
      "r": "Uso recomendado para PET: terrario simple. usa botellas grandes y limpias para observación educativa temporal de plantas o insectos; no encierres animales por largo tiempo. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "trampa de insectos no tóxica",
        "trampa",
        "mosquito",
        "mosca",
        "insecto",
        "pet"
      ],
      "r": "Uso recomendado para PET: trampa de insectos no tóxica. arma una trampa tipo embudo con soluciones no tóxicas y cámbiala con frecuencia para evitar malos olores. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "recipiente para tornillos",
        "tornillo",
        "tuerca",
        "herrajes",
        "taller",
        "pet"
      ],
      "r": "Uso recomendado para PET: recipiente para tornillos. usa botellas pequeñas secas para separar tornillos, tuercas, arandelas o piezas pequeñas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor de granos secos",
        "granos",
        "arroz",
        "lenteja",
        "frijol",
        "avena",
        "pet"
      ],
      "r": "Uso recomendado para PET: contenedor de granos secos. puede guardar granos secos si estuvo destinada a bebidas o alimentos, está limpia y completamente seca; etiqueta la fecha. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "alcancía",
        "alcancia",
        "monedas",
        "ahorro",
        "pet"
      ],
      "r": "Uso recomendado para PET: alcancía. haz una ranura en el cuerpo, decora y usa como alcancía para monedas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "juego de bolos",
        "juego",
        "bolos",
        "niños",
        "actividad",
        "pet"
      ],
      "r": "Uso recomendado para PET: juego de bolos. llena parcialmente varias botellas con arena para dar estabilidad y úsalas como bolos caseros. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "mancuernas livianas",
        "mancuerna",
        "peso",
        "ejercicio",
        "pet"
      ],
      "r": "Uso recomendado para PET: mancuernas livianas. llena con agua o arena para ejercicios suaves; revisa que la tapa cierre bien y no uses pesos excesivos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "señalizador reflectivo",
        "señal",
        "reflectivo",
        "bicicleta",
        "seguridad",
        "pet"
      ],
      "r": "Uso recomendado para PET: señalizador reflectivo. corta tiras limpias y combínalas con cinta reflectiva para señalizar objetos o zonas de baja visibilidad. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "lámpara decorativa fría",
        "lampara",
        "luz",
        "decoracion",
        "led",
        "pet"
      ],
      "r": "Uso recomendado para PET: lámpara decorativa fría. úsala con luces LED de baja temperatura; evita bombillos calientes porque el PET se deforma con calor. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "florero temporal",
        "florero",
        "flores",
        "decoracion",
        "pet"
      ],
      "r": "Uso recomendado para PET: florero temporal. corta y decora la botella para flores; úsala con agua fría y cámbiala con frecuencia. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de baño",
        "baño",
        "cepillo",
        "peine",
        "organizador",
        "pet"
      ],
      "r": "Uso recomendado para PET: organizador de baño. corta recipientes PET para guardar cepillos o peines; evita bordes filosos y seca bien para prevenir hongos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "porta brochas",
        "brocha",
        "pincel",
        "arte",
        "pintura",
        "pet"
      ],
      "r": "Uso recomendado para PET: porta brochas. usa la base como vaso para brochas, pinceles o herramientas de arte, siempre con líquidos fríos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de cables en pared",
        "canaleta",
        "cable",
        "protector",
        "pet"
      ],
      "r": "Uso recomendado para PET: protector de cables en pared. tiras de PET pueden servir como cubierta temporal de cables de baja tensión; no las uses en instalaciones eléctricas riesgosas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de cajones",
        "cajon",
        "separador",
        "ropa",
        "orden",
        "pet"
      ],
      "r": "Uso recomendado para PET: separador de cajones. corta láminas y úsalas como divisores livianos dentro de cajones. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "marcadores de plantas",
        "etiqueta",
        "marcador",
        "planta",
        "huerta",
        "pet"
      ],
      "r": "Uso recomendado para PET: marcadores de plantas. corta tiras, escribe el nombre de la planta con marcador permanente y colócalas en la tierra. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de lluvia para enchufes exteriores",
        "lluvia",
        "protector",
        "exterior",
        "pet"
      ],
      "r": "Uso recomendado para PET: protector de lluvia para enchufes exteriores. solo como cubierta física temporal sin contacto eléctrico; no reemplaza cajas certificadas para intemperie. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor de arena para gatos",
        "arena",
        "gato",
        "mascota",
        "pet"
      ],
      "r": "Uso recomendado para PET: contenedor de arena para gatos. usa botellas grandes limpias para guardar arena seca o accesorios de mascota; no almacenes comida si la botella no era alimentaria. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "manualidades con flores",
        "flor",
        "manualidad",
        "decoracion",
        "pet"
      ],
      "r": "Uso recomendado para PET: manualidades con flores. corta la base en forma de pétalos, pinta con acrílico y arma flores decorativas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "maceta colgante",
        "hogar",
        "maceta",
        "planta",
        "colgante",
        "jardin",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: maceta colgante. corta la botella por la mitad, abre drenajes y cuélgala con cuerda; úsala para plantas livianas o aromáticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "semillero individual",
        "hogar",
        "semillero",
        "siembra",
        "semilla",
        "germinacion",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: semillero individual. corta la base, perfora drenajes y úsala para germinar semillas antes de trasplantarlas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "jardín vertical",
        "hogar",
        "jardin vertical",
        "pared verde",
        "huerta vertical",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: jardín vertical. une varias botellas PET a una tabla o malla y crea módulos de siembra vertical para espacios pequeños. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "regadera suave",
        "hogar",
        "regadera",
        "riego",
        "regar",
        "agua",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: regadera suave. perfora la tapa con varios agujeros pequeños y úsala para regar plantas sin maltratar la tierra. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "embudo",
        "hogar",
        "trasvasar",
        "llenar",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: embudo. corta la parte superior y úsala como embudo para pasar semillas, arena o líquidos fríos no peligrosos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de lápices",
        "hogar",
        "lapiz",
        "portalapiz",
        "escritorio",
        "boligrafo",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: organizador de lápices. corta la base a la altura deseada, lija el borde y decora para guardar lápices, tijeras o marcadores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cables",
        "hogar",
        "cable",
        "usb",
        "cargador",
        "organizar",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: organizador de cables. corta cilindros cortos, redondea bordes y úsalos para separar cargadores, cables USB o audífonos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "dispensador de bolsas",
        "hogar",
        "bolsa",
        "dispensador",
        "cocina",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: dispensador de bolsas. abre una ventana lateral, coloca bolsas limpias adentro y sácalas por la boca de la botella. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comedero para aves",
        "hogar",
        "comedero",
        "ave",
        "pajaro",
        "semilla",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: comedero para aves. haz orificios laterales, inserta una percha de madera y llena con semillas; cuélgalo lejos de gatos y zonas de mucho viento. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "bebedero para aves",
        "hogar",
        "bebedero",
        "ave",
        "agua",
        "pajaro",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: bebedero para aves. puedes usarla como depósito de agua fría para aves, lavándola con frecuencia para evitar algas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de plántulas",
        "hogar",
        "protector",
        "plantula",
        "huerta",
        "viento",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: protector de plántulas. corta la base y coloca la botella como campana sobre plántulas pequeñas para protegerlas de viento o insectos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "mini invernadero",
        "hogar",
        "invernadero",
        "germinacion",
        "humedad",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: mini invernadero. usa la botella transparente como cubierta para conservar humedad en semilleros, ventilando a diario. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "terrario simple",
        "hogar",
        "terrario",
        "observacion",
        "insecto",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: terrario simple. usa botellas grandes y limpias para observación educativa temporal de plantas o insectos; no encierres animales por largo tiempo. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "trampa de insectos no tóxica",
        "hogar",
        "trampa",
        "mosquito",
        "mosca",
        "insecto",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: trampa de insectos no tóxica. arma una trampa tipo embudo con soluciones no tóxicas y cámbiala con frecuencia para evitar malos olores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "recipiente para tornillos",
        "hogar",
        "tornillo",
        "tuerca",
        "herrajes",
        "taller",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: recipiente para tornillos. usa botellas pequeñas secas para separar tornillos, tuercas, arandelas o piezas pequeñas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de granos secos",
        "hogar",
        "granos",
        "arroz",
        "lenteja",
        "frijol",
        "avena",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: contenedor de granos secos. puede guardar granos secos si estuvo destinada a bebidas o alimentos, está limpia y completamente seca; etiqueta la fecha. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "alcancía",
        "hogar",
        "alcancia",
        "monedas",
        "ahorro",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: alcancía. haz una ranura en el cuerpo, decora y usa como alcancía para monedas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juego de bolos",
        "hogar",
        "juego",
        "bolos",
        "niños",
        "actividad",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: juego de bolos. llena parcialmente varias botellas con arena para dar estabilidad y úsalas como bolos caseros. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "mancuernas livianas",
        "hogar",
        "mancuerna",
        "peso",
        "ejercicio",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: mancuernas livianas. llena con agua o arena para ejercicios suaves; revisa que la tapa cierre bien y no uses pesos excesivos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "señalizador reflectivo",
        "hogar",
        "señal",
        "reflectivo",
        "bicicleta",
        "seguridad",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: señalizador reflectivo. corta tiras limpias y combínalas con cinta reflectiva para señalizar objetos o zonas de baja visibilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "lámpara decorativa fría",
        "hogar",
        "lampara",
        "luz",
        "decoracion",
        "led",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: lámpara decorativa fría. úsala con luces LED de baja temperatura; evita bombillos calientes porque el PET se deforma con calor. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "florero temporal",
        "hogar",
        "florero",
        "flores",
        "decoracion",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: florero temporal. corta y decora la botella para flores; úsala con agua fría y cámbiala con frecuencia. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de baño",
        "hogar",
        "baño",
        "cepillo",
        "peine",
        "organizador",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: organizador de baño. corta recipientes PET para guardar cepillos o peines; evita bordes filosos y seca bien para prevenir hongos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta brochas",
        "hogar",
        "brocha",
        "pincel",
        "arte",
        "pintura",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: porta brochas. usa la base como vaso para brochas, pinceles o herramientas de arte, siempre con líquidos fríos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de cables en pared",
        "hogar",
        "canaleta",
        "cable",
        "protector",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: protector de cables en pared. tiras de PET pueden servir como cubierta temporal de cables de baja tensión; no las uses en instalaciones eléctricas riesgosas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de cajones",
        "hogar",
        "cajon",
        "separador",
        "ropa",
        "orden",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: separador de cajones. corta láminas y úsalas como divisores livianos dentro de cajones. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marcadores de plantas",
        "hogar",
        "etiqueta",
        "marcador",
        "planta",
        "huerta",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: marcadores de plantas. corta tiras, escribe el nombre de la planta con marcador permanente y colócalas en la tierra. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de lluvia para enchufes exteriores",
        "hogar",
        "lluvia",
        "protector",
        "exterior",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: protector de lluvia para enchufes exteriores. solo como cubierta física temporal sin contacto eléctrico; no reemplaza cajas certificadas para intemperie. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de arena para gatos",
        "hogar",
        "arena",
        "gato",
        "mascota",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: contenedor de arena para gatos. usa botellas grandes limpias para guardar arena seca o accesorios de mascota; no almacenes comida si la botella no era alimentaria. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "manualidades con flores",
        "hogar",
        "flor",
        "manualidad",
        "decoracion",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en casa con PET: manualidades con flores. corta la base en forma de pétalos, pinta con acrílico y arma flores decorativas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "maceta colgante",
        "colegio",
        "maceta",
        "planta",
        "colgante",
        "jardin",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: maceta colgante. corta la botella por la mitad, abre drenajes y cuélgala con cuerda; úsala para plantas livianas o aromáticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "semillero individual",
        "colegio",
        "semillero",
        "siembra",
        "semilla",
        "germinacion",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: semillero individual. corta la base, perfora drenajes y úsala para germinar semillas antes de trasplantarlas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "jardín vertical",
        "colegio",
        "jardin vertical",
        "pared verde",
        "huerta vertical",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: jardín vertical. une varias botellas PET a una tabla o malla y crea módulos de siembra vertical para espacios pequeños. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "regadera suave",
        "colegio",
        "regadera",
        "riego",
        "regar",
        "agua",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: regadera suave. perfora la tapa con varios agujeros pequeños y úsala para regar plantas sin maltratar la tierra. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "embudo",
        "colegio",
        "trasvasar",
        "llenar",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: embudo. corta la parte superior y úsala como embudo para pasar semillas, arena o líquidos fríos no peligrosos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de lápices",
        "colegio",
        "lapiz",
        "portalapiz",
        "escritorio",
        "boligrafo",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: organizador de lápices. corta la base a la altura deseada, lija el borde y decora para guardar lápices, tijeras o marcadores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cables",
        "colegio",
        "cable",
        "usb",
        "cargador",
        "organizar",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: organizador de cables. corta cilindros cortos, redondea bordes y úsalos para separar cargadores, cables USB o audífonos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "dispensador de bolsas",
        "colegio",
        "bolsa",
        "dispensador",
        "cocina",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: dispensador de bolsas. abre una ventana lateral, coloca bolsas limpias adentro y sácalas por la boca de la botella. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comedero para aves",
        "colegio",
        "comedero",
        "ave",
        "pajaro",
        "semilla",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: comedero para aves. haz orificios laterales, inserta una percha de madera y llena con semillas; cuélgalo lejos de gatos y zonas de mucho viento. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "bebedero para aves",
        "colegio",
        "bebedero",
        "ave",
        "agua",
        "pajaro",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: bebedero para aves. puedes usarla como depósito de agua fría para aves, lavándola con frecuencia para evitar algas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de plántulas",
        "colegio",
        "protector",
        "plantula",
        "huerta",
        "viento",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: protector de plántulas. corta la base y coloca la botella como campana sobre plántulas pequeñas para protegerlas de viento o insectos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "mini invernadero",
        "colegio",
        "invernadero",
        "germinacion",
        "humedad",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: mini invernadero. usa la botella transparente como cubierta para conservar humedad en semilleros, ventilando a diario. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "terrario simple",
        "colegio",
        "terrario",
        "observacion",
        "insecto",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: terrario simple. usa botellas grandes y limpias para observación educativa temporal de plantas o insectos; no encierres animales por largo tiempo. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "trampa de insectos no tóxica",
        "colegio",
        "trampa",
        "mosquito",
        "mosca",
        "insecto",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: trampa de insectos no tóxica. arma una trampa tipo embudo con soluciones no tóxicas y cámbiala con frecuencia para evitar malos olores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "recipiente para tornillos",
        "colegio",
        "tornillo",
        "tuerca",
        "herrajes",
        "taller",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: recipiente para tornillos. usa botellas pequeñas secas para separar tornillos, tuercas, arandelas o piezas pequeñas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de granos secos",
        "colegio",
        "granos",
        "arroz",
        "lenteja",
        "frijol",
        "avena",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: contenedor de granos secos. puede guardar granos secos si estuvo destinada a bebidas o alimentos, está limpia y completamente seca; etiqueta la fecha. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "alcancía",
        "colegio",
        "alcancia",
        "monedas",
        "ahorro",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: alcancía. haz una ranura en el cuerpo, decora y usa como alcancía para monedas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juego de bolos",
        "colegio",
        "juego",
        "bolos",
        "niños",
        "actividad",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: juego de bolos. llena parcialmente varias botellas con arena para dar estabilidad y úsalas como bolos caseros. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "mancuernas livianas",
        "colegio",
        "mancuerna",
        "peso",
        "ejercicio",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: mancuernas livianas. llena con agua o arena para ejercicios suaves; revisa que la tapa cierre bien y no uses pesos excesivos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "señalizador reflectivo",
        "colegio",
        "señal",
        "reflectivo",
        "bicicleta",
        "seguridad",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: señalizador reflectivo. corta tiras limpias y combínalas con cinta reflectiva para señalizar objetos o zonas de baja visibilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "lámpara decorativa fría",
        "colegio",
        "lampara",
        "luz",
        "decoracion",
        "led",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: lámpara decorativa fría. úsala con luces LED de baja temperatura; evita bombillos calientes porque el PET se deforma con calor. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "florero temporal",
        "colegio",
        "florero",
        "flores",
        "decoracion",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: florero temporal. corta y decora la botella para flores; úsala con agua fría y cámbiala con frecuencia. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de baño",
        "colegio",
        "baño",
        "cepillo",
        "peine",
        "organizador",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: organizador de baño. corta recipientes PET para guardar cepillos o peines; evita bordes filosos y seca bien para prevenir hongos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta brochas",
        "colegio",
        "brocha",
        "pincel",
        "arte",
        "pintura",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: porta brochas. usa la base como vaso para brochas, pinceles o herramientas de arte, siempre con líquidos fríos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de cables en pared",
        "colegio",
        "canaleta",
        "cable",
        "protector",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: protector de cables en pared. tiras de PET pueden servir como cubierta temporal de cables de baja tensión; no las uses en instalaciones eléctricas riesgosas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de cajones",
        "colegio",
        "cajon",
        "separador",
        "ropa",
        "orden",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: separador de cajones. corta láminas y úsalas como divisores livianos dentro de cajones. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marcadores de plantas",
        "colegio",
        "etiqueta",
        "marcador",
        "planta",
        "huerta",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: marcadores de plantas. corta tiras, escribe el nombre de la planta con marcador permanente y colócalas en la tierra. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de lluvia para enchufes exteriores",
        "colegio",
        "lluvia",
        "protector",
        "exterior",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: protector de lluvia para enchufes exteriores. solo como cubierta física temporal sin contacto eléctrico; no reemplaza cajas certificadas para intemperie. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de arena para gatos",
        "colegio",
        "arena",
        "gato",
        "mascota",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: contenedor de arena para gatos. usa botellas grandes limpias para guardar arena seca o accesorios de mascota; no almacenes comida si la botella no era alimentaria. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "manualidades con flores",
        "colegio",
        "flor",
        "manualidad",
        "decoracion",
        "reutilizar",
        "idea",
        "pet"
      ],
      "r": "Ejemplo en un proyecto escolar con PET: manualidades con flores. corta la base en forma de pétalos, pinta con acrílico y arma flores decorativas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    }
  ],
  "HDPE": [
    {
      "kw": [
        "quimico",
        "detergente",
        "shampoo",
        "agua potable",
        "guardar agua",
        "beber",
        "consumo",
        "tomar agua"
      ],
      "r": "Aunque el HDPE es resistente, no uses envases que tuvieron detergente, shampoo o químicos para agua potable o comida."
    },
    {
      "kw": [
        "reciclar",
        "codigo 2",
        "reciclaje"
      ],
      "r": "El HDPE código 2 suele tener buen valor de reciclaje. Entrégalo limpio, seco y sin residuos líquidos."
    },
    {
      "kw": [
        "resistente",
        "golpe",
        "exterior"
      ],
      "r": "HDPE es buena opción para usos exteriores y de taller porque resiste humedad e impacto mejor que plásticos frágiles."
    },
    {
      "kw": [
        "organizador de herramientas",
        "herramienta",
        "taller",
        "organizador",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: organizador de herramientas. corta una garrafa o botella HDPE y úsala para brocas, destornilladores o piezas pequeñas; es resistente a golpes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "pala de jardín",
        "pala",
        "jardin",
        "arena",
        "tierra",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: pala de jardín. recorta una botella de detergente limpia en forma de pala para tierra, arena o alimento seco de mascotas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "regadera resistente",
        "regadera",
        "riego",
        "agua",
        "planta",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: regadera resistente. un envase HDPE limpio funciona muy bien como regadera para plantas; perfora la tapa y úsalo solo para agua de riego. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor de limpieza",
        "limpieza",
        "trapo",
        "cepillo",
        "baño",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: contenedor de limpieza. reutiliza envases HDPE para guardar cepillos, guantes o paños de limpieza; no los mezcles con elementos de cocina. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de tornillos",
        "tornillo",
        "tuerca",
        "clavo",
        "herrajes",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: organizador de tornillos. corta la parte superior de envases pequeños y crea bandejas resistentes para herrajes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "maceta resistente",
        "maceta",
        "planta",
        "jardin",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: maceta resistente. los envases HDPE son excelentes macetas porque soportan humedad y golpes; haz drenajes y evita usar envases con residuos químicos sin lavar. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor de agua lluvia",
        "lluvia",
        "agua",
        "bidon",
        "recolectar",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: contenedor de agua lluvia. un bidón HDPE puede almacenar agua lluvia para riego o limpieza; usa tapa y malla para evitar hojas y mosquitos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "compostera pequeña",
        "compost",
        "compostera",
        "abono",
        "organico",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: compostera pequeña. un balde HDPE con ventilación puede servir para compostaje doméstico; no lo cierres herméticamente. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "banco o taburete simple",
        "banco",
        "silla",
        "mueble",
        "exterior",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: banco o taburete simple. envases HDPE robustos pueden integrarse como módulos de asiento si se rellenan y se fijan con seguridad. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "caja para cables",
        "cable",
        "extension",
        "cargador",
        "organizador",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: caja para cables. recorta un envase HDPE como caja de paso para guardar cargadores; no lo uses para cubrir conexiones calientes o defectuosas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de rodillas",
        "rodilla",
        "jardin",
        "protector",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: protector de rodillas. láminas de HDPE de bidones limpios pueden convertirse en protectores para jardinería, con bordes bien lijados. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "señalización exterior",
        "senal",
        "letrero",
        "exterior",
        "rotulo",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: señalización exterior. corta placas de HDPE y escribe etiquetas para huerta, bodega o taller; resiste mejor el agua que el cartón. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "comedero seco para mascotas",
        "mascota",
        "comedero",
        "croquetas",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: comedero seco para mascotas. solo si el envase nunca tuvo químicos; si fue detergente, úsalo mejor para guardar accesorios, no alimentos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "caja de primeros auxilios no médica",
        "botiquin",
        "emergencia",
        "caja",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: caja de primeros auxilios no médica. un contenedor HDPE limpio puede guardar gasas cerradas, curitas o herramientas de emergencia, sin contacto con líquidos contaminantes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "embudo resistente",
        "embudo",
        "trasvasar",
        "aceite",
        "liquido",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: embudo resistente. corta el cuello de un envase HDPE para crear un embudo para líquidos no alimentarios, como agua de riego o productos de limpieza diluidos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor para brochas",
        "brocha",
        "pintura",
        "pincel",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: contenedor para brochas. un envase HDPE soporta bien agua jabonosa para lavar brochas; no lo uses luego para alimentos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "soporte para celular en taller",
        "celular",
        "soporte",
        "taller",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: soporte para celular en taller. recorta una pieza firme y crea un soporte resistente para ver tutoriales mientras trabajas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "portamanguera pequeño",
        "manguera",
        "jardin",
        "soporte",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: portamanguera pequeño. envases HDPE rígidos pueden fijarse a pared para enrollar mangueras livianas o cuerdas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de residuos",
        "residuo",
        "separar",
        "reciclaje",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: separador de residuos. usa bidones HDPE cortados como estaciones de separación para tapas, pilas no peligrosas o plásticos limpios. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "caja para juguetes exteriores",
        "juguete",
        "niños",
        "exterior",
        "hdpe"
      ],
      "r": "Uso recomendado para HDPE: caja para juguetes exteriores. bidones o baldes HDPE limpios sirven para juguetes de patio; revisa bordes y tapas para evitar atrapamientos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de herramientas",
        "hogar",
        "herramienta",
        "taller",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: organizador de herramientas. corta una garrafa o botella HDPE y úsala para brocas, destornilladores o piezas pequeñas; es resistente a golpes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pala de jardín",
        "hogar",
        "pala",
        "jardin",
        "arena",
        "tierra",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: pala de jardín. recorta una botella de detergente limpia en forma de pala para tierra, arena o alimento seco de mascotas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "regadera resistente",
        "hogar",
        "regadera",
        "riego",
        "agua",
        "planta",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: regadera resistente. un envase HDPE limpio funciona muy bien como regadera para plantas; perfora la tapa y úsalo solo para agua de riego. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de limpieza",
        "hogar",
        "limpieza",
        "trapo",
        "cepillo",
        "baño",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: contenedor de limpieza. reutiliza envases HDPE para guardar cepillos, guantes o paños de limpieza; no los mezcles con elementos de cocina. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de tornillos",
        "hogar",
        "tornillo",
        "tuerca",
        "clavo",
        "herrajes",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: organizador de tornillos. corta la parte superior de envases pequeños y crea bandejas resistentes para herrajes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "maceta resistente",
        "hogar",
        "maceta",
        "planta",
        "jardin",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: maceta resistente. los envases HDPE son excelentes macetas porque soportan humedad y golpes; haz drenajes y evita usar envases con residuos químicos sin lavar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de agua lluvia",
        "hogar",
        "lluvia",
        "agua",
        "bidon",
        "recolectar",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: contenedor de agua lluvia. un bidón HDPE puede almacenar agua lluvia para riego o limpieza; usa tapa y malla para evitar hojas y mosquitos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "compostera pequeña",
        "hogar",
        "compost",
        "compostera",
        "abono",
        "organico",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: compostera pequeña. un balde HDPE con ventilación puede servir para compostaje doméstico; no lo cierres herméticamente. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "banco o taburete simple",
        "hogar",
        "banco",
        "silla",
        "mueble",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: banco o taburete simple. envases HDPE robustos pueden integrarse como módulos de asiento si se rellenan y se fijan con seguridad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para cables",
        "hogar",
        "cable",
        "extension",
        "cargador",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: caja para cables. recorta un envase HDPE como caja de paso para guardar cargadores; no lo uses para cubrir conexiones calientes o defectuosas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de rodillas",
        "hogar",
        "rodilla",
        "jardin",
        "protector",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: protector de rodillas. láminas de HDPE de bidones limpios pueden convertirse en protectores para jardinería, con bordes bien lijados. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "señalización exterior",
        "hogar",
        "senal",
        "letrero",
        "exterior",
        "rotulo",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: señalización exterior. corta placas de HDPE y escribe etiquetas para huerta, bodega o taller; resiste mejor el agua que el cartón. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comedero seco para mascotas",
        "hogar",
        "mascota",
        "comedero",
        "croquetas",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: comedero seco para mascotas. solo si el envase nunca tuvo químicos; si fue detergente, úsalo mejor para guardar accesorios, no alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja de primeros auxilios no médica",
        "hogar",
        "botiquin",
        "emergencia",
        "caja",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: caja de primeros auxilios no médica. un contenedor HDPE limpio puede guardar gasas cerradas, curitas o herramientas de emergencia, sin contacto con líquidos contaminantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "embudo resistente",
        "hogar",
        "embudo",
        "trasvasar",
        "aceite",
        "liquido",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: embudo resistente. corta el cuello de un envase HDPE para crear un embudo para líquidos no alimentarios, como agua de riego o productos de limpieza diluidos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor para brochas",
        "hogar",
        "brocha",
        "pintura",
        "pincel",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: contenedor para brochas. un envase HDPE soporta bien agua jabonosa para lavar brochas; no lo uses luego para alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte para celular en taller",
        "hogar",
        "celular",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: soporte para celular en taller. recorta una pieza firme y crea un soporte resistente para ver tutoriales mientras trabajas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "portamanguera pequeño",
        "hogar",
        "manguera",
        "jardin",
        "soporte",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: portamanguera pequeño. envases HDPE rígidos pueden fijarse a pared para enrollar mangueras livianas o cuerdas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de residuos",
        "hogar",
        "residuo",
        "separar",
        "reciclaje",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: separador de residuos. usa bidones HDPE cortados como estaciones de separación para tapas, pilas no peligrosas o plásticos limpios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para juguetes exteriores",
        "hogar",
        "juguete",
        "niños",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en casa con HDPE: caja para juguetes exteriores. bidones o baldes HDPE limpios sirven para juguetes de patio; revisa bordes y tapas para evitar atrapamientos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de herramientas",
        "colegio",
        "herramienta",
        "taller",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: organizador de herramientas. corta una garrafa o botella HDPE y úsala para brocas, destornilladores o piezas pequeñas; es resistente a golpes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pala de jardín",
        "colegio",
        "pala",
        "jardin",
        "arena",
        "tierra",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: pala de jardín. recorta una botella de detergente limpia en forma de pala para tierra, arena o alimento seco de mascotas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "regadera resistente",
        "colegio",
        "regadera",
        "riego",
        "agua",
        "planta",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: regadera resistente. un envase HDPE limpio funciona muy bien como regadera para plantas; perfora la tapa y úsalo solo para agua de riego. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de limpieza",
        "colegio",
        "limpieza",
        "trapo",
        "cepillo",
        "baño",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: contenedor de limpieza. reutiliza envases HDPE para guardar cepillos, guantes o paños de limpieza; no los mezcles con elementos de cocina. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de tornillos",
        "colegio",
        "tornillo",
        "tuerca",
        "clavo",
        "herrajes",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: organizador de tornillos. corta la parte superior de envases pequeños y crea bandejas resistentes para herrajes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "maceta resistente",
        "colegio",
        "maceta",
        "planta",
        "jardin",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: maceta resistente. los envases HDPE son excelentes macetas porque soportan humedad y golpes; haz drenajes y evita usar envases con residuos químicos sin lavar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de agua lluvia",
        "colegio",
        "lluvia",
        "agua",
        "bidon",
        "recolectar",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: contenedor de agua lluvia. un bidón HDPE puede almacenar agua lluvia para riego o limpieza; usa tapa y malla para evitar hojas y mosquitos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "compostera pequeña",
        "colegio",
        "compost",
        "compostera",
        "abono",
        "organico",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: compostera pequeña. un balde HDPE con ventilación puede servir para compostaje doméstico; no lo cierres herméticamente. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "banco o taburete simple",
        "colegio",
        "banco",
        "silla",
        "mueble",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: banco o taburete simple. envases HDPE robustos pueden integrarse como módulos de asiento si se rellenan y se fijan con seguridad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para cables",
        "colegio",
        "cable",
        "extension",
        "cargador",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: caja para cables. recorta un envase HDPE como caja de paso para guardar cargadores; no lo uses para cubrir conexiones calientes o defectuosas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de rodillas",
        "colegio",
        "rodilla",
        "jardin",
        "protector",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: protector de rodillas. láminas de HDPE de bidones limpios pueden convertirse en protectores para jardinería, con bordes bien lijados. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "señalización exterior",
        "colegio",
        "senal",
        "letrero",
        "exterior",
        "rotulo",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: señalización exterior. corta placas de HDPE y escribe etiquetas para huerta, bodega o taller; resiste mejor el agua que el cartón. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comedero seco para mascotas",
        "colegio",
        "mascota",
        "comedero",
        "croquetas",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: comedero seco para mascotas. solo si el envase nunca tuvo químicos; si fue detergente, úsalo mejor para guardar accesorios, no alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja de primeros auxilios no médica",
        "colegio",
        "botiquin",
        "emergencia",
        "caja",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: caja de primeros auxilios no médica. un contenedor HDPE limpio puede guardar gasas cerradas, curitas o herramientas de emergencia, sin contacto con líquidos contaminantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "embudo resistente",
        "colegio",
        "embudo",
        "trasvasar",
        "aceite",
        "liquido",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: embudo resistente. corta el cuello de un envase HDPE para crear un embudo para líquidos no alimentarios, como agua de riego o productos de limpieza diluidos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor para brochas",
        "colegio",
        "brocha",
        "pintura",
        "pincel",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: contenedor para brochas. un envase HDPE soporta bien agua jabonosa para lavar brochas; no lo uses luego para alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte para celular en taller",
        "colegio",
        "celular",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: soporte para celular en taller. recorta una pieza firme y crea un soporte resistente para ver tutoriales mientras trabajas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "portamanguera pequeño",
        "colegio",
        "manguera",
        "jardin",
        "soporte",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: portamanguera pequeño. envases HDPE rígidos pueden fijarse a pared para enrollar mangueras livianas o cuerdas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de residuos",
        "colegio",
        "residuo",
        "separar",
        "reciclaje",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: separador de residuos. usa bidones HDPE cortados como estaciones de separación para tapas, pilas no peligrosas o plásticos limpios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para juguetes exteriores",
        "colegio",
        "juguete",
        "niños",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en un proyecto escolar con HDPE: caja para juguetes exteriores. bidones o baldes HDPE limpios sirven para juguetes de patio; revisa bordes y tapas para evitar atrapamientos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de herramientas",
        "oficina",
        "herramienta",
        "taller",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: organizador de herramientas. corta una garrafa o botella HDPE y úsala para brocas, destornilladores o piezas pequeñas; es resistente a golpes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pala de jardín",
        "oficina",
        "pala",
        "jardin",
        "arena",
        "tierra",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: pala de jardín. recorta una botella de detergente limpia en forma de pala para tierra, arena o alimento seco de mascotas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "regadera resistente",
        "oficina",
        "regadera",
        "riego",
        "agua",
        "planta",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: regadera resistente. un envase HDPE limpio funciona muy bien como regadera para plantas; perfora la tapa y úsalo solo para agua de riego. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de limpieza",
        "oficina",
        "limpieza",
        "trapo",
        "cepillo",
        "baño",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: contenedor de limpieza. reutiliza envases HDPE para guardar cepillos, guantes o paños de limpieza; no los mezcles con elementos de cocina. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de tornillos",
        "oficina",
        "tornillo",
        "tuerca",
        "clavo",
        "herrajes",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: organizador de tornillos. corta la parte superior de envases pequeños y crea bandejas resistentes para herrajes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "maceta resistente",
        "oficina",
        "maceta",
        "planta",
        "jardin",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: maceta resistente. los envases HDPE son excelentes macetas porque soportan humedad y golpes; haz drenajes y evita usar envases con residuos químicos sin lavar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de agua lluvia",
        "oficina",
        "lluvia",
        "agua",
        "bidon",
        "recolectar",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: contenedor de agua lluvia. un bidón HDPE puede almacenar agua lluvia para riego o limpieza; usa tapa y malla para evitar hojas y mosquitos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "compostera pequeña",
        "oficina",
        "compost",
        "compostera",
        "abono",
        "organico",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: compostera pequeña. un balde HDPE con ventilación puede servir para compostaje doméstico; no lo cierres herméticamente. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "banco o taburete simple",
        "oficina",
        "banco",
        "silla",
        "mueble",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: banco o taburete simple. envases HDPE robustos pueden integrarse como módulos de asiento si se rellenan y se fijan con seguridad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para cables",
        "oficina",
        "cable",
        "extension",
        "cargador",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: caja para cables. recorta un envase HDPE como caja de paso para guardar cargadores; no lo uses para cubrir conexiones calientes o defectuosas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de rodillas",
        "oficina",
        "rodilla",
        "jardin",
        "protector",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: protector de rodillas. láminas de HDPE de bidones limpios pueden convertirse en protectores para jardinería, con bordes bien lijados. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "señalización exterior",
        "oficina",
        "senal",
        "letrero",
        "exterior",
        "rotulo",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: señalización exterior. corta placas de HDPE y escribe etiquetas para huerta, bodega o taller; resiste mejor el agua que el cartón. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comedero seco para mascotas",
        "oficina",
        "mascota",
        "comedero",
        "croquetas",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: comedero seco para mascotas. solo si el envase nunca tuvo químicos; si fue detergente, úsalo mejor para guardar accesorios, no alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja de primeros auxilios no médica",
        "oficina",
        "botiquin",
        "emergencia",
        "caja",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: caja de primeros auxilios no médica. un contenedor HDPE limpio puede guardar gasas cerradas, curitas o herramientas de emergencia, sin contacto con líquidos contaminantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "embudo resistente",
        "oficina",
        "embudo",
        "trasvasar",
        "aceite",
        "liquido",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: embudo resistente. corta el cuello de un envase HDPE para crear un embudo para líquidos no alimentarios, como agua de riego o productos de limpieza diluidos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor para brochas",
        "oficina",
        "brocha",
        "pintura",
        "pincel",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: contenedor para brochas. un envase HDPE soporta bien agua jabonosa para lavar brochas; no lo uses luego para alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte para celular en taller",
        "oficina",
        "celular",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: soporte para celular en taller. recorta una pieza firme y crea un soporte resistente para ver tutoriales mientras trabajas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "portamanguera pequeño",
        "oficina",
        "manguera",
        "jardin",
        "soporte",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: portamanguera pequeño. envases HDPE rígidos pueden fijarse a pared para enrollar mangueras livianas o cuerdas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de residuos",
        "oficina",
        "residuo",
        "separar",
        "reciclaje",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: separador de residuos. usa bidones HDPE cortados como estaciones de separación para tapas, pilas no peligrosas o plásticos limpios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para juguetes exteriores",
        "oficina",
        "juguete",
        "niños",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en la oficina con HDPE: caja para juguetes exteriores. bidones o baldes HDPE limpios sirven para juguetes de patio; revisa bordes y tapas para evitar atrapamientos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de herramientas",
        "jardín",
        "herramienta",
        "taller",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: organizador de herramientas. corta una garrafa o botella HDPE y úsala para brocas, destornilladores o piezas pequeñas; es resistente a golpes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pala de jardín",
        "jardín",
        "pala",
        "jardin",
        "arena",
        "tierra",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: pala de jardín. recorta una botella de detergente limpia en forma de pala para tierra, arena o alimento seco de mascotas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "regadera resistente",
        "jardín",
        "regadera",
        "riego",
        "agua",
        "planta",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: regadera resistente. un envase HDPE limpio funciona muy bien como regadera para plantas; perfora la tapa y úsalo solo para agua de riego. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de limpieza",
        "jardín",
        "limpieza",
        "trapo",
        "cepillo",
        "baño",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: contenedor de limpieza. reutiliza envases HDPE para guardar cepillos, guantes o paños de limpieza; no los mezcles con elementos de cocina. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de tornillos",
        "jardín",
        "tornillo",
        "tuerca",
        "clavo",
        "herrajes",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: organizador de tornillos. corta la parte superior de envases pequeños y crea bandejas resistentes para herrajes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "maceta resistente",
        "jardín",
        "maceta",
        "planta",
        "jardin",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: maceta resistente. los envases HDPE son excelentes macetas porque soportan humedad y golpes; haz drenajes y evita usar envases con residuos químicos sin lavar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de agua lluvia",
        "jardín",
        "lluvia",
        "agua",
        "bidon",
        "recolectar",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: contenedor de agua lluvia. un bidón HDPE puede almacenar agua lluvia para riego o limpieza; usa tapa y malla para evitar hojas y mosquitos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "compostera pequeña",
        "jardín",
        "compost",
        "compostera",
        "abono",
        "organico",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: compostera pequeña. un balde HDPE con ventilación puede servir para compostaje doméstico; no lo cierres herméticamente. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "banco o taburete simple",
        "jardín",
        "banco",
        "silla",
        "mueble",
        "exterior",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: banco o taburete simple. envases HDPE robustos pueden integrarse como módulos de asiento si se rellenan y se fijan con seguridad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja para cables",
        "jardín",
        "cable",
        "extension",
        "cargador",
        "organizador",
        "reutilizar",
        "idea",
        "hdpe"
      ],
      "r": "Ejemplo en el jardín con HDPE: caja para cables. recorta un envase HDPE como caja de paso para guardar cargadores; no lo uses para cubrir conexiones calientes o defectuosas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    }
  ],
  "PP": [
    {
      "kw": [
        "calentar",
        "microondas",
        "comida"
      ],
      "r": "PP puede ser apto para microondas solo si el recipiente lo indica. Si está deformado, rayado o sin símbolo, evita calentarlo."
    },
    {
      "kw": [
        "reciclar",
        "codigo 5",
        "tapa"
      ],
      "r": "PP código 5 puede reciclarse donde haya recolección específica; guarda tapas limpias en campañas de recolección si existen localmente."
    },
    {
      "kw": [
        "grasa",
        "tomate",
        "mancha"
      ],
      "r": "Para manchas en PP, usa bicarbonato y jabón; el sol puede ayudar con manchas de tomate, pero no corrige grietas."
    },
    {
      "kw": [
        "lonchera reutilizable",
        "lonchera",
        "almuerzo",
        "comida",
        "tupper",
        "pp"
      ],
      "r": "Uso recomendado para PP: lonchera reutilizable. si el recipiente PP es apto alimentario y está en buen estado, puede reutilizarse para alimentos; evita piezas agrietadas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "recipiente para microondas",
        "microondas",
        "calentar",
        "comida",
        "calor",
        "pp"
      ],
      "r": "Uso recomendado para PP: recipiente para microondas. solo usa PP marcado como apto para microondas; abre la tapa para liberar vapor y evita sobrecalentar grasas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "semillero",
        "yogur",
        "planta",
        "semilla",
        "pp"
      ],
      "r": "Uso recomendado para PP: semillero. vasos de yogur PP son buenos semilleros; haz drenajes y etiqueta cada especie. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de cajón",
        "cajon",
        "organizador",
        "clips",
        "botones",
        "pp"
      ],
      "r": "Uso recomendado para PP: organizador de cajón. recipientes PP pequeños sirven para separar clips, botones, tornillos o maquillaje. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor de tornillos",
        "tornillo",
        "tuerca",
        "herrajes",
        "pp"
      ],
      "r": "Uso recomendado para PP: contenedor de tornillos. tapas y recipientes PP son prácticos para clasificar piezas pequeñas en el taller. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "paleta para pintura",
        "pintura",
        "paleta",
        "arte",
        "pincel",
        "pp"
      ],
      "r": "Uso recomendado para PP: paleta para pintura. tapas PP limpias funcionan como paletas de pintura acrílica o mezclas escolares. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "caja de merienda",
        "merienda",
        "snack",
        "fruta",
        "colegio",
        "pp"
      ],
      "r": "Uso recomendado para PP: caja de merienda. recipientes PP alimentarios pueden llevar snacks secos o fruta, lavándolos bien después de cada uso. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de objetos",
        "protector",
        "funda",
        "cubierta",
        "pp"
      ],
      "r": "Uso recomendado para PP: protector de objetos. láminas PP flexibles pueden proteger esquinas de cuadernos, carpetas o herramientas livianas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "porta esponja",
        "esponja",
        "cocina",
        "lavaplatos",
        "pp"
      ],
      "r": "Uso recomendado para PP: porta esponja. un recipiente PP perforado puede sostener esponjas y permitir drenaje. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "dispensador de semillas",
        "semilla",
        "dispensador",
        "huerta",
        "pp"
      ],
      "r": "Uso recomendado para PP: dispensador de semillas. usa envases PP pequeños con tapa para guardar y dosificar semillas secas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "juego de clasificación",
        "juego",
        "niños",
        "clasificar",
        "colores",
        "pp"
      ],
      "r": "Uso recomendado para PP: juego de clasificación. usa tapas PP de colores para actividades educativas de conteo y clasificación. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "cajita de medición no médica",
        "medir",
        "cucharita",
        "dosificar",
        "pp"
      ],
      "r": "Uso recomendado para PP: cajita de medición no médica. tapas PP pueden servir como medidores caseros para tierra, semillas o manualidades, no para medicamentos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "porta jabón seco",
        "jabon",
        "baño",
        "ducha",
        "pp"
      ],
      "r": "Uso recomendado para PP: porta jabón seco. perfora un recipiente PP para que drene y úsalo como jabonera. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de nevera",
        "nevera",
        "refrigerador",
        "organizar",
        "pp"
      ],
      "r": "Uso recomendado para PP: organizador de nevera. recipientes PP alimentarios ayudan a separar porciones o frutas; evita olores lavando con bicarbonato. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "kit de costura",
        "costura",
        "hilo",
        "aguja",
        "boton",
        "pp"
      ],
      "r": "Uso recomendado para PP: kit de costura. un envase PP con tapa guarda hilos y botones; coloca agujas en una almohadilla, no sueltas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "portavasos",
        "mesa",
        "bebida",
        "pp"
      ],
      "r": "Uso recomendado para PP: portavasos. tapas PP grandes pueden reutilizarse como portavasos o bases protectoras. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de pintura infantil",
        "niños",
        "arte",
        "manualidad",
        "pp"
      ],
      "r": "Uso recomendado para PP: separador de pintura infantil. recipientes PP son seguros para pintura escolar lavable; supervisa bordes y piezas pequeñas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "recipiente para tornillos de muebles",
        "mueble",
        "armar",
        "tornillo",
        "pp"
      ],
      "r": "Uso recomendado para PP: recipiente para tornillos de muebles. guarda tornillos por paso al armar muebles para evitar perder piezas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "almacenamiento de legos",
        "lego",
        "juguete",
        "pieza",
        "pp"
      ],
      "r": "Uso recomendado para PP: almacenamiento de legos. envases PP limpias sirven para clasificar piezas por color o tamaño. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "bandeja de germinación",
        "bandeja",
        "germinacion",
        "plantula",
        "pp"
      ],
      "r": "Uso recomendado para PP: bandeja de germinación. tapas o recipientes PP bajos pueden funcionar como bandeja de germinación con buen drenaje. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "lonchera reutilizable",
        "hogar",
        "lonchera",
        "almuerzo",
        "comida",
        "tupper",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: lonchera reutilizable. si el recipiente PP es apto alimentario y está en buen estado, puede reutilizarse para alimentos; evita piezas agrietadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para microondas",
        "hogar",
        "microondas",
        "calentar",
        "comida",
        "calor",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: recipiente para microondas. solo usa PP marcado como apto para microondas; abre la tapa para liberar vapor y evita sobrecalentar grasas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "semillero",
        "hogar",
        "yogur",
        "planta",
        "semilla",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: semillero. vasos de yogur PP son buenos semilleros; haz drenajes y etiqueta cada especie. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de cajón",
        "hogar",
        "cajon",
        "organizador",
        "clips",
        "botones",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: organizador de cajón. recipientes PP pequeños sirven para separar clips, botones, tornillos o maquillaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "contenedor de tornillos",
        "hogar",
        "tornillo",
        "tuerca",
        "herrajes",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: contenedor de tornillos. tapas y recipientes PP son prácticos para clasificar piezas pequeñas en el taller. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "paleta para pintura",
        "hogar",
        "pintura",
        "paleta",
        "arte",
        "pincel",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: paleta para pintura. tapas PP limpias funcionan como paletas de pintura acrílica o mezclas escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "caja de merienda",
        "hogar",
        "merienda",
        "snack",
        "fruta",
        "colegio",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: caja de merienda. recipientes PP alimentarios pueden llevar snacks secos o fruta, lavándolos bien después de cada uso. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de objetos",
        "hogar",
        "protector",
        "funda",
        "cubierta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: protector de objetos. láminas PP flexibles pueden proteger esquinas de cuadernos, carpetas o herramientas livianas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta esponja",
        "hogar",
        "esponja",
        "cocina",
        "lavaplatos",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: porta esponja. un recipiente PP perforado puede sostener esponjas y permitir drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "dispensador de semillas",
        "hogar",
        "semilla",
        "dispensador",
        "huerta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: dispensador de semillas. usa envases PP pequeños con tapa para guardar y dosificar semillas secas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "juego de clasificación",
        "hogar",
        "juego",
        "niños",
        "clasificar",
        "colores",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: juego de clasificación. usa tapas PP de colores para actividades educativas de conteo y clasificación. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cajita de medición no médica",
        "hogar",
        "medir",
        "cucharita",
        "dosificar",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: cajita de medición no médica. tapas PP pueden servir como medidores caseros para tierra, semillas o manualidades, no para medicamentos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta jabón seco",
        "hogar",
        "jabon",
        "baño",
        "ducha",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: porta jabón seco. perfora un recipiente PP para que drene y úsalo como jabonera. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de nevera",
        "hogar",
        "nevera",
        "refrigerador",
        "organizar",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: organizador de nevera. recipientes PP alimentarios ayudan a separar porciones o frutas; evita olores lavando con bicarbonato. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "kit de costura",
        "hogar",
        "costura",
        "hilo",
        "aguja",
        "boton",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: kit de costura. un envase PP con tapa guarda hilos y botones; coloca agujas en una almohadilla, no sueltas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "portavasos",
        "hogar",
        "mesa",
        "bebida",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: portavasos. tapas PP grandes pueden reutilizarse como portavasos o bases protectoras. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de pintura infantil",
        "hogar",
        "niños",
        "arte",
        "manualidad",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: separador de pintura infantil. recipientes PP son seguros para pintura escolar lavable; supervisa bordes y piezas pequeñas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para tornillos de muebles",
        "hogar",
        "mueble",
        "armar",
        "tornillo",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: recipiente para tornillos de muebles. guarda tornillos por paso al armar muebles para evitar perder piezas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "almacenamiento de legos",
        "hogar",
        "lego",
        "juguete",
        "pieza",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: almacenamiento de legos. envases PP limpias sirven para clasificar piezas por color o tamaño. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bandeja de germinación",
        "hogar",
        "bandeja",
        "germinacion",
        "plantula",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en casa con PP: bandeja de germinación. tapas o recipientes PP bajos pueden funcionar como bandeja de germinación con buen drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "lonchera reutilizable",
        "colegio",
        "lonchera",
        "almuerzo",
        "comida",
        "tupper",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: lonchera reutilizable. si el recipiente PP es apto alimentario y está en buen estado, puede reutilizarse para alimentos; evita piezas agrietadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para microondas",
        "colegio",
        "microondas",
        "calentar",
        "comida",
        "calor",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: recipiente para microondas. solo usa PP marcado como apto para microondas; abre la tapa para liberar vapor y evita sobrecalentar grasas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "semillero",
        "colegio",
        "yogur",
        "planta",
        "semilla",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: semillero. vasos de yogur PP son buenos semilleros; haz drenajes y etiqueta cada especie. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de cajón",
        "colegio",
        "cajon",
        "organizador",
        "clips",
        "botones",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: organizador de cajón. recipientes PP pequeños sirven para separar clips, botones, tornillos o maquillaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "contenedor de tornillos",
        "colegio",
        "tornillo",
        "tuerca",
        "herrajes",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: contenedor de tornillos. tapas y recipientes PP son prácticos para clasificar piezas pequeñas en el taller. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "paleta para pintura",
        "colegio",
        "pintura",
        "paleta",
        "arte",
        "pincel",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: paleta para pintura. tapas PP limpias funcionan como paletas de pintura acrílica o mezclas escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "caja de merienda",
        "colegio",
        "merienda",
        "snack",
        "fruta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: caja de merienda. recipientes PP alimentarios pueden llevar snacks secos o fruta, lavándolos bien después de cada uso. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de objetos",
        "colegio",
        "protector",
        "funda",
        "cubierta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: protector de objetos. láminas PP flexibles pueden proteger esquinas de cuadernos, carpetas o herramientas livianas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta esponja",
        "colegio",
        "esponja",
        "cocina",
        "lavaplatos",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: porta esponja. un recipiente PP perforado puede sostener esponjas y permitir drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "dispensador de semillas",
        "colegio",
        "semilla",
        "dispensador",
        "huerta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: dispensador de semillas. usa envases PP pequeños con tapa para guardar y dosificar semillas secas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "juego de clasificación",
        "colegio",
        "juego",
        "niños",
        "clasificar",
        "colores",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: juego de clasificación. usa tapas PP de colores para actividades educativas de conteo y clasificación. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cajita de medición no médica",
        "colegio",
        "medir",
        "cucharita",
        "dosificar",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: cajita de medición no médica. tapas PP pueden servir como medidores caseros para tierra, semillas o manualidades, no para medicamentos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta jabón seco",
        "colegio",
        "jabon",
        "baño",
        "ducha",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: porta jabón seco. perfora un recipiente PP para que drene y úsalo como jabonera. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de nevera",
        "colegio",
        "nevera",
        "refrigerador",
        "organizar",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: organizador de nevera. recipientes PP alimentarios ayudan a separar porciones o frutas; evita olores lavando con bicarbonato. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "kit de costura",
        "colegio",
        "costura",
        "hilo",
        "aguja",
        "boton",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: kit de costura. un envase PP con tapa guarda hilos y botones; coloca agujas en una almohadilla, no sueltas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "portavasos",
        "colegio",
        "mesa",
        "bebida",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: portavasos. tapas PP grandes pueden reutilizarse como portavasos o bases protectoras. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de pintura infantil",
        "colegio",
        "niños",
        "arte",
        "manualidad",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: separador de pintura infantil. recipientes PP son seguros para pintura escolar lavable; supervisa bordes y piezas pequeñas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para tornillos de muebles",
        "colegio",
        "mueble",
        "armar",
        "tornillo",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: recipiente para tornillos de muebles. guarda tornillos por paso al armar muebles para evitar perder piezas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "almacenamiento de legos",
        "colegio",
        "lego",
        "juguete",
        "pieza",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: almacenamiento de legos. envases PP limpias sirven para clasificar piezas por color o tamaño. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bandeja de germinación",
        "colegio",
        "bandeja",
        "germinacion",
        "plantula",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en un proyecto escolar con PP: bandeja de germinación. tapas o recipientes PP bajos pueden funcionar como bandeja de germinación con buen drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "lonchera reutilizable",
        "oficina",
        "lonchera",
        "almuerzo",
        "comida",
        "tupper",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: lonchera reutilizable. si el recipiente PP es apto alimentario y está en buen estado, puede reutilizarse para alimentos; evita piezas agrietadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para microondas",
        "oficina",
        "microondas",
        "calentar",
        "comida",
        "calor",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: recipiente para microondas. solo usa PP marcado como apto para microondas; abre la tapa para liberar vapor y evita sobrecalentar grasas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "semillero",
        "oficina",
        "yogur",
        "planta",
        "semilla",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: semillero. vasos de yogur PP son buenos semilleros; haz drenajes y etiqueta cada especie. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de cajón",
        "oficina",
        "cajon",
        "organizador",
        "clips",
        "botones",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: organizador de cajón. recipientes PP pequeños sirven para separar clips, botones, tornillos o maquillaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "contenedor de tornillos",
        "oficina",
        "tornillo",
        "tuerca",
        "herrajes",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: contenedor de tornillos. tapas y recipientes PP son prácticos para clasificar piezas pequeñas en el taller. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "paleta para pintura",
        "oficina",
        "pintura",
        "paleta",
        "arte",
        "pincel",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: paleta para pintura. tapas PP limpias funcionan como paletas de pintura acrílica o mezclas escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "caja de merienda",
        "oficina",
        "merienda",
        "snack",
        "fruta",
        "colegio",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: caja de merienda. recipientes PP alimentarios pueden llevar snacks secos o fruta, lavándolos bien después de cada uso. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de objetos",
        "oficina",
        "protector",
        "funda",
        "cubierta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: protector de objetos. láminas PP flexibles pueden proteger esquinas de cuadernos, carpetas o herramientas livianas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta esponja",
        "oficina",
        "esponja",
        "cocina",
        "lavaplatos",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: porta esponja. un recipiente PP perforado puede sostener esponjas y permitir drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "dispensador de semillas",
        "oficina",
        "semilla",
        "dispensador",
        "huerta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: dispensador de semillas. usa envases PP pequeños con tapa para guardar y dosificar semillas secas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "juego de clasificación",
        "oficina",
        "juego",
        "niños",
        "clasificar",
        "colores",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: juego de clasificación. usa tapas PP de colores para actividades educativas de conteo y clasificación. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cajita de medición no médica",
        "oficina",
        "medir",
        "cucharita",
        "dosificar",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: cajita de medición no médica. tapas PP pueden servir como medidores caseros para tierra, semillas o manualidades, no para medicamentos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta jabón seco",
        "oficina",
        "jabon",
        "baño",
        "ducha",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: porta jabón seco. perfora un recipiente PP para que drene y úsalo como jabonera. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de nevera",
        "oficina",
        "nevera",
        "refrigerador",
        "organizar",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: organizador de nevera. recipientes PP alimentarios ayudan a separar porciones o frutas; evita olores lavando con bicarbonato. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "kit de costura",
        "oficina",
        "costura",
        "hilo",
        "aguja",
        "boton",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: kit de costura. un envase PP con tapa guarda hilos y botones; coloca agujas en una almohadilla, no sueltas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "portavasos",
        "oficina",
        "mesa",
        "bebida",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: portavasos. tapas PP grandes pueden reutilizarse como portavasos o bases protectoras. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de pintura infantil",
        "oficina",
        "niños",
        "arte",
        "manualidad",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: separador de pintura infantil. recipientes PP son seguros para pintura escolar lavable; supervisa bordes y piezas pequeñas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para tornillos de muebles",
        "oficina",
        "mueble",
        "armar",
        "tornillo",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: recipiente para tornillos de muebles. guarda tornillos por paso al armar muebles para evitar perder piezas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "almacenamiento de legos",
        "oficina",
        "lego",
        "juguete",
        "pieza",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: almacenamiento de legos. envases PP limpias sirven para clasificar piezas por color o tamaño. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bandeja de germinación",
        "oficina",
        "bandeja",
        "germinacion",
        "plantula",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en la oficina con PP: bandeja de germinación. tapas o recipientes PP bajos pueden funcionar como bandeja de germinación con buen drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "lonchera reutilizable",
        "jardín",
        "lonchera",
        "almuerzo",
        "comida",
        "tupper",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: lonchera reutilizable. si el recipiente PP es apto alimentario y está en buen estado, puede reutilizarse para alimentos; evita piezas agrietadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "recipiente para microondas",
        "jardín",
        "microondas",
        "calentar",
        "comida",
        "calor",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: recipiente para microondas. solo usa PP marcado como apto para microondas; abre la tapa para liberar vapor y evita sobrecalentar grasas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "semillero",
        "jardín",
        "yogur",
        "planta",
        "semilla",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: semillero. vasos de yogur PP son buenos semilleros; haz drenajes y etiqueta cada especie. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de cajón",
        "jardín",
        "cajon",
        "organizador",
        "clips",
        "botones",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: organizador de cajón. recipientes PP pequeños sirven para separar clips, botones, tornillos o maquillaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "contenedor de tornillos",
        "jardín",
        "tornillo",
        "tuerca",
        "herrajes",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: contenedor de tornillos. tapas y recipientes PP son prácticos para clasificar piezas pequeñas en el taller. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "paleta para pintura",
        "jardín",
        "pintura",
        "paleta",
        "arte",
        "pincel",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: paleta para pintura. tapas PP limpias funcionan como paletas de pintura acrílica o mezclas escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "caja de merienda",
        "jardín",
        "merienda",
        "snack",
        "fruta",
        "colegio",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: caja de merienda. recipientes PP alimentarios pueden llevar snacks secos o fruta, lavándolos bien después de cada uso. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de objetos",
        "jardín",
        "protector",
        "funda",
        "cubierta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: protector de objetos. láminas PP flexibles pueden proteger esquinas de cuadernos, carpetas o herramientas livianas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "porta esponja",
        "jardín",
        "esponja",
        "cocina",
        "lavaplatos",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: porta esponja. un recipiente PP perforado puede sostener esponjas y permitir drenaje. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "dispensador de semillas",
        "jardín",
        "semilla",
        "dispensador",
        "huerta",
        "reutilizar",
        "idea",
        "pp"
      ],
      "r": "Ejemplo en el jardín con PP: dispensador de semillas. usa envases PP pequeños con tapa para guardar y dosificar semillas secas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    }
  ],
  "PS": [
    {
      "kw": [
        "calor",
        "microondas",
        "bebida caliente"
      ],
      "r": "No calientes PS ni uses icopor con bebidas muy calientes; puede deformarse y no es una buena opción para calor."
    },
    {
      "kw": [
        "reciclar",
        "codigo 6",
        "icopor"
      ],
      "r": "PS código 6 es difícil de reciclar por volumen y baja densidad. Prioriza reutilizar como embalaje limpio o busca gestores especializados."
    },
    {
      "kw": [
        "solvente",
        "acetona",
        "gasolina"
      ],
      "r": "No limpies PS con acetona, gasolina o solventes: pueden disolverlo o dañarlo rápidamente."
    },
    {
      "kw": [
        "protección de envíos",
        "embalaje",
        "envio",
        "proteger",
        "fragil",
        "ps"
      ],
      "r": "Uso recomendado para PS: protección de envíos. reutiliza PS expandido como amortiguador para objetos frágiles; mantenlo limpio y lejos de calor. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "maqueta escolar",
        "maqueta",
        "colegio",
        "arte",
        "arquitectura",
        "ps"
      ],
      "r": "Uso recomendado para PS: maqueta escolar. el icopor o poliestireno es útil para maquetas; córtalo con cuidado y usa pinturas acrílicas, no solventes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "aislante térmico temporal",
        "aislante",
        "frio",
        "calor",
        "nevera",
        "ps"
      ],
      "r": "Uso recomendado para PS: aislante térmico temporal. cajas de PS ayudan a conservar frío en traslados cortos; no calientes alimentos dentro. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "base para diorama",
        "diorama",
        "escenografia",
        "decoracion",
        "ps"
      ],
      "r": "Uso recomendado para PS: base para diorama. usa piezas de PS como base liviana para paisajes, volcanes o escenografías escolares. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "relleno de maceta grande",
        "maceta",
        "relleno",
        "jardin",
        "ps"
      ],
      "r": "Uso recomendado para PS: relleno de maceta grande. trozos de PS limpios pueden aligerar macetas grandes en la base; no reemplazan drenaje adecuado. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de esquinas",
        "esquina",
        "mueble",
        "protector",
        "mudanza",
        "ps"
      ],
      "r": "Uso recomendado para PS: protector de esquinas. reutiliza bloques de PS para proteger muebles durante mudanzas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de aretes",
        "arete",
        "joya",
        "bisuteria",
        "ps"
      ],
      "r": "Uso recomendado para PS: organizador de aretes. una lámina PS cubierta con tela puede organizar aretes o alfileres decorativos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "panel acústico decorativo",
        "acustico",
        "ruido",
        "panel",
        "ps"
      ],
      "r": "Uso recomendado para PS: panel acústico decorativo. puede servir como panel decorativo liviano, pero no es solución profesional contra fuego o sonido. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "flotador para manualidad",
        "flotador",
        "agua",
        "manualidad",
        "ps"
      ],
      "r": "Uso recomendado para PS: flotador para manualidad. trozos limpios de PS flotan y pueden usarse en experimentos educativos supervisados. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "plantilla para pintura",
        "plantilla",
        "stencil",
        "pintura",
        "ps"
      ],
      "r": "Uso recomendado para PS: plantilla para pintura. láminas de PS rígido pueden cortarse como plantillas; evita aerosoles con solventes que lo dañan. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "relleno de cojín decorativo no textil",
        "relleno",
        "cojin",
        "decoracion",
        "ps"
      ],
      "r": "Uso recomendado para PS: relleno de cojín decorativo no textil. bolitas limpias pueden rellenar piezas decorativas cerradas, evitando que queden sueltas por contaminación. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protección de plantas por frío",
        "helada",
        "planta",
        "frio",
        "ps"
      ],
      "r": "Uso recomendado para PS: protección de plantas por frío. láminas de PS pueden proteger temporalmente macetas del frío, sin cubrir completamente la planta. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "base para exhibición",
        "exhibicion",
        "stand",
        "producto",
        "ps"
      ],
      "r": "Uso recomendado para PS: base para exhibición. PS rígido o expandido sirve para bases de exhibición livianas en ferias o clase. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de cajas",
        "separador",
        "caja",
        "almacenar",
        "ps"
      ],
      "r": "Uso recomendado para PS: separador de cajas. corta placas para separar objetos dentro de cajas y evitar golpes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "molde para cemento no estructural",
        "molde",
        "cemento",
        "manualidad",
        "ps"
      ],
      "r": "Uso recomendado para PS: molde para cemento no estructural. puede servir como molde sacrificial para piezas decorativas pequeñas, no estructurales. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "cartel liviano",
        "cartel",
        "letrero",
        "senal",
        "ps"
      ],
      "r": "Uso recomendado para PS: cartel liviano. placas de PS sirven para carteles internos; no las expongas a fuentes de calor. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "base para flores artificiales",
        "flor",
        "decoracion",
        "centro de mesa",
        "ps"
      ],
      "r": "Uso recomendado para PS: base para flores artificiales. bloques de PS pueden sostener tallos artificiales en arreglos decorativos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de nevera portátil",
        "nevera",
        "portatil",
        "frio",
        "ps"
      ],
      "r": "Uso recomendado para PS: separador de nevera portátil. usa placas limpias para separar alimentos fríos en una cava, sin contacto con comida abierta. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protección de vidrio",
        "vidrio",
        "cuadro",
        "marco",
        "ps"
      ],
      "r": "Uso recomendado para PS: protección de vidrio. láminas de PS ayudan a proteger cuadros o vidrios almacenados. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "actividad de densidad",
        "densidad",
        "experimento",
        "educativo",
        "ps"
      ],
      "r": "Uso recomendado para PS: actividad de densidad. sirve para demostrar flotación y densidad en clase, sin quemar ni calentar el material. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protección de envíos",
        "hogar",
        "embalaje",
        "envio",
        "proteger",
        "fragil",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: protección de envíos. reutiliza PS expandido como amortiguador para objetos frágiles; mantenlo limpio y lejos de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "maqueta escolar",
        "hogar",
        "maqueta",
        "colegio",
        "arte",
        "arquitectura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: maqueta escolar. el icopor o poliestireno es útil para maquetas; córtalo con cuidado y usa pinturas acrílicas, no solventes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "aislante térmico temporal",
        "hogar",
        "aislante",
        "frio",
        "calor",
        "nevera",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: aislante térmico temporal. cajas de PS ayudan a conservar frío en traslados cortos; no calientes alimentos dentro. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para diorama",
        "hogar",
        "diorama",
        "escenografia",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: base para diorama. usa piezas de PS como base liviana para paisajes, volcanes o escenografías escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de maceta grande",
        "hogar",
        "maceta",
        "relleno",
        "jardin",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: relleno de maceta grande. trozos de PS limpios pueden aligerar macetas grandes en la base; no reemplazan drenaje adecuado. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de esquinas",
        "hogar",
        "esquina",
        "mueble",
        "protector",
        "mudanza",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: protector de esquinas. reutiliza bloques de PS para proteger muebles durante mudanzas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de aretes",
        "hogar",
        "arete",
        "joya",
        "bisuteria",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: organizador de aretes. una lámina PS cubierta con tela puede organizar aretes o alfileres decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "panel acústico decorativo",
        "hogar",
        "acustico",
        "ruido",
        "panel",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: panel acústico decorativo. puede servir como panel decorativo liviano, pero no es solución profesional contra fuego o sonido. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "flotador para manualidad",
        "hogar",
        "flotador",
        "agua",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: flotador para manualidad. trozos limpios de PS flotan y pueden usarse en experimentos educativos supervisados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plantilla para pintura",
        "hogar",
        "plantilla",
        "stencil",
        "pintura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: plantilla para pintura. láminas de PS rígido pueden cortarse como plantillas; evita aerosoles con solventes que lo dañan. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de cojín decorativo no textil",
        "hogar",
        "relleno",
        "cojin",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: relleno de cojín decorativo no textil. bolitas limpias pueden rellenar piezas decorativas cerradas, evitando que queden sueltas por contaminación. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de plantas por frío",
        "hogar",
        "helada",
        "planta",
        "frio",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: protección de plantas por frío. láminas de PS pueden proteger temporalmente macetas del frío, sin cubrir completamente la planta. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para exhibición",
        "hogar",
        "exhibicion",
        "stand",
        "producto",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: base para exhibición. PS rígido o expandido sirve para bases de exhibición livianas en ferias o clase. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajas",
        "hogar",
        "separador",
        "caja",
        "almacenar",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: separador de cajas. corta placas para separar objetos dentro de cajas y evitar golpes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "molde para cemento no estructural",
        "hogar",
        "molde",
        "cemento",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: molde para cemento no estructural. puede servir como molde sacrificial para piezas decorativas pequeñas, no estructurales. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cartel liviano",
        "hogar",
        "cartel",
        "letrero",
        "senal",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: cartel liviano. placas de PS sirven para carteles internos; no las expongas a fuentes de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para flores artificiales",
        "hogar",
        "flor",
        "decoracion",
        "centro de mesa",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: base para flores artificiales. bloques de PS pueden sostener tallos artificiales en arreglos decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de nevera portátil",
        "hogar",
        "nevera",
        "portatil",
        "frio",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: separador de nevera portátil. usa placas limpias para separar alimentos fríos en una cava, sin contacto con comida abierta. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de vidrio",
        "hogar",
        "vidrio",
        "cuadro",
        "marco",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: protección de vidrio. láminas de PS ayudan a proteger cuadros o vidrios almacenados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "actividad de densidad",
        "hogar",
        "densidad",
        "experimento",
        "educativo",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en casa con PS: actividad de densidad. sirve para demostrar flotación y densidad en clase, sin quemar ni calentar el material. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de envíos",
        "colegio",
        "embalaje",
        "envio",
        "proteger",
        "fragil",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: protección de envíos. reutiliza PS expandido como amortiguador para objetos frágiles; mantenlo limpio y lejos de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "maqueta escolar",
        "colegio",
        "maqueta",
        "arte",
        "arquitectura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: maqueta escolar. el icopor o poliestireno es útil para maquetas; córtalo con cuidado y usa pinturas acrílicas, no solventes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "aislante térmico temporal",
        "colegio",
        "aislante",
        "frio",
        "calor",
        "nevera",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: aislante térmico temporal. cajas de PS ayudan a conservar frío en traslados cortos; no calientes alimentos dentro. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para diorama",
        "colegio",
        "diorama",
        "escenografia",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: base para diorama. usa piezas de PS como base liviana para paisajes, volcanes o escenografías escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de maceta grande",
        "colegio",
        "maceta",
        "relleno",
        "jardin",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: relleno de maceta grande. trozos de PS limpios pueden aligerar macetas grandes en la base; no reemplazan drenaje adecuado. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de esquinas",
        "colegio",
        "esquina",
        "mueble",
        "protector",
        "mudanza",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: protector de esquinas. reutiliza bloques de PS para proteger muebles durante mudanzas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de aretes",
        "colegio",
        "arete",
        "joya",
        "bisuteria",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: organizador de aretes. una lámina PS cubierta con tela puede organizar aretes o alfileres decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "panel acústico decorativo",
        "colegio",
        "acustico",
        "ruido",
        "panel",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: panel acústico decorativo. puede servir como panel decorativo liviano, pero no es solución profesional contra fuego o sonido. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "flotador para manualidad",
        "colegio",
        "flotador",
        "agua",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: flotador para manualidad. trozos limpios de PS flotan y pueden usarse en experimentos educativos supervisados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plantilla para pintura",
        "colegio",
        "plantilla",
        "stencil",
        "pintura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: plantilla para pintura. láminas de PS rígido pueden cortarse como plantillas; evita aerosoles con solventes que lo dañan. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de cojín decorativo no textil",
        "colegio",
        "relleno",
        "cojin",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: relleno de cojín decorativo no textil. bolitas limpias pueden rellenar piezas decorativas cerradas, evitando que queden sueltas por contaminación. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de plantas por frío",
        "colegio",
        "helada",
        "planta",
        "frio",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: protección de plantas por frío. láminas de PS pueden proteger temporalmente macetas del frío, sin cubrir completamente la planta. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para exhibición",
        "colegio",
        "exhibicion",
        "stand",
        "producto",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: base para exhibición. PS rígido o expandido sirve para bases de exhibición livianas en ferias o clase. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajas",
        "colegio",
        "separador",
        "caja",
        "almacenar",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: separador de cajas. corta placas para separar objetos dentro de cajas y evitar golpes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "molde para cemento no estructural",
        "colegio",
        "molde",
        "cemento",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: molde para cemento no estructural. puede servir como molde sacrificial para piezas decorativas pequeñas, no estructurales. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cartel liviano",
        "colegio",
        "cartel",
        "letrero",
        "senal",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: cartel liviano. placas de PS sirven para carteles internos; no las expongas a fuentes de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para flores artificiales",
        "colegio",
        "flor",
        "decoracion",
        "centro de mesa",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: base para flores artificiales. bloques de PS pueden sostener tallos artificiales en arreglos decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de nevera portátil",
        "colegio",
        "nevera",
        "portatil",
        "frio",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: separador de nevera portátil. usa placas limpias para separar alimentos fríos en una cava, sin contacto con comida abierta. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de vidrio",
        "colegio",
        "vidrio",
        "cuadro",
        "marco",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: protección de vidrio. láminas de PS ayudan a proteger cuadros o vidrios almacenados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "actividad de densidad",
        "colegio",
        "densidad",
        "experimento",
        "educativo",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en un proyecto escolar con PS: actividad de densidad. sirve para demostrar flotación y densidad en clase, sin quemar ni calentar el material. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de envíos",
        "oficina",
        "embalaje",
        "envio",
        "proteger",
        "fragil",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: protección de envíos. reutiliza PS expandido como amortiguador para objetos frágiles; mantenlo limpio y lejos de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "maqueta escolar",
        "oficina",
        "maqueta",
        "colegio",
        "arte",
        "arquitectura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: maqueta escolar. el icopor o poliestireno es útil para maquetas; córtalo con cuidado y usa pinturas acrílicas, no solventes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "aislante térmico temporal",
        "oficina",
        "aislante",
        "frio",
        "calor",
        "nevera",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: aislante térmico temporal. cajas de PS ayudan a conservar frío en traslados cortos; no calientes alimentos dentro. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para diorama",
        "oficina",
        "diorama",
        "escenografia",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: base para diorama. usa piezas de PS como base liviana para paisajes, volcanes o escenografías escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de maceta grande",
        "oficina",
        "maceta",
        "relleno",
        "jardin",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: relleno de maceta grande. trozos de PS limpios pueden aligerar macetas grandes en la base; no reemplazan drenaje adecuado. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de esquinas",
        "oficina",
        "esquina",
        "mueble",
        "protector",
        "mudanza",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: protector de esquinas. reutiliza bloques de PS para proteger muebles durante mudanzas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de aretes",
        "oficina",
        "arete",
        "joya",
        "bisuteria",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: organizador de aretes. una lámina PS cubierta con tela puede organizar aretes o alfileres decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "panel acústico decorativo",
        "oficina",
        "acustico",
        "ruido",
        "panel",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: panel acústico decorativo. puede servir como panel decorativo liviano, pero no es solución profesional contra fuego o sonido. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "flotador para manualidad",
        "oficina",
        "flotador",
        "agua",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: flotador para manualidad. trozos limpios de PS flotan y pueden usarse en experimentos educativos supervisados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plantilla para pintura",
        "oficina",
        "plantilla",
        "stencil",
        "pintura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: plantilla para pintura. láminas de PS rígido pueden cortarse como plantillas; evita aerosoles con solventes que lo dañan. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de cojín decorativo no textil",
        "oficina",
        "relleno",
        "cojin",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: relleno de cojín decorativo no textil. bolitas limpias pueden rellenar piezas decorativas cerradas, evitando que queden sueltas por contaminación. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de plantas por frío",
        "oficina",
        "helada",
        "planta",
        "frio",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: protección de plantas por frío. láminas de PS pueden proteger temporalmente macetas del frío, sin cubrir completamente la planta. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para exhibición",
        "oficina",
        "exhibicion",
        "stand",
        "producto",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: base para exhibición. PS rígido o expandido sirve para bases de exhibición livianas en ferias o clase. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajas",
        "oficina",
        "separador",
        "caja",
        "almacenar",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: separador de cajas. corta placas para separar objetos dentro de cajas y evitar golpes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "molde para cemento no estructural",
        "oficina",
        "molde",
        "cemento",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: molde para cemento no estructural. puede servir como molde sacrificial para piezas decorativas pequeñas, no estructurales. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cartel liviano",
        "oficina",
        "cartel",
        "letrero",
        "senal",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: cartel liviano. placas de PS sirven para carteles internos; no las expongas a fuentes de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para flores artificiales",
        "oficina",
        "flor",
        "decoracion",
        "centro de mesa",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: base para flores artificiales. bloques de PS pueden sostener tallos artificiales en arreglos decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de nevera portátil",
        "oficina",
        "nevera",
        "portatil",
        "frio",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: separador de nevera portátil. usa placas limpias para separar alimentos fríos en una cava, sin contacto con comida abierta. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de vidrio",
        "oficina",
        "vidrio",
        "cuadro",
        "marco",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: protección de vidrio. láminas de PS ayudan a proteger cuadros o vidrios almacenados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "actividad de densidad",
        "oficina",
        "densidad",
        "experimento",
        "educativo",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en la oficina con PS: actividad de densidad. sirve para demostrar flotación y densidad en clase, sin quemar ni calentar el material. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de envíos",
        "jardín",
        "embalaje",
        "envio",
        "proteger",
        "fragil",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: protección de envíos. reutiliza PS expandido como amortiguador para objetos frágiles; mantenlo limpio y lejos de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "maqueta escolar",
        "jardín",
        "maqueta",
        "colegio",
        "arte",
        "arquitectura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: maqueta escolar. el icopor o poliestireno es útil para maquetas; córtalo con cuidado y usa pinturas acrílicas, no solventes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "aislante térmico temporal",
        "jardín",
        "aislante",
        "frio",
        "calor",
        "nevera",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: aislante térmico temporal. cajas de PS ayudan a conservar frío en traslados cortos; no calientes alimentos dentro. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "base para diorama",
        "jardín",
        "diorama",
        "escenografia",
        "decoracion",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: base para diorama. usa piezas de PS como base liviana para paisajes, volcanes o escenografías escolares. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de maceta grande",
        "jardín",
        "maceta",
        "relleno",
        "jardin",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: relleno de maceta grande. trozos de PS limpios pueden aligerar macetas grandes en la base; no reemplazan drenaje adecuado. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de esquinas",
        "jardín",
        "esquina",
        "mueble",
        "protector",
        "mudanza",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: protector de esquinas. reutiliza bloques de PS para proteger muebles durante mudanzas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "organizador de aretes",
        "jardín",
        "arete",
        "joya",
        "bisuteria",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: organizador de aretes. una lámina PS cubierta con tela puede organizar aretes o alfileres decorativos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "panel acústico decorativo",
        "jardín",
        "acustico",
        "ruido",
        "panel",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: panel acústico decorativo. puede servir como panel decorativo liviano, pero no es solución profesional contra fuego o sonido. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "flotador para manualidad",
        "jardín",
        "flotador",
        "agua",
        "manualidad",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: flotador para manualidad. trozos limpios de PS flotan y pueden usarse en experimentos educativos supervisados. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plantilla para pintura",
        "jardín",
        "plantilla",
        "stencil",
        "pintura",
        "reutilizar",
        "idea",
        "ps"
      ],
      "r": "Ejemplo en el jardín con PS: plantilla para pintura. láminas de PS rígido pueden cortarse como plantillas; evita aerosoles con solventes que lo dañan. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    }
  ],
  "LDPE": [
    {
      "kw": [
        "bolsa",
        "reciclar",
        "codigo 4"
      ],
      "r": "LDPE código 4 suele reciclarse en puntos específicos para bolsas o películas plásticas; debe estar limpio y seco."
    },
    {
      "kw": [
        "plancha",
        "fusionar",
        "calor"
      ],
      "r": "Si fusionas bolsas LDPE, hazlo con baja temperatura, papel protector y ventilación; no quemes ni inhales humo."
    },
    {
      "kw": [
        "carne",
        "quimico",
        "reutilizar"
      ],
      "r": "No reutilices bolsas que tuvieron carne cruda, residuos orgánicos o químicos; sepáralas según las reglas locales."
    },
    {
      "kw": [
        "bolsa reutilizable reforzada",
        "bolsa",
        "fusionar",
        "plancha",
        "reutilizable",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: bolsa reutilizable reforzada. fusiona varias bolsas LDPE entre papel de horno con baja temperatura y ventilación; crea una lámina para coser una bolsa resistente. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "plarn para tejido",
        "plarn",
        "tejer",
        "crochet",
        "hilo",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: plarn para tejido. corta bolsas en tiras continuas para hacer hilo plástico y tejer alfombras o canastos resistentes al agua. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de lluvia",
        "lluvia",
        "impermeable",
        "proteger",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: protector de lluvia. láminas LDPE limpias pueden cubrir temporalmente objetos del agua; no las uses cerca de calor. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "forro para macetas",
        "maceta",
        "forro",
        "agua",
        "humedad",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: forro para macetas. usa LDPE como barrera de humedad dentro de recipientes decorativos, dejando drenaje suficiente. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "empaque de envío",
        "embalaje",
        "envio",
        "amortiguar",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: empaque de envío. bolsas limpias infladas o arrugadas sirven como relleno protector para paquetes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de cajones",
        "cajon",
        "separador",
        "ropa",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: separador de cajones. láminas fusionadas pueden convertirse en separadores flexibles para cajones. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "delantal de manualidades",
        "delantal",
        "niños",
        "pintura",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: delantal de manualidades. bolsas grandes limpias pueden transformarse en delantal temporal para pintura escolar. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "cubierta de mesa",
        "mesa",
        "cubrir",
        "pintura",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: cubierta de mesa. usa bolsas abiertas como protector de mesa para manualidades o jardinería. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "bolsa para residuos secos",
        "residuo",
        "seco",
        "basura",
        "separar",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: bolsa para residuos secos. reutiliza bolsas LDPE para agrupar residuos reciclables limpios y secos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "fundas para zapatos",
        "zapato",
        "barro",
        "proteger",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: fundas para zapatos. bolsas limpias sirven como cobertura temporal para zapatos en zonas de barro, con cuidado de no resbalar. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protección de libros",
        "libro",
        "forro",
        "cuaderno",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: protección de libros. láminas LDPE limpias pueden forrar cuadernos o libros como protección contra humedad. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "cuerda trenzada",
        "cuerda",
        "trenzar",
        "amarrar",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: cuerda trenzada. trenza tiras de LDPE para crear cuerdas livianas para usos no críticos; no las uses para cargas pesadas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "relleno de almohadón exterior",
        "relleno",
        "cojin",
        "exterior",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: relleno de almohadón exterior. bolsas limpias pueden rellenar cojines decorativos de exterior, cerrados para evitar dispersión. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de bicicleta",
        "bicicleta",
        "sillin",
        "lluvia",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: protector de bicicleta. una bolsa LDPE puede cubrir temporalmente el sillín de una bicicleta bajo lluvia. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "barrera contra polvo",
        "polvo",
        "cubrir",
        "almacenar",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: barrera contra polvo. usa bolsas limpias para cubrir objetos guardados y evitar polvo. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "envoltura de herramientas",
        "herramienta",
        "oxidacion",
        "proteger",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: envoltura de herramientas. envuelve herramientas secas para protegerlas de polvo y humedad ligera, agregando un desecante si es posible. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "bolsa de compras secundaria",
        "compras",
        "mercado",
        "supermercado",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: bolsa de compras secundaria. reutiliza bolsas limpias varias veces antes de reciclarlas; evita sobrecargarlas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "cubre macetas en helada",
        "helada",
        "planta",
        "frio",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: cubre macetas en helada. cubre plantas temporalmente por la noche y retira la bolsa en la mañana para evitar condensación excesiva. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "material para ecoarte",
        "arte",
        "mosaico",
        "manualidad",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: material para ecoarte. corta piezas de colores y crea mosaicos o collages plásticos sin aplicar calor directo innecesario. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de pintura",
        "pintura",
        "rodillo",
        "brocha",
        "ldpe"
      ],
      "r": "Uso recomendado para LDPE: separador de pintura. envuelve brochas por pocas horas para evitar que se sequen durante una pausa de trabajo. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "bolsa reutilizable reforzada",
        "hogar",
        "bolsa",
        "fusionar",
        "plancha",
        "reutilizable",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: bolsa reutilizable reforzada. fusiona varias bolsas LDPE entre papel de horno con baja temperatura y ventilación; crea una lámina para coser una bolsa resistente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plarn para tejido",
        "hogar",
        "plarn",
        "tejer",
        "crochet",
        "hilo",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: plarn para tejido. corta bolsas en tiras continuas para hacer hilo plástico y tejer alfombras o canastos resistentes al agua. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de lluvia",
        "hogar",
        "lluvia",
        "impermeable",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: protector de lluvia. láminas LDPE limpias pueden cubrir temporalmente objetos del agua; no las uses cerca de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "forro para macetas",
        "hogar",
        "maceta",
        "forro",
        "agua",
        "humedad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: forro para macetas. usa LDPE como barrera de humedad dentro de recipientes decorativos, dejando drenaje suficiente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "empaque de envío",
        "hogar",
        "embalaje",
        "envio",
        "amortiguar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: empaque de envío. bolsas limpias infladas o arrugadas sirven como relleno protector para paquetes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajones",
        "hogar",
        "cajon",
        "separador",
        "ropa",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: separador de cajones. láminas fusionadas pueden convertirse en separadores flexibles para cajones. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "delantal de manualidades",
        "hogar",
        "delantal",
        "niños",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: delantal de manualidades. bolsas grandes limpias pueden transformarse en delantal temporal para pintura escolar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubierta de mesa",
        "hogar",
        "mesa",
        "cubrir",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: cubierta de mesa. usa bolsas abiertas como protector de mesa para manualidades o jardinería. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa para residuos secos",
        "hogar",
        "residuo",
        "seco",
        "basura",
        "separar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: bolsa para residuos secos. reutiliza bolsas LDPE para agrupar residuos reciclables limpios y secos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "fundas para zapatos",
        "hogar",
        "zapato",
        "barro",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: fundas para zapatos. bolsas limpias sirven como cobertura temporal para zapatos en zonas de barro, con cuidado de no resbalar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de libros",
        "hogar",
        "libro",
        "forro",
        "cuaderno",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: protección de libros. láminas LDPE limpias pueden forrar cuadernos o libros como protección contra humedad. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cuerda trenzada",
        "hogar",
        "cuerda",
        "trenzar",
        "amarrar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: cuerda trenzada. trenza tiras de LDPE para crear cuerdas livianas para usos no críticos; no las uses para cargas pesadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de almohadón exterior",
        "hogar",
        "relleno",
        "cojin",
        "exterior",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: relleno de almohadón exterior. bolsas limpias pueden rellenar cojines decorativos de exterior, cerrados para evitar dispersión. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de bicicleta",
        "hogar",
        "bicicleta",
        "sillin",
        "lluvia",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: protector de bicicleta. una bolsa LDPE puede cubrir temporalmente el sillín de una bicicleta bajo lluvia. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "barrera contra polvo",
        "hogar",
        "polvo",
        "cubrir",
        "almacenar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: barrera contra polvo. usa bolsas limpias para cubrir objetos guardados y evitar polvo. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "envoltura de herramientas",
        "hogar",
        "herramienta",
        "oxidacion",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: envoltura de herramientas. envuelve herramientas secas para protegerlas de polvo y humedad ligera, agregando un desecante si es posible. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa de compras secundaria",
        "hogar",
        "compras",
        "mercado",
        "supermercado",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: bolsa de compras secundaria. reutiliza bolsas limpias varias veces antes de reciclarlas; evita sobrecargarlas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubre macetas en helada",
        "hogar",
        "helada",
        "planta",
        "frio",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: cubre macetas en helada. cubre plantas temporalmente por la noche y retira la bolsa en la mañana para evitar condensación excesiva. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "material para ecoarte",
        "hogar",
        "arte",
        "mosaico",
        "manualidad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: material para ecoarte. corta piezas de colores y crea mosaicos o collages plásticos sin aplicar calor directo innecesario. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de pintura",
        "hogar",
        "pintura",
        "rodillo",
        "brocha",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en casa con LDPE: separador de pintura. envuelve brochas por pocas horas para evitar que se sequen durante una pausa de trabajo. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa reutilizable reforzada",
        "colegio",
        "bolsa",
        "fusionar",
        "plancha",
        "reutilizable",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: bolsa reutilizable reforzada. fusiona varias bolsas LDPE entre papel de horno con baja temperatura y ventilación; crea una lámina para coser una bolsa resistente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plarn para tejido",
        "colegio",
        "plarn",
        "tejer",
        "crochet",
        "hilo",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: plarn para tejido. corta bolsas en tiras continuas para hacer hilo plástico y tejer alfombras o canastos resistentes al agua. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de lluvia",
        "colegio",
        "lluvia",
        "impermeable",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: protector de lluvia. láminas LDPE limpias pueden cubrir temporalmente objetos del agua; no las uses cerca de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "forro para macetas",
        "colegio",
        "maceta",
        "forro",
        "agua",
        "humedad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: forro para macetas. usa LDPE como barrera de humedad dentro de recipientes decorativos, dejando drenaje suficiente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "empaque de envío",
        "colegio",
        "embalaje",
        "envio",
        "amortiguar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: empaque de envío. bolsas limpias infladas o arrugadas sirven como relleno protector para paquetes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajones",
        "colegio",
        "cajon",
        "separador",
        "ropa",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: separador de cajones. láminas fusionadas pueden convertirse en separadores flexibles para cajones. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "delantal de manualidades",
        "colegio",
        "delantal",
        "niños",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: delantal de manualidades. bolsas grandes limpias pueden transformarse en delantal temporal para pintura escolar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubierta de mesa",
        "colegio",
        "mesa",
        "cubrir",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: cubierta de mesa. usa bolsas abiertas como protector de mesa para manualidades o jardinería. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa para residuos secos",
        "colegio",
        "residuo",
        "seco",
        "basura",
        "separar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: bolsa para residuos secos. reutiliza bolsas LDPE para agrupar residuos reciclables limpios y secos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "fundas para zapatos",
        "colegio",
        "zapato",
        "barro",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: fundas para zapatos. bolsas limpias sirven como cobertura temporal para zapatos en zonas de barro, con cuidado de no resbalar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de libros",
        "colegio",
        "libro",
        "forro",
        "cuaderno",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: protección de libros. láminas LDPE limpias pueden forrar cuadernos o libros como protección contra humedad. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cuerda trenzada",
        "colegio",
        "cuerda",
        "trenzar",
        "amarrar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: cuerda trenzada. trenza tiras de LDPE para crear cuerdas livianas para usos no críticos; no las uses para cargas pesadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de almohadón exterior",
        "colegio",
        "relleno",
        "cojin",
        "exterior",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: relleno de almohadón exterior. bolsas limpias pueden rellenar cojines decorativos de exterior, cerrados para evitar dispersión. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de bicicleta",
        "colegio",
        "bicicleta",
        "sillin",
        "lluvia",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: protector de bicicleta. una bolsa LDPE puede cubrir temporalmente el sillín de una bicicleta bajo lluvia. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "barrera contra polvo",
        "colegio",
        "polvo",
        "cubrir",
        "almacenar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: barrera contra polvo. usa bolsas limpias para cubrir objetos guardados y evitar polvo. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "envoltura de herramientas",
        "colegio",
        "herramienta",
        "oxidacion",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: envoltura de herramientas. envuelve herramientas secas para protegerlas de polvo y humedad ligera, agregando un desecante si es posible. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa de compras secundaria",
        "colegio",
        "compras",
        "mercado",
        "supermercado",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: bolsa de compras secundaria. reutiliza bolsas limpias varias veces antes de reciclarlas; evita sobrecargarlas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubre macetas en helada",
        "colegio",
        "helada",
        "planta",
        "frio",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: cubre macetas en helada. cubre plantas temporalmente por la noche y retira la bolsa en la mañana para evitar condensación excesiva. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "material para ecoarte",
        "colegio",
        "arte",
        "mosaico",
        "manualidad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: material para ecoarte. corta piezas de colores y crea mosaicos o collages plásticos sin aplicar calor directo innecesario. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de pintura",
        "colegio",
        "pintura",
        "rodillo",
        "brocha",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en un proyecto escolar con LDPE: separador de pintura. envuelve brochas por pocas horas para evitar que se sequen durante una pausa de trabajo. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa reutilizable reforzada",
        "oficina",
        "bolsa",
        "fusionar",
        "plancha",
        "reutilizable",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: bolsa reutilizable reforzada. fusiona varias bolsas LDPE entre papel de horno con baja temperatura y ventilación; crea una lámina para coser una bolsa resistente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plarn para tejido",
        "oficina",
        "plarn",
        "tejer",
        "crochet",
        "hilo",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: plarn para tejido. corta bolsas en tiras continuas para hacer hilo plástico y tejer alfombras o canastos resistentes al agua. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de lluvia",
        "oficina",
        "lluvia",
        "impermeable",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: protector de lluvia. láminas LDPE limpias pueden cubrir temporalmente objetos del agua; no las uses cerca de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "forro para macetas",
        "oficina",
        "maceta",
        "forro",
        "agua",
        "humedad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: forro para macetas. usa LDPE como barrera de humedad dentro de recipientes decorativos, dejando drenaje suficiente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "empaque de envío",
        "oficina",
        "embalaje",
        "envio",
        "amortiguar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: empaque de envío. bolsas limpias infladas o arrugadas sirven como relleno protector para paquetes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajones",
        "oficina",
        "cajon",
        "separador",
        "ropa",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: separador de cajones. láminas fusionadas pueden convertirse en separadores flexibles para cajones. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "delantal de manualidades",
        "oficina",
        "delantal",
        "niños",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: delantal de manualidades. bolsas grandes limpias pueden transformarse en delantal temporal para pintura escolar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubierta de mesa",
        "oficina",
        "mesa",
        "cubrir",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: cubierta de mesa. usa bolsas abiertas como protector de mesa para manualidades o jardinería. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa para residuos secos",
        "oficina",
        "residuo",
        "seco",
        "basura",
        "separar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: bolsa para residuos secos. reutiliza bolsas LDPE para agrupar residuos reciclables limpios y secos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "fundas para zapatos",
        "oficina",
        "zapato",
        "barro",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: fundas para zapatos. bolsas limpias sirven como cobertura temporal para zapatos en zonas de barro, con cuidado de no resbalar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protección de libros",
        "oficina",
        "libro",
        "forro",
        "cuaderno",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: protección de libros. láminas LDPE limpias pueden forrar cuadernos o libros como protección contra humedad. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cuerda trenzada",
        "oficina",
        "cuerda",
        "trenzar",
        "amarrar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: cuerda trenzada. trenza tiras de LDPE para crear cuerdas livianas para usos no críticos; no las uses para cargas pesadas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "relleno de almohadón exterior",
        "oficina",
        "relleno",
        "cojin",
        "exterior",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: relleno de almohadón exterior. bolsas limpias pueden rellenar cojines decorativos de exterior, cerrados para evitar dispersión. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de bicicleta",
        "oficina",
        "bicicleta",
        "sillin",
        "lluvia",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: protector de bicicleta. una bolsa LDPE puede cubrir temporalmente el sillín de una bicicleta bajo lluvia. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "barrera contra polvo",
        "oficina",
        "polvo",
        "cubrir",
        "almacenar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: barrera contra polvo. usa bolsas limpias para cubrir objetos guardados y evitar polvo. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "envoltura de herramientas",
        "oficina",
        "herramienta",
        "oxidacion",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: envoltura de herramientas. envuelve herramientas secas para protegerlas de polvo y humedad ligera, agregando un desecante si es posible. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa de compras secundaria",
        "oficina",
        "compras",
        "mercado",
        "supermercado",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: bolsa de compras secundaria. reutiliza bolsas limpias varias veces antes de reciclarlas; evita sobrecargarlas. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubre macetas en helada",
        "oficina",
        "helada",
        "planta",
        "frio",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: cubre macetas en helada. cubre plantas temporalmente por la noche y retira la bolsa en la mañana para evitar condensación excesiva. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "material para ecoarte",
        "oficina",
        "arte",
        "mosaico",
        "manualidad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: material para ecoarte. corta piezas de colores y crea mosaicos o collages plásticos sin aplicar calor directo innecesario. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de pintura",
        "oficina",
        "pintura",
        "rodillo",
        "brocha",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en la oficina con LDPE: separador de pintura. envuelve brochas por pocas horas para evitar que se sequen durante una pausa de trabajo. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa reutilizable reforzada",
        "jardín",
        "bolsa",
        "fusionar",
        "plancha",
        "reutilizable",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: bolsa reutilizable reforzada. fusiona varias bolsas LDPE entre papel de horno con baja temperatura y ventilación; crea una lámina para coser una bolsa resistente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "plarn para tejido",
        "jardín",
        "plarn",
        "tejer",
        "crochet",
        "hilo",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: plarn para tejido. corta bolsas en tiras continuas para hacer hilo plástico y tejer alfombras o canastos resistentes al agua. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "protector de lluvia",
        "jardín",
        "lluvia",
        "impermeable",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: protector de lluvia. láminas LDPE limpias pueden cubrir temporalmente objetos del agua; no las uses cerca de calor. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "forro para macetas",
        "jardín",
        "maceta",
        "forro",
        "agua",
        "humedad",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: forro para macetas. usa LDPE como barrera de humedad dentro de recipientes decorativos, dejando drenaje suficiente. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "empaque de envío",
        "jardín",
        "embalaje",
        "envio",
        "amortiguar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: empaque de envío. bolsas limpias infladas o arrugadas sirven como relleno protector para paquetes. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "separador de cajones",
        "jardín",
        "cajon",
        "separador",
        "ropa",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: separador de cajones. láminas fusionadas pueden convertirse en separadores flexibles para cajones. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "delantal de manualidades",
        "jardín",
        "delantal",
        "niños",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: delantal de manualidades. bolsas grandes limpias pueden transformarse en delantal temporal para pintura escolar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "cubierta de mesa",
        "jardín",
        "mesa",
        "cubrir",
        "pintura",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: cubierta de mesa. usa bolsas abiertas como protector de mesa para manualidades o jardinería. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "bolsa para residuos secos",
        "jardín",
        "residuo",
        "seco",
        "basura",
        "separar",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: bolsa para residuos secos. reutiliza bolsas LDPE para agrupar residuos reciclables limpios y secos. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    },
    {
      "kw": [
        "fundas para zapatos",
        "jardín",
        "zapato",
        "barro",
        "proteger",
        "reutilizar",
        "idea",
        "ldpe"
      ],
      "r": "Ejemplo en el jardín con LDPE: fundas para zapatos. bolsas limpias sirven como cobertura temporal para zapatos en zonas de barro, con cuidado de no resbalar. Revisa que esté limpio, sin grietas y que el uso sea de bajo riesgo."
    }
  ],
  "PVC": [
    {
      "kw": [
        "quemar",
        "humo",
        "toxico"
      ],
      "r": "Nunca quemes PVC. Al calentarse o arder puede liberar gases peligrosos; prefiere cortes mecánicos y usos en frío."
    },
    {
      "kw": [
        "agua potable",
        "comida",
        "seguro"
      ],
      "r": "No uses PVC recuperado para comida o agua potable salvo que sea tubería certificada y en instalación adecuada."
    },
    {
      "kw": [
        "reciclar",
        "codigo 3"
      ],
      "r": "PVC código 3 es complejo de reciclar y puede contaminar otras corrientes. Busca gestores especializados."
    },
    {
      "kw": [
        "soporte de herramientas",
        "tubo",
        "herramienta",
        "soporte",
        "taller",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: soporte de herramientas. corta secciones de tubería PVC y fíjalas a una tabla para organizar destornilladores, brocas o alicates. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "estructura de invernadero",
        "invernadero",
        "jardin",
        "estructura",
        "arco",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: estructura de invernadero. los tubos PVC pueden formar arcos livianos para un invernadero pequeño; fíjalos bien contra viento. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "sistema de riego",
        "riego",
        "goteo",
        "jardin",
        "agua",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: sistema de riego. tuberías PVC sobrantes pueden usarse para riego de jardín si están limpias y no provienen de residuos peligrosos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de cables",
        "cable",
        "canaleta",
        "organizar",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: organizador de cables. secciones de PVC pueden agrupar cables de baja tensión; no improvises instalaciones eléctricas inseguras. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "porta escobas",
        "escoba",
        "trapeador",
        "soporte",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: porta escobas. corta aros de PVC y fíjalos a pared para sostener escobas o trapeadores. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "marco para malla",
        "malla",
        "marco",
        "protector",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: marco para malla. arma marcos livianos para mallas de jardín o protección de plantas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "tutor de plantas",
        "tutor",
        "planta",
        "tomate",
        "soporte",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: tutor de plantas. tubos delgados de PVC sirven como tutores resistentes para plantas trepadoras. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de zapatos",
        "zapato",
        "organizador",
        "closet",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: organizador de zapatos. tubos PVC de diámetro grande pueden cortarse y apilarse como cubículos de zapatos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "juguete estructural supervisado",
        "juego",
        "niños",
        "estructura",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: juguete estructural supervisado. puede usarse en estructuras de juego livianas supervisadas, sin piezas pequeñas ni puntas expuestas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "base para lámpara led",
        "lampara",
        "led",
        "decoracion",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: base para lámpara LED. puede servir como carcasa decorativa para LED de baja temperatura; no lo uses con fuentes calientes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "soporte para portátil",
        "portatil",
        "soporte",
        "oficina",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: soporte para portátil. con codos y tubos puedes armar un soporte simple para elevar un portátil, verificando estabilidad. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "porta cañas o paraguas",
        "paraguas",
        "baston",
        "soporte",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: porta cañas o paraguas. tubos PVC verticales pueden organizar paraguas, bastones o cañas de pescar. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "marco de cartel",
        "cartel",
        "stand",
        "evento",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: marco de cartel. arma un marco liviano para señalización temporal en eventos o campañas ambientales. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "soporte de tablet",
        "tablet",
        "celular",
        "soporte",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: soporte de tablet. tubos y codos pequeños pueden formar un soporte estable para tablet o celular. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "jardinera modular",
        "jardinera",
        "maceta",
        "huerta",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: jardinera modular. tubos PVC grandes perforados pueden servir como jardineras horizontales; usa solo para ornamentales si no conoces el origen del tubo. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de cintas",
        "cinta",
        "rollo",
        "taller",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: organizador de cintas. un tubo PVC puede sostener rollos de cinta, cuerda o hilo en un eje simple. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "perchero temporal",
        "perchero",
        "ropa",
        "organizador",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: perchero temporal. tubos PVC pueden formar un perchero liviano para ropa seca; no lo sobrecargues. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protector de bordes",
        "borde",
        "protector",
        "seguridad",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: protector de bordes. tubos abiertos longitudinalmente pueden cubrir bordes de mesas de trabajo o láminas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "marco para fotografía",
        "fotografia",
        "fondo",
        "soporte",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: marco para fotografía. PVC puede armar soportes para fondos fotográficos livianos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de cajón grande",
        "cajon",
        "separador",
        "organizador",
        "pvc"
      ],
      "r": "Uso recomendado para PVC: separador de cajón grande. tubos cortados pueden organizar cables, medias o accesorios en cajones profundos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "soporte de herramientas",
        "hogar",
        "tubo",
        "herramienta",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: soporte de herramientas. corta secciones de tubería PVC y fíjalas a una tabla para organizar destornilladores, brocas o alicates. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "estructura de invernadero",
        "hogar",
        "invernadero",
        "jardin",
        "estructura",
        "arco",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: estructura de invernadero. los tubos PVC pueden formar arcos livianos para un invernadero pequeño; fíjalos bien contra viento. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "sistema de riego",
        "hogar",
        "riego",
        "goteo",
        "jardin",
        "agua",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: sistema de riego. tuberías PVC sobrantes pueden usarse para riego de jardín si están limpias y no provienen de residuos peligrosos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cables",
        "hogar",
        "cable",
        "canaleta",
        "organizar",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: organizador de cables. secciones de PVC pueden agrupar cables de baja tensión; no improvises instalaciones eléctricas inseguras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta escobas",
        "hogar",
        "escoba",
        "trapeador",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: porta escobas. corta aros de PVC y fíjalos a pared para sostener escobas o trapeadores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para malla",
        "hogar",
        "malla",
        "marco",
        "protector",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: marco para malla. arma marcos livianos para mallas de jardín o protección de plantas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "tutor de plantas",
        "hogar",
        "tutor",
        "planta",
        "tomate",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: tutor de plantas. tubos delgados de PVC sirven como tutores resistentes para plantas trepadoras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de zapatos",
        "hogar",
        "zapato",
        "organizador",
        "closet",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: organizador de zapatos. tubos PVC de diámetro grande pueden cortarse y apilarse como cubículos de zapatos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juguete estructural supervisado",
        "hogar",
        "juego",
        "niños",
        "estructura",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: juguete estructural supervisado. puede usarse en estructuras de juego livianas supervisadas, sin piezas pequeñas ni puntas expuestas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para lámpara led",
        "hogar",
        "lampara",
        "led",
        "decoracion",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: base para lámpara LED. puede servir como carcasa decorativa para LED de baja temperatura; no lo uses con fuentes calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte para portátil",
        "hogar",
        "portatil",
        "soporte",
        "oficina",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: soporte para portátil. con codos y tubos puedes armar un soporte simple para elevar un portátil, verificando estabilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta cañas o paraguas",
        "hogar",
        "paraguas",
        "baston",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: porta cañas o paraguas. tubos PVC verticales pueden organizar paraguas, bastones o cañas de pescar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco de cartel",
        "hogar",
        "cartel",
        "stand",
        "evento",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: marco de cartel. arma un marco liviano para señalización temporal en eventos o campañas ambientales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de tablet",
        "hogar",
        "tablet",
        "celular",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: soporte de tablet. tubos y codos pequeños pueden formar un soporte estable para tablet o celular. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "jardinera modular",
        "hogar",
        "jardinera",
        "maceta",
        "huerta",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: jardinera modular. tubos PVC grandes perforados pueden servir como jardineras horizontales; usa solo para ornamentales si no conoces el origen del tubo. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cintas",
        "hogar",
        "cinta",
        "rollo",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: organizador de cintas. un tubo PVC puede sostener rollos de cinta, cuerda o hilo en un eje simple. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "perchero temporal",
        "hogar",
        "perchero",
        "ropa",
        "organizador",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: perchero temporal. tubos PVC pueden formar un perchero liviano para ropa seca; no lo sobrecargues. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de bordes",
        "hogar",
        "borde",
        "protector",
        "seguridad",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: protector de bordes. tubos abiertos longitudinalmente pueden cubrir bordes de mesas de trabajo o láminas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para fotografía",
        "hogar",
        "fotografia",
        "fondo",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: marco para fotografía. PVC puede armar soportes para fondos fotográficos livianos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de cajón grande",
        "hogar",
        "cajon",
        "separador",
        "organizador",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en casa con PVC: separador de cajón grande. tubos cortados pueden organizar cables, medias o accesorios en cajones profundos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de herramientas",
        "colegio",
        "tubo",
        "herramienta",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: soporte de herramientas. corta secciones de tubería PVC y fíjalas a una tabla para organizar destornilladores, brocas o alicates. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "estructura de invernadero",
        "colegio",
        "invernadero",
        "jardin",
        "estructura",
        "arco",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: estructura de invernadero. los tubos PVC pueden formar arcos livianos para un invernadero pequeño; fíjalos bien contra viento. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "sistema de riego",
        "colegio",
        "riego",
        "goteo",
        "jardin",
        "agua",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: sistema de riego. tuberías PVC sobrantes pueden usarse para riego de jardín si están limpias y no provienen de residuos peligrosos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cables",
        "colegio",
        "cable",
        "canaleta",
        "organizar",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: organizador de cables. secciones de PVC pueden agrupar cables de baja tensión; no improvises instalaciones eléctricas inseguras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta escobas",
        "colegio",
        "escoba",
        "trapeador",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: porta escobas. corta aros de PVC y fíjalos a pared para sostener escobas o trapeadores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para malla",
        "colegio",
        "malla",
        "marco",
        "protector",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: marco para malla. arma marcos livianos para mallas de jardín o protección de plantas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "tutor de plantas",
        "colegio",
        "tutor",
        "planta",
        "tomate",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: tutor de plantas. tubos delgados de PVC sirven como tutores resistentes para plantas trepadoras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de zapatos",
        "colegio",
        "zapato",
        "organizador",
        "closet",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: organizador de zapatos. tubos PVC de diámetro grande pueden cortarse y apilarse como cubículos de zapatos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juguete estructural supervisado",
        "colegio",
        "juego",
        "niños",
        "estructura",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: juguete estructural supervisado. puede usarse en estructuras de juego livianas supervisadas, sin piezas pequeñas ni puntas expuestas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para lámpara led",
        "colegio",
        "lampara",
        "led",
        "decoracion",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: base para lámpara LED. puede servir como carcasa decorativa para LED de baja temperatura; no lo uses con fuentes calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte para portátil",
        "colegio",
        "portatil",
        "soporte",
        "oficina",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: soporte para portátil. con codos y tubos puedes armar un soporte simple para elevar un portátil, verificando estabilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta cañas o paraguas",
        "colegio",
        "paraguas",
        "baston",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: porta cañas o paraguas. tubos PVC verticales pueden organizar paraguas, bastones o cañas de pescar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco de cartel",
        "colegio",
        "cartel",
        "stand",
        "evento",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: marco de cartel. arma un marco liviano para señalización temporal en eventos o campañas ambientales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de tablet",
        "colegio",
        "tablet",
        "celular",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: soporte de tablet. tubos y codos pequeños pueden formar un soporte estable para tablet o celular. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "jardinera modular",
        "colegio",
        "jardinera",
        "maceta",
        "huerta",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: jardinera modular. tubos PVC grandes perforados pueden servir como jardineras horizontales; usa solo para ornamentales si no conoces el origen del tubo. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cintas",
        "colegio",
        "cinta",
        "rollo",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: organizador de cintas. un tubo PVC puede sostener rollos de cinta, cuerda o hilo en un eje simple. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "perchero temporal",
        "colegio",
        "perchero",
        "ropa",
        "organizador",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: perchero temporal. tubos PVC pueden formar un perchero liviano para ropa seca; no lo sobrecargues. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de bordes",
        "colegio",
        "borde",
        "protector",
        "seguridad",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: protector de bordes. tubos abiertos longitudinalmente pueden cubrir bordes de mesas de trabajo o láminas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para fotografía",
        "colegio",
        "fotografia",
        "fondo",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: marco para fotografía. PVC puede armar soportes para fondos fotográficos livianos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de cajón grande",
        "colegio",
        "cajon",
        "separador",
        "organizador",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en un proyecto escolar con PVC: separador de cajón grande. tubos cortados pueden organizar cables, medias o accesorios en cajones profundos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de herramientas",
        "oficina",
        "tubo",
        "herramienta",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: soporte de herramientas. corta secciones de tubería PVC y fíjalas a una tabla para organizar destornilladores, brocas o alicates. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "estructura de invernadero",
        "oficina",
        "invernadero",
        "jardin",
        "estructura",
        "arco",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: estructura de invernadero. los tubos PVC pueden formar arcos livianos para un invernadero pequeño; fíjalos bien contra viento. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "sistema de riego",
        "oficina",
        "riego",
        "goteo",
        "jardin",
        "agua",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: sistema de riego. tuberías PVC sobrantes pueden usarse para riego de jardín si están limpias y no provienen de residuos peligrosos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cables",
        "oficina",
        "cable",
        "canaleta",
        "organizar",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: organizador de cables. secciones de PVC pueden agrupar cables de baja tensión; no improvises instalaciones eléctricas inseguras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta escobas",
        "oficina",
        "escoba",
        "trapeador",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: porta escobas. corta aros de PVC y fíjalos a pared para sostener escobas o trapeadores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para malla",
        "oficina",
        "malla",
        "marco",
        "protector",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: marco para malla. arma marcos livianos para mallas de jardín o protección de plantas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "tutor de plantas",
        "oficina",
        "tutor",
        "planta",
        "tomate",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: tutor de plantas. tubos delgados de PVC sirven como tutores resistentes para plantas trepadoras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de zapatos",
        "oficina",
        "zapato",
        "organizador",
        "closet",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: organizador de zapatos. tubos PVC de diámetro grande pueden cortarse y apilarse como cubículos de zapatos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juguete estructural supervisado",
        "oficina",
        "juego",
        "niños",
        "estructura",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: juguete estructural supervisado. puede usarse en estructuras de juego livianas supervisadas, sin piezas pequeñas ni puntas expuestas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para lámpara led",
        "oficina",
        "lampara",
        "led",
        "decoracion",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: base para lámpara LED. puede servir como carcasa decorativa para LED de baja temperatura; no lo uses con fuentes calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte para portátil",
        "oficina",
        "portatil",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: soporte para portátil. con codos y tubos puedes armar un soporte simple para elevar un portátil, verificando estabilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta cañas o paraguas",
        "oficina",
        "paraguas",
        "baston",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: porta cañas o paraguas. tubos PVC verticales pueden organizar paraguas, bastones o cañas de pescar. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco de cartel",
        "oficina",
        "cartel",
        "stand",
        "evento",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: marco de cartel. arma un marco liviano para señalización temporal en eventos o campañas ambientales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de tablet",
        "oficina",
        "tablet",
        "celular",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: soporte de tablet. tubos y codos pequeños pueden formar un soporte estable para tablet o celular. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "jardinera modular",
        "oficina",
        "jardinera",
        "maceta",
        "huerta",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: jardinera modular. tubos PVC grandes perforados pueden servir como jardineras horizontales; usa solo para ornamentales si no conoces el origen del tubo. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cintas",
        "oficina",
        "cinta",
        "rollo",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: organizador de cintas. un tubo PVC puede sostener rollos de cinta, cuerda o hilo en un eje simple. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "perchero temporal",
        "oficina",
        "perchero",
        "ropa",
        "organizador",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: perchero temporal. tubos PVC pueden formar un perchero liviano para ropa seca; no lo sobrecargues. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protector de bordes",
        "oficina",
        "borde",
        "protector",
        "seguridad",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: protector de bordes. tubos abiertos longitudinalmente pueden cubrir bordes de mesas de trabajo o láminas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para fotografía",
        "oficina",
        "fotografia",
        "fondo",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: marco para fotografía. PVC puede armar soportes para fondos fotográficos livianos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de cajón grande",
        "oficina",
        "cajon",
        "separador",
        "organizador",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en la oficina con PVC: separador de cajón grande. tubos cortados pueden organizar cables, medias o accesorios en cajones profundos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de herramientas",
        "jardín",
        "tubo",
        "herramienta",
        "soporte",
        "taller",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: soporte de herramientas. corta secciones de tubería PVC y fíjalas a una tabla para organizar destornilladores, brocas o alicates. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "estructura de invernadero",
        "jardín",
        "invernadero",
        "jardin",
        "estructura",
        "arco",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: estructura de invernadero. los tubos PVC pueden formar arcos livianos para un invernadero pequeño; fíjalos bien contra viento. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "sistema de riego",
        "jardín",
        "riego",
        "goteo",
        "jardin",
        "agua",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: sistema de riego. tuberías PVC sobrantes pueden usarse para riego de jardín si están limpias y no provienen de residuos peligrosos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de cables",
        "jardín",
        "cable",
        "canaleta",
        "organizar",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: organizador de cables. secciones de PVC pueden agrupar cables de baja tensión; no improvises instalaciones eléctricas inseguras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "porta escobas",
        "jardín",
        "escoba",
        "trapeador",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: porta escobas. corta aros de PVC y fíjalos a pared para sostener escobas o trapeadores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "marco para malla",
        "jardín",
        "malla",
        "marco",
        "protector",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: marco para malla. arma marcos livianos para mallas de jardín o protección de plantas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "tutor de plantas",
        "jardín",
        "tutor",
        "planta",
        "tomate",
        "soporte",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: tutor de plantas. tubos delgados de PVC sirven como tutores resistentes para plantas trepadoras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de zapatos",
        "jardín",
        "zapato",
        "organizador",
        "closet",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: organizador de zapatos. tubos PVC de diámetro grande pueden cortarse y apilarse como cubículos de zapatos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juguete estructural supervisado",
        "jardín",
        "juego",
        "niños",
        "estructura",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: juguete estructural supervisado. puede usarse en estructuras de juego livianas supervisadas, sin piezas pequeñas ni puntas expuestas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para lámpara led",
        "jardín",
        "lampara",
        "led",
        "decoracion",
        "reutilizar",
        "idea",
        "pvc"
      ],
      "r": "Ejemplo en el jardín con PVC: base para lámpara LED. puede servir como carcasa decorativa para LED de baja temperatura; no lo uses con fuentes calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    }
  ],
  "OTHER": [
    {
      "kw": [
        "bpa",
        "pc",
        "policarbonato",
        "comida"
      ],
      "r": "Si OTHER podría ser policarbonato u otro material no identificado, evita reutilizarlo para comida o bebidas."
    },
    {
      "kw": [
        "pla",
        "bioplastico",
        "compostable"
      ],
      "r": "Que diga PLA o bioplástico no significa que sea compostable en casa; muchos requieren compostaje industrial."
    },
    {
      "kw": [
        "reciclar",
        "codigo 7"
      ],
      "r": "Código 7 requiere verificación. No lo mezcles con reciclaje común si el programa local no acepta plásticos mixtos."
    },
    {
      "kw": [
        "identificación del código",
        "codigo",
        "numero",
        "simbolo",
        "identificar",
        "other"
      ],
      "r": "Uso recomendado para OTHER: identificación del código. si el material es OTHER, revisa el número 7 o marcas como PC, ABS, PLA o nylon; sin certeza, evita contacto con alimentos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "arte experimental",
        "arte",
        "escultura",
        "manualidad",
        "other"
      ],
      "r": "Uso recomendado para OTHER: arte experimental. plásticos mixtos pueden usarse para esculturas, mosaicos o decoración, priorizando cortes seguros y buena ventilación si lijas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "piezas maker",
        "maker",
        "prototipo",
        "robotica",
        "other"
      ],
      "r": "Uso recomendado para OTHER: piezas maker. ABS, PC o mezclas rígidas pueden servir para prototipos, soportes o carcasas no críticas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "organizador de escritorio",
        "escritorio",
        "organizador",
        "oficina",
        "other"
      ],
      "r": "Uso recomendado para OTHER: organizador de escritorio. recipientes rígidos de OTHER pueden organizar clips, cables o tarjetas, sin contacto alimentario. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "reparaciones no estructurales",
        "reparar",
        "pieza",
        "soporte",
        "other"
      ],
      "r": "Uso recomendado para OTHER: reparaciones no estructurales. puedes usar piezas rígidas como separadores o soportes livianos, no para cargas críticas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "modelo 3d reciclado",
        "impresion 3d",
        "filamento",
        "pla",
        "abs",
        "other"
      ],
      "r": "Uso recomendado para OTHER: modelo 3D reciclado. si identificas PLA o ABS, podrían reciclarse en sistemas maker especializados; no mezcles materiales sin control. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "base para carteles",
        "cartel",
        "senal",
        "letrero",
        "other"
      ],
      "r": "Uso recomendado para OTHER: base para carteles. láminas rígidas mixtas funcionan como base para letreros internos o señalización temporal. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "contenedor de piezas",
        "pieza",
        "tornillo",
        "almacenar",
        "other"
      ],
      "r": "Uso recomendado para OTHER: contenedor de piezas. envases de plástico duro no identificado pueden guardar piezas de taller, siempre limpios y secos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "juego educativo",
        "educativo",
        "colegio",
        "clasificar",
        "other"
      ],
      "r": "Uso recomendado para OTHER: juego educativo. sirven para enseñar que no todos los plásticos se reciclan igual y que el código 7 requiere más verificación. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "protección de superficies",
        "protector",
        "mesa",
        "superficie",
        "other"
      ],
      "r": "Uso recomendado para OTHER: protección de superficies. láminas duras pueden proteger mesas de rayones en trabajos manuales. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "decoración de jardín",
        "jardin",
        "decoracion",
        "exterior",
        "other"
      ],
      "r": "Uso recomendado para OTHER: decoración de jardín. piezas mixtas pueden convertirse en marcadores o decoración exterior, evitando exposición a calor fuerte. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "separador de herramientas",
        "herramienta",
        "separador",
        "taller",
        "other"
      ],
      "r": "Uso recomendado para OTHER: separador de herramientas. trozos rígidos pueden crear divisores para cajones de herramientas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "caja de cables",
        "cable",
        "cargador",
        "organizar",
        "other"
      ],
      "r": "Uso recomendado para OTHER: caja de cables. cajas plásticas no identificadas pueden guardar cargadores y adaptadores, sin cubrir conexiones calientes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "material de entrenamiento visual",
        "dataset",
        "ia",
        "clasificacion",
        "other"
      ],
      "r": "Uso recomendado para OTHER: material de entrenamiento visual. puedes conservar muestras limpias para entrenar o validar modelos de identificación de plásticos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "muestra de museo escolar",
        "muestra",
        "exhibicion",
        "colegio",
        "other"
      ],
      "r": "Uso recomendado para OTHER: muestra de museo escolar. crea una colección educativa de tipos de plástico con etiquetas de uso y reciclabilidad. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "piezas de bisutería",
        "bisuteria",
        "arete",
        "collar",
        "other"
      ],
      "r": "Uso recomendado para OTHER: piezas de bisutería. piezas pequeñas y limpias pueden convertirse en accesorios decorativos, evitando bordes cortantes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "soporte de etiquetas",
        "etiqueta",
        "rotulo",
        "archivo",
        "other"
      ],
      "r": "Uso recomendado para OTHER: soporte de etiquetas. láminas plásticas sirven para etiquetas reutilizables en cajas o estantes. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "pruebas de resistencia",
        "prueba",
        "resistencia",
        "experimento",
        "other"
      ],
      "r": "Uso recomendado para OTHER: pruebas de resistencia. en contexto educativo, compara flexibilidad, densidad y dureza sin quemar ni inhalar vapores. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "donación a makerspace",
        "donar",
        "maker",
        "taller",
        "other"
      ],
      "r": "Uso recomendado para OTHER: donación a makerspace. piezas limpias y clasificadas pueden servir a talleres maker para prototipos o educación. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "reciclaje especializado",
        "reciclar",
        "reciclaje",
        "especializado",
        "other"
      ],
      "r": "Uso recomendado para OTHER: reciclaje especializado. OTHER normalmente requiere gestor especializado; no lo mezcles con PET, HDPE o PP si el programa local no lo acepta. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "identificación del código",
        "hogar",
        "codigo",
        "numero",
        "simbolo",
        "identificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: identificación del código. si el material es OTHER, revisa el número 7 o marcas como PC, ABS, PLA o nylon; sin certeza, evita contacto con alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "arte experimental",
        "hogar",
        "arte",
        "escultura",
        "manualidad",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: arte experimental. plásticos mixtos pueden usarse para esculturas, mosaicos o decoración, priorizando cortes seguros y buena ventilación si lijas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas maker",
        "hogar",
        "maker",
        "prototipo",
        "robotica",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: piezas maker. ABS, PC o mezclas rígidas pueden servir para prototipos, soportes o carcasas no críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de escritorio",
        "hogar",
        "escritorio",
        "organizador",
        "oficina",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: organizador de escritorio. recipientes rígidos de OTHER pueden organizar clips, cables o tarjetas, sin contacto alimentario. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reparaciones no estructurales",
        "hogar",
        "reparar",
        "pieza",
        "soporte",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: reparaciones no estructurales. puedes usar piezas rígidas como separadores o soportes livianos, no para cargas críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "modelo 3d reciclado",
        "hogar",
        "impresion 3d",
        "filamento",
        "pla",
        "abs",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: modelo 3D reciclado. si identificas PLA o ABS, podrían reciclarse en sistemas maker especializados; no mezcles materiales sin control. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para carteles",
        "hogar",
        "cartel",
        "senal",
        "letrero",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: base para carteles. láminas rígidas mixtas funcionan como base para letreros internos o señalización temporal. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de piezas",
        "hogar",
        "pieza",
        "tornillo",
        "almacenar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: contenedor de piezas. envases de plástico duro no identificado pueden guardar piezas de taller, siempre limpios y secos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juego educativo",
        "hogar",
        "educativo",
        "colegio",
        "clasificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: juego educativo. sirven para enseñar que no todos los plásticos se reciclan igual y que el código 7 requiere más verificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protección de superficies",
        "hogar",
        "protector",
        "mesa",
        "superficie",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: protección de superficies. láminas duras pueden proteger mesas de rayones en trabajos manuales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "decoración de jardín",
        "hogar",
        "jardin",
        "decoracion",
        "exterior",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: decoración de jardín. piezas mixtas pueden convertirse en marcadores o decoración exterior, evitando exposición a calor fuerte. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de herramientas",
        "hogar",
        "herramienta",
        "separador",
        "taller",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: separador de herramientas. trozos rígidos pueden crear divisores para cajones de herramientas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja de cables",
        "hogar",
        "cable",
        "cargador",
        "organizar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: caja de cables. cajas plásticas no identificadas pueden guardar cargadores y adaptadores, sin cubrir conexiones calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "material de entrenamiento visual",
        "hogar",
        "dataset",
        "ia",
        "clasificacion",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: material de entrenamiento visual. puedes conservar muestras limpias para entrenar o validar modelos de identificación de plásticos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "muestra de museo escolar",
        "hogar",
        "muestra",
        "exhibicion",
        "colegio",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: muestra de museo escolar. crea una colección educativa de tipos de plástico con etiquetas de uso y reciclabilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas de bisutería",
        "hogar",
        "bisuteria",
        "arete",
        "collar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: piezas de bisutería. piezas pequeñas y limpias pueden convertirse en accesorios decorativos, evitando bordes cortantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de etiquetas",
        "hogar",
        "etiqueta",
        "rotulo",
        "archivo",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: soporte de etiquetas. láminas plásticas sirven para etiquetas reutilizables en cajas o estantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pruebas de resistencia",
        "hogar",
        "prueba",
        "resistencia",
        "experimento",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: pruebas de resistencia. en contexto educativo, compara flexibilidad, densidad y dureza sin quemar ni inhalar vapores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "donación a makerspace",
        "hogar",
        "donar",
        "maker",
        "taller",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: donación a makerspace. piezas limpias y clasificadas pueden servir a talleres maker para prototipos o educación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje especializado",
        "hogar",
        "reciclar",
        "reciclaje",
        "especializado",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en casa con OTHER: reciclaje especializado. OTHER normalmente requiere gestor especializado; no lo mezcles con PET, HDPE o PP si el programa local no lo acepta. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "identificación del código",
        "colegio",
        "codigo",
        "numero",
        "simbolo",
        "identificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: identificación del código. si el material es OTHER, revisa el número 7 o marcas como PC, ABS, PLA o nylon; sin certeza, evita contacto con alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "arte experimental",
        "colegio",
        "arte",
        "escultura",
        "manualidad",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: arte experimental. plásticos mixtos pueden usarse para esculturas, mosaicos o decoración, priorizando cortes seguros y buena ventilación si lijas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas maker",
        "colegio",
        "maker",
        "prototipo",
        "robotica",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: piezas maker. ABS, PC o mezclas rígidas pueden servir para prototipos, soportes o carcasas no críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de escritorio",
        "colegio",
        "escritorio",
        "organizador",
        "oficina",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: organizador de escritorio. recipientes rígidos de OTHER pueden organizar clips, cables o tarjetas, sin contacto alimentario. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reparaciones no estructurales",
        "colegio",
        "reparar",
        "pieza",
        "soporte",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: reparaciones no estructurales. puedes usar piezas rígidas como separadores o soportes livianos, no para cargas críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "modelo 3d reciclado",
        "colegio",
        "impresion 3d",
        "filamento",
        "pla",
        "abs",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: modelo 3D reciclado. si identificas PLA o ABS, podrían reciclarse en sistemas maker especializados; no mezcles materiales sin control. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para carteles",
        "colegio",
        "cartel",
        "senal",
        "letrero",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: base para carteles. láminas rígidas mixtas funcionan como base para letreros internos o señalización temporal. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de piezas",
        "colegio",
        "pieza",
        "tornillo",
        "almacenar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: contenedor de piezas. envases de plástico duro no identificado pueden guardar piezas de taller, siempre limpios y secos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juego educativo",
        "colegio",
        "educativo",
        "clasificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: juego educativo. sirven para enseñar que no todos los plásticos se reciclan igual y que el código 7 requiere más verificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protección de superficies",
        "colegio",
        "protector",
        "mesa",
        "superficie",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: protección de superficies. láminas duras pueden proteger mesas de rayones en trabajos manuales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "decoración de jardín",
        "colegio",
        "jardin",
        "decoracion",
        "exterior",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: decoración de jardín. piezas mixtas pueden convertirse en marcadores o decoración exterior, evitando exposición a calor fuerte. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de herramientas",
        "colegio",
        "herramienta",
        "separador",
        "taller",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: separador de herramientas. trozos rígidos pueden crear divisores para cajones de herramientas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja de cables",
        "colegio",
        "cable",
        "cargador",
        "organizar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: caja de cables. cajas plásticas no identificadas pueden guardar cargadores y adaptadores, sin cubrir conexiones calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "material de entrenamiento visual",
        "colegio",
        "dataset",
        "ia",
        "clasificacion",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: material de entrenamiento visual. puedes conservar muestras limpias para entrenar o validar modelos de identificación de plásticos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "muestra de museo escolar",
        "colegio",
        "muestra",
        "exhibicion",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: muestra de museo escolar. crea una colección educativa de tipos de plástico con etiquetas de uso y reciclabilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas de bisutería",
        "colegio",
        "bisuteria",
        "arete",
        "collar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: piezas de bisutería. piezas pequeñas y limpias pueden convertirse en accesorios decorativos, evitando bordes cortantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de etiquetas",
        "colegio",
        "etiqueta",
        "rotulo",
        "archivo",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: soporte de etiquetas. láminas plásticas sirven para etiquetas reutilizables en cajas o estantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pruebas de resistencia",
        "colegio",
        "prueba",
        "resistencia",
        "experimento",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: pruebas de resistencia. en contexto educativo, compara flexibilidad, densidad y dureza sin quemar ni inhalar vapores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "donación a makerspace",
        "colegio",
        "donar",
        "maker",
        "taller",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: donación a makerspace. piezas limpias y clasificadas pueden servir a talleres maker para prototipos o educación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje especializado",
        "colegio",
        "reciclar",
        "reciclaje",
        "especializado",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en un proyecto escolar con OTHER: reciclaje especializado. OTHER normalmente requiere gestor especializado; no lo mezcles con PET, HDPE o PP si el programa local no lo acepta. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "identificación del código",
        "oficina",
        "codigo",
        "numero",
        "simbolo",
        "identificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: identificación del código. si el material es OTHER, revisa el número 7 o marcas como PC, ABS, PLA o nylon; sin certeza, evita contacto con alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "arte experimental",
        "oficina",
        "arte",
        "escultura",
        "manualidad",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: arte experimental. plásticos mixtos pueden usarse para esculturas, mosaicos o decoración, priorizando cortes seguros y buena ventilación si lijas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas maker",
        "oficina",
        "maker",
        "prototipo",
        "robotica",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: piezas maker. ABS, PC o mezclas rígidas pueden servir para prototipos, soportes o carcasas no críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de escritorio",
        "oficina",
        "escritorio",
        "organizador",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: organizador de escritorio. recipientes rígidos de OTHER pueden organizar clips, cables o tarjetas, sin contacto alimentario. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reparaciones no estructurales",
        "oficina",
        "reparar",
        "pieza",
        "soporte",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: reparaciones no estructurales. puedes usar piezas rígidas como separadores o soportes livianos, no para cargas críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "modelo 3d reciclado",
        "oficina",
        "impresion 3d",
        "filamento",
        "pla",
        "abs",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: modelo 3D reciclado. si identificas PLA o ABS, podrían reciclarse en sistemas maker especializados; no mezcles materiales sin control. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para carteles",
        "oficina",
        "cartel",
        "senal",
        "letrero",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: base para carteles. láminas rígidas mixtas funcionan como base para letreros internos o señalización temporal. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de piezas",
        "oficina",
        "pieza",
        "tornillo",
        "almacenar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: contenedor de piezas. envases de plástico duro no identificado pueden guardar piezas de taller, siempre limpios y secos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juego educativo",
        "oficina",
        "educativo",
        "colegio",
        "clasificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: juego educativo. sirven para enseñar que no todos los plásticos se reciclan igual y que el código 7 requiere más verificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protección de superficies",
        "oficina",
        "protector",
        "mesa",
        "superficie",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: protección de superficies. láminas duras pueden proteger mesas de rayones en trabajos manuales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "decoración de jardín",
        "oficina",
        "jardin",
        "decoracion",
        "exterior",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: decoración de jardín. piezas mixtas pueden convertirse en marcadores o decoración exterior, evitando exposición a calor fuerte. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "separador de herramientas",
        "oficina",
        "herramienta",
        "separador",
        "taller",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: separador de herramientas. trozos rígidos pueden crear divisores para cajones de herramientas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "caja de cables",
        "oficina",
        "cable",
        "cargador",
        "organizar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: caja de cables. cajas plásticas no identificadas pueden guardar cargadores y adaptadores, sin cubrir conexiones calientes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "material de entrenamiento visual",
        "oficina",
        "dataset",
        "ia",
        "clasificacion",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: material de entrenamiento visual. puedes conservar muestras limpias para entrenar o validar modelos de identificación de plásticos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "muestra de museo escolar",
        "oficina",
        "muestra",
        "exhibicion",
        "colegio",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: muestra de museo escolar. crea una colección educativa de tipos de plástico con etiquetas de uso y reciclabilidad. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas de bisutería",
        "oficina",
        "bisuteria",
        "arete",
        "collar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: piezas de bisutería. piezas pequeñas y limpias pueden convertirse en accesorios decorativos, evitando bordes cortantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "soporte de etiquetas",
        "oficina",
        "etiqueta",
        "rotulo",
        "archivo",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: soporte de etiquetas. láminas plásticas sirven para etiquetas reutilizables en cajas o estantes. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "pruebas de resistencia",
        "oficina",
        "prueba",
        "resistencia",
        "experimento",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: pruebas de resistencia. en contexto educativo, compara flexibilidad, densidad y dureza sin quemar ni inhalar vapores. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "donación a makerspace",
        "oficina",
        "donar",
        "maker",
        "taller",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: donación a makerspace. piezas limpias y clasificadas pueden servir a talleres maker para prototipos o educación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje especializado",
        "oficina",
        "reciclar",
        "reciclaje",
        "especializado",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en la oficina con OTHER: reciclaje especializado. OTHER normalmente requiere gestor especializado; no lo mezcles con PET, HDPE o PP si el programa local no lo acepta. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "identificación del código",
        "jardín",
        "codigo",
        "numero",
        "simbolo",
        "identificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: identificación del código. si el material es OTHER, revisa el número 7 o marcas como PC, ABS, PLA o nylon; sin certeza, evita contacto con alimentos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "arte experimental",
        "jardín",
        "arte",
        "escultura",
        "manualidad",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: arte experimental. plásticos mixtos pueden usarse para esculturas, mosaicos o decoración, priorizando cortes seguros y buena ventilación si lijas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "piezas maker",
        "jardín",
        "maker",
        "prototipo",
        "robotica",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: piezas maker. ABS, PC o mezclas rígidas pueden servir para prototipos, soportes o carcasas no críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "organizador de escritorio",
        "jardín",
        "escritorio",
        "organizador",
        "oficina",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: organizador de escritorio. recipientes rígidos de OTHER pueden organizar clips, cables o tarjetas, sin contacto alimentario. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reparaciones no estructurales",
        "jardín",
        "reparar",
        "pieza",
        "soporte",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: reparaciones no estructurales. puedes usar piezas rígidas como separadores o soportes livianos, no para cargas críticas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "modelo 3d reciclado",
        "jardín",
        "impresion 3d",
        "filamento",
        "pla",
        "abs",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: modelo 3D reciclado. si identificas PLA o ABS, podrían reciclarse en sistemas maker especializados; no mezcles materiales sin control. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "base para carteles",
        "jardín",
        "cartel",
        "senal",
        "letrero",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: base para carteles. láminas rígidas mixtas funcionan como base para letreros internos o señalización temporal. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "contenedor de piezas",
        "jardín",
        "pieza",
        "tornillo",
        "almacenar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: contenedor de piezas. envases de plástico duro no identificado pueden guardar piezas de taller, siempre limpios y secos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "juego educativo",
        "jardín",
        "educativo",
        "colegio",
        "clasificar",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: juego educativo. sirven para enseñar que no todos los plásticos se reciclan igual y que el código 7 requiere más verificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "protección de superficies",
        "jardín",
        "protector",
        "mesa",
        "superficie",
        "reutilizar",
        "idea",
        "other"
      ],
      "r": "Ejemplo en el jardín con OTHER: protección de superficies. láminas duras pueden proteger mesas de rayones en trabajos manuales. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    }
  ],
  "UNKNOWN": [
    {
      "kw": [
        "no se",
        "duda",
        "confianza baja"
      ],
      "r": "Si la identificación tiene baja confianza, responde con prudencia: no usar para alimentos, evitar calor y preferir reciclaje o usos decorativos."
    },
    {
      "kw": [
        "preguntas sugeridas",
        "que preguntar"
      ],
      "r": "Puedes preguntar: ¿es seguro reutilizarlo?, ¿cómo lo limpio?, ¿qué usos de bajo riesgo tiene?, ¿debo reciclarlo o descartarlo?"
    },
    {
      "kw": [
        "camara",
        "detectar",
        "mejorar"
      ],
      "r": "Para mejorar la detección, fotografía el objeto con buena luz, sin reflejos, fondo simple y mostrando el símbolo de reciclaje."
    },
    {
      "kw": [
        "buscar símbolo",
        "simbolo",
        "numero",
        "codigo",
        "identificar",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: buscar símbolo. busca el triángulo de reciclaje y el número del 1 al 7; si no aparece, trata el material como desconocido. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "preguntar por seguridad",
        "seguro",
        "comida",
        "agua",
        "alimento",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: preguntar por seguridad. si no sabes qué plástico es, no lo uses para comida ni agua potable; úsalo solo para organización, arte o proyectos no alimentarios. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "comparar flexibilidad",
        "flexible",
        "rigido",
        "doblar",
        "comparar",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: comparar flexibilidad. observa si es flexible, rígido, transparente u opaco; eso orienta, pero no reemplaza el código del material. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "prueba de flotación segura",
        "flotacion",
        "agua",
        "prueba",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: prueba de flotación segura. puedes observar si flota en agua limpia, pero es solo una pista; no uses fuego ni pruebas químicas caseras. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "uso conservador",
        "reutilizar",
        "usar",
        "proyecto",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: uso conservador. para un plástico desconocido, prefiere usos de bajo riesgo: organizadores, etiquetas, arte o separación de piezas. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "no quemar",
        "quemar",
        "fuego",
        "olor",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: no quemar. no quemes plástico para identificarlo; puede liberar vapores tóxicos y no es una prueba segura. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "limpieza básica",
        "limpiar",
        "lavar",
        "higiene",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: limpieza básica. lava con agua y jabón, seca completamente y evita reutilizar si conserva olor fuerte o residuos. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "reciclaje prudente",
        "reciclar",
        "punto",
        "acopio",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: reciclaje prudente. si no conoces el tipo, consulta el programa local o sepáralo como material no identificado para no contaminar otros reciclables. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "foto para ia",
        "foto",
        "camara",
        "ia",
        "detectar",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: foto para IA. toma una foto con buena luz, fondo limpio y muestra el símbolo de reciclaje si existe para mejorar la identificación. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "educación ambiental",
        "educacion",
        "colegio",
        "aprender",
        "unknown"
      ],
      "r": "Uso recomendado para UNKNOWN: educación ambiental. un plástico desconocido es útil para enseñar por qué la identificación y separación correcta importan. Antes de reutilizar, lava, seca y revisa bordes o grietas."
    },
    {
      "kw": [
        "buscar símbolo",
        "hogar",
        "simbolo",
        "numero",
        "codigo",
        "identificar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: buscar símbolo. busca el triángulo de reciclaje y el número del 1 al 7; si no aparece, trata el material como desconocido. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "preguntar por seguridad",
        "hogar",
        "seguro",
        "comida",
        "agua",
        "alimento",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: preguntar por seguridad. si no sabes qué plástico es, no lo uses para comida ni agua potable; úsalo solo para organización, arte o proyectos no alimentarios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comparar flexibilidad",
        "hogar",
        "flexible",
        "rigido",
        "doblar",
        "comparar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: comparar flexibilidad. observa si es flexible, rígido, transparente u opaco; eso orienta, pero no reemplaza el código del material. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "prueba de flotación segura",
        "hogar",
        "flotacion",
        "agua",
        "prueba",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: prueba de flotación segura. puedes observar si flota en agua limpia, pero es solo una pista; no uses fuego ni pruebas químicas caseras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "uso conservador",
        "hogar",
        "reutilizar",
        "usar",
        "proyecto",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: uso conservador. para un plástico desconocido, prefiere usos de bajo riesgo: organizadores, etiquetas, arte o separación de piezas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "no quemar",
        "hogar",
        "quemar",
        "fuego",
        "olor",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: no quemar. no quemes plástico para identificarlo; puede liberar vapores tóxicos y no es una prueba segura. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "limpieza básica",
        "hogar",
        "limpiar",
        "lavar",
        "higiene",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: limpieza básica. lava con agua y jabón, seca completamente y evita reutilizar si conserva olor fuerte o residuos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje prudente",
        "hogar",
        "reciclar",
        "punto",
        "acopio",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: reciclaje prudente. si no conoces el tipo, consulta el programa local o sepáralo como material no identificado para no contaminar otros reciclables. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "foto para ia",
        "hogar",
        "foto",
        "camara",
        "ia",
        "detectar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: foto para IA. toma una foto con buena luz, fondo limpio y muestra el símbolo de reciclaje si existe para mejorar la identificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "educación ambiental",
        "hogar",
        "educacion",
        "colegio",
        "aprender",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en casa con UNKNOWN: educación ambiental. un plástico desconocido es útil para enseñar por qué la identificación y separación correcta importan. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "buscar símbolo",
        "colegio",
        "simbolo",
        "numero",
        "codigo",
        "identificar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: buscar símbolo. busca el triángulo de reciclaje y el número del 1 al 7; si no aparece, trata el material como desconocido. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "preguntar por seguridad",
        "colegio",
        "seguro",
        "comida",
        "agua",
        "alimento",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: preguntar por seguridad. si no sabes qué plástico es, no lo uses para comida ni agua potable; úsalo solo para organización, arte o proyectos no alimentarios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comparar flexibilidad",
        "colegio",
        "flexible",
        "rigido",
        "doblar",
        "comparar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: comparar flexibilidad. observa si es flexible, rígido, transparente u opaco; eso orienta, pero no reemplaza el código del material. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "prueba de flotación segura",
        "colegio",
        "flotacion",
        "agua",
        "prueba",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: prueba de flotación segura. puedes observar si flota en agua limpia, pero es solo una pista; no uses fuego ni pruebas químicas caseras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "uso conservador",
        "colegio",
        "reutilizar",
        "usar",
        "proyecto",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: uso conservador. para un plástico desconocido, prefiere usos de bajo riesgo: organizadores, etiquetas, arte o separación de piezas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "no quemar",
        "colegio",
        "quemar",
        "fuego",
        "olor",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: no quemar. no quemes plástico para identificarlo; puede liberar vapores tóxicos y no es una prueba segura. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "limpieza básica",
        "colegio",
        "limpiar",
        "lavar",
        "higiene",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: limpieza básica. lava con agua y jabón, seca completamente y evita reutilizar si conserva olor fuerte o residuos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje prudente",
        "colegio",
        "reciclar",
        "punto",
        "acopio",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: reciclaje prudente. si no conoces el tipo, consulta el programa local o sepáralo como material no identificado para no contaminar otros reciclables. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "foto para ia",
        "colegio",
        "foto",
        "camara",
        "ia",
        "detectar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: foto para IA. toma una foto con buena luz, fondo limpio y muestra el símbolo de reciclaje si existe para mejorar la identificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "educación ambiental",
        "colegio",
        "educacion",
        "aprender",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en un proyecto escolar con UNKNOWN: educación ambiental. un plástico desconocido es útil para enseñar por qué la identificación y separación correcta importan. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "buscar símbolo",
        "oficina",
        "simbolo",
        "numero",
        "codigo",
        "identificar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: buscar símbolo. busca el triángulo de reciclaje y el número del 1 al 7; si no aparece, trata el material como desconocido. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "preguntar por seguridad",
        "oficina",
        "seguro",
        "comida",
        "agua",
        "alimento",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: preguntar por seguridad. si no sabes qué plástico es, no lo uses para comida ni agua potable; úsalo solo para organización, arte o proyectos no alimentarios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comparar flexibilidad",
        "oficina",
        "flexible",
        "rigido",
        "doblar",
        "comparar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: comparar flexibilidad. observa si es flexible, rígido, transparente u opaco; eso orienta, pero no reemplaza el código del material. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "prueba de flotación segura",
        "oficina",
        "flotacion",
        "agua",
        "prueba",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: prueba de flotación segura. puedes observar si flota en agua limpia, pero es solo una pista; no uses fuego ni pruebas químicas caseras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "uso conservador",
        "oficina",
        "reutilizar",
        "usar",
        "proyecto",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: uso conservador. para un plástico desconocido, prefiere usos de bajo riesgo: organizadores, etiquetas, arte o separación de piezas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "no quemar",
        "oficina",
        "quemar",
        "fuego",
        "olor",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: no quemar. no quemes plástico para identificarlo; puede liberar vapores tóxicos y no es una prueba segura. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "limpieza básica",
        "oficina",
        "limpiar",
        "lavar",
        "higiene",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: limpieza básica. lava con agua y jabón, seca completamente y evita reutilizar si conserva olor fuerte o residuos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje prudente",
        "oficina",
        "reciclar",
        "punto",
        "acopio",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: reciclaje prudente. si no conoces el tipo, consulta el programa local o sepáralo como material no identificado para no contaminar otros reciclables. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "foto para ia",
        "oficina",
        "foto",
        "camara",
        "ia",
        "detectar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: foto para IA. toma una foto con buena luz, fondo limpio y muestra el símbolo de reciclaje si existe para mejorar la identificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "educación ambiental",
        "oficina",
        "educacion",
        "colegio",
        "aprender",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en la oficina con UNKNOWN: educación ambiental. un plástico desconocido es útil para enseñar por qué la identificación y separación correcta importan. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "buscar símbolo",
        "jardín",
        "simbolo",
        "numero",
        "codigo",
        "identificar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: buscar símbolo. busca el triángulo de reciclaje y el número del 1 al 7; si no aparece, trata el material como desconocido. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "preguntar por seguridad",
        "jardín",
        "seguro",
        "comida",
        "agua",
        "alimento",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: preguntar por seguridad. si no sabes qué plástico es, no lo uses para comida ni agua potable; úsalo solo para organización, arte o proyectos no alimentarios. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "comparar flexibilidad",
        "jardín",
        "flexible",
        "rigido",
        "doblar",
        "comparar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: comparar flexibilidad. observa si es flexible, rígido, transparente u opaco; eso orienta, pero no reemplaza el código del material. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "prueba de flotación segura",
        "jardín",
        "flotacion",
        "agua",
        "prueba",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: prueba de flotación segura. puedes observar si flota en agua limpia, pero es solo una pista; no uses fuego ni pruebas químicas caseras. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "uso conservador",
        "jardín",
        "reutilizar",
        "usar",
        "proyecto",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: uso conservador. para un plástico desconocido, prefiere usos de bajo riesgo: organizadores, etiquetas, arte o separación de piezas. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "no quemar",
        "jardín",
        "quemar",
        "fuego",
        "olor",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: no quemar. no quemes plástico para identificarlo; puede liberar vapores tóxicos y no es una prueba segura. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "limpieza básica",
        "jardín",
        "limpiar",
        "lavar",
        "higiene",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: limpieza básica. lava con agua y jabón, seca completamente y evita reutilizar si conserva olor fuerte o residuos. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "reciclaje prudente",
        "jardín",
        "reciclar",
        "punto",
        "acopio",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: reciclaje prudente. si no conoces el tipo, consulta el programa local o sepáralo como material no identificado para no contaminar otros reciclables. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "foto para ia",
        "jardín",
        "foto",
        "camara",
        "ia",
        "detectar",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: foto para IA. toma una foto con buena luz, fondo limpio y muestra el símbolo de reciclaje si existe para mejorar la identificación. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    },
    {
      "kw": [
        "educación ambiental",
        "jardín",
        "educacion",
        "colegio",
        "aprender",
        "reutilizar",
        "idea",
        "unknown"
      ],
      "r": "Ejemplo en el jardín con UNKNOWN: educación ambiental. un plástico desconocido es útil para enseñar por qué la identificación y separación correcta importan. Manténlo lejos de calor y no lo uses para alimentos si el envase tuvo químicos."
    }
  ]
};


/**
 * Normaliza texto: minúsculas, sin tildes.
 */
function normalizeText(value) {
  return (value || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

/**
 * Busca la respuesta más relevante en la KB según tipo y pregunta del usuario.
 * @param {string} type  — Tipo de plástico: PET, HDPE, PP, PS, LDPE, PVC, OTHER, UNKNOWN
 * @param {string} question — Pregunta del usuario en texto libre
 * @returns {string} Respuesta en español
 */
function matchKB(type, question) {
  const normalizedType = (type || 'UNKNOWN').toString().trim().toUpperCase();
  const entries = KB[normalizedType] || KB['UNKNOWN'];
  const q = normalizeText(question);

  let best = null;
  let bestScore = 0;

  for (const entry of entries) {
    let score = 0;
    for (const kw of entry.kw || []) {
      const kwNorm = normalizeText(kw);
      if (!kwNorm) continue;
      if (q.includes(kwNorm)) score += Math.max(1, kwNorm.split(/\s+/).length);
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best) return best.r;

  // Sin match: respuesta general rotativa del tipo detectado.
  const idx = Math.floor(Date.now() / 10000) % entries.length;
  return entries[idx].r;
}

/**
 * Devuelve preguntas sugeridas según el tipo de plástico.
 */
function getSuggestedQuestions(type, limit = 6) {
  const normalizedType = (type || 'UNKNOWN').toString().trim().toUpperCase();
  const suggestedByType = {
    PET: [
      '¿Puedo reciclar esta botella?',
      '¿Qué puedo hacer con una botella PET?',
      '¿Puedo usarla para una maceta?',
      '¿Es seguro ponerle agua caliente?',
      '¿Cómo debo limpiarla antes de reutilizarla?',
      '¿Sirve para un proyecto escolar?'
    ],
    HDPE: [
      '¿Puedo usar este envase para guardar agua?',
      '¿Es seguro reutilizar una botella de shampoo?',
      '¿Qué usos tiene en jardinería?',
      '¿Lo puedo usar para herramientas?',
      '¿Cómo lo limpio si tuvo detergente?',
      '¿Es mejor reciclarlo o reutilizarlo?'
    ],
    PP: [
      '¿Este recipiente puede ir al microondas?',
      '¿Puedo reutilizarlo para comida?',
      '¿Qué manualidades puedo hacer con tapas PP?',
      '¿Cómo quito manchas de tomate?',
      '¿Sirve como semillero?',
      '¿Dónde conviene reciclarlo?'
    ],
    PS: [
      '¿Puedo calentar comida en icopor?',
      '¿Cómo reutilizo el icopor de un empaque?',
      '¿Sirve como aislante?',
      '¿Se puede reciclar el poliestireno?',
      '¿Qué pinturas puedo usar?',
      '¿Qué riesgos tiene el calor?'
    ],
    LDPE: [
      '¿Qué puedo hacer con bolsas plásticas?',
      '¿Cómo convierto bolsas en una lámina?',
      '¿Se puede tejer con bolsas?',
      '¿Cómo las limpio antes de reciclar?',
      '¿Sirven para impermeabilizar?',
      '¿Dónde se recicla el código 4?'
    ],
    PVC: [
      '¿Qué puedo hacer con tubos PVC?',
      '¿Es seguro usar PVC para agua potable?',
      '¿Por qué no se debe quemar PVC?',
      '¿Sirve para estructuras de jardín?',
      '¿Cómo organizo herramientas con PVC?',
      '¿Se puede reciclar el código 3?'
    ],
    OTHER: [
      '¿Qué significa plástico código 7?',
      '¿Puedo usarlo para comida?',
      '¿Qué hago si no sé si es ABS, PLA o PC?',
      '¿Sirve para proyectos maker?',
      '¿Cómo lo separo para reciclaje?',
      '¿Qué usos de bajo riesgo tiene?'
    ],
    UNKNOWN: [
      '¿Cómo identifico qué plástico es?',
      '¿Es seguro reutilizarlo?',
      '¿Qué usos de bajo riesgo tiene?',
      '¿Puedo reciclarlo si no conozco el tipo?',
      '¿Cómo mejoro la foto para identificarlo?',
      '¿Qué debo evitar si no sé el material?'
    ]
  };

  return (suggestedByType[normalizedType] || suggestedByType.UNKNOWN).slice(0, limit);
}

// Compatibilidad para navegador/Cordova y Node.js
if (typeof window !== 'undefined') {
  window.KB = KB;
  window.matchKB = matchKB;
  window.getSuggestedQuestions = getSuggestedQuestions;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { KB, matchKB, getSuggestedQuestions };
}
