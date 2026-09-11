# Universos-Paralelos

Experimento visual con cinco nodos que representan universos ficticios.

## Ejecutar

Requiere Node.js 22 o superior. No hay dependencias de paquetes.

```sh
git clone https://github.com/romangon10/Universos-Paralelos.git
cd Universos-Paralelos
npm start
```

Abrí `http://127.0.0.1:3000`. Para usar otro puerto, configurá `PORT`. Serví la página por HTTP; los proyectos con módulos ES no funcionan abriendo el HTML con `file://`.

## Funcionalidad implementada

- Un único ciclo de animación, sin intervalos superpuestos.
- Transiciones sin elegir dos veces el mismo nodo ni bucles aleatorios ilimitados.
- Botón bloqueado durante la transición y resultado textual accesible.
- Pausa de la animación en pestañas ocultas y modo de movimiento reducido.

## Estructura

- `index.html`: contenido y controles.
- `style.css`: estilos y adaptación de pantalla.
- `script.js`: interacción con el navegador.
- `tools/serve.mjs`: servidor local con lista explícita de archivos públicos.
- `tools/build.mjs`: copia de los archivos públicos a `dist/`.
- `test/`: verificaciones automatizadas.

## Verificación y publicación

```sh
npm test
npm run build
```

El resultado `dist/` puede alojarse en un servicio estático. El build no publica la página por sí mismo. Las pruebas comprueban referencias locales y sintaxis; los proyectos con lógica de simulación incluyen pruebas de esa lógica. No se ha realizado verificación visual automatizada en un navegador.

## Alcance

Frontend de portfolio. No hay backend, base de datos, autenticación ni recolección de datos. Los controles cambian únicamente el estado temporal de la página. Las mejoras futuras deben acompañarse de sus propias pruebas y documentación.

## Autor

[Román González](https://github.com/romangon10)

MathJax se carga desde jsDelivr para notación decorativa. El relato y sus ecuaciones no constituyen un modelo físico validado.
