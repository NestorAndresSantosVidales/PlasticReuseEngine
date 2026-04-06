# Integrar el modelo TFLite en el APK

## Pasos después de entrenar en Colab

1. Descarga `plastic_classifier.tflite` y `plastic_labels.txt` de Colab
2. Cópialos a `www/` del proyecto Cordova:
   ```
   plastic-reuse-app/www/plastic_classifier.tflite
   plastic-reuse-app/www/plastic_labels.txt
   ```

3. Instala el plugin TFLite para Cordova:
   ```
   pnpm.cmd exec cordova plugin add cordova-plugin-tflite
   ```
   O usa TensorFlow.js con el backend TFLite:
   ```
   npm install @tensorflow/tfjs-tflite
   ```

4. En app.js, reemplaza la llamada a MobileNet por:
   ```js
   const tflite = await tflite.loadTFLiteModel('plastic_classifier.tflite');
   const labels = await fetch('plastic_labels.txt').then(r => r.text()).then(t => t.trim().split('\n'));

   async function classifyImage(imgElement) {
     const tensor = tf.browser.fromPixels(imgElement)
       .resizeNearestNeighbor([224, 224])
       .toFloat().div(255).expandDims();
     const output = tflite.predict(tensor);
     const scores = await output.data();
     const topIdx = scores.indexOf(Math.max(...scores));
     return { plasticType: labels[topIdx], confidence: scores[topIdx] };
   }
   ```

## Recomendación de imágenes por clase

| Clase | Mínimo recomendado |
|-------|-------------------|
| PET   | 200+ fotos        |
| HDPE  | 200+ fotos        |
| LDPE  | 200+ fotos        |
| PP    | 200+ fotos        |
| PS    | 150+ fotos        |
| PVC   | 100+ fotos        |
| OTHER | 150+ fotos        |
| UNKNOWN | 100+ fotos     |

Con menos de 100 imágenes por clase la precisión será baja.
Con 500+ por clase se puede esperar >85% de precisión.
