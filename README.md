# Txt2App

<img src="./Images/Txt2App.png" width="360px">

Txt2App: Convierte cualquier idea en una app móvil perfectamente funcional, impulsada por LLM y Nvidia AI Workbench.

# Fastlinks:

Hi!, if you are a judge and want to review the code and Nvidia Ai Workbench Container here the links:

- **Nvidia Ai Workbench Container**: [OPEN VIDEO](pending...)
- **Video Demo**: [OPEN VIDEO](pending...)

# Introduction:

En un mundo cada vez más impulsado por la tecnología, la capacidad de desarrollar aplicaciones móviles no debería estar reservada solo para programadores expertos. Jensen Huang, CEO de Nvidia, ha destacado la necesidad de enfocarnos en aprender ingeniería de prompt en lugar de la programación tradicional, señalando: "It is our job to create computing technology such that nobody has to program. And that the programming language is human."

<img src="./Images/huang.png" width="100%">

Los **LLMs** proporcionan la capacidad para procesar entradas de lenguaje natural y generación de texto (no limitandose a lenguaje natural), lo cual es una herramieta indispensable para lograr este objetivo.

<img src="./Images/llms.png" width="100%">

**Nvidia AI Workbench** ofrece un entorno robusto para la creación, entrenamiento y optimización de modelos de inteligencia artificial basado en contenedores, sobre todo permite utilizar recursos tanto en la máquina local como en servidores externos, facilitando el desarrollo rapido desde entornos listos para trabajar, esto acelerando los tiempos de desarrollo.

<img src="./Images/nvidiaaiwork.png" width="100%">

# Problem:

Desarrollar aplicaciones móviles presenta diversos desafíos:

- **Complejidad del Código**: La programación de aplicaciones móviles involucra la escritura y depuración de código, lo que puede ser difícil sin una sólida experiencia técnica.

- **Diversidad de frameworks, versiones y plataformas**: Asegurar que una aplicación funcione de manera óptima en diferentes dispositivos requiere gestionar múltiples versiones y configuraciones, lo cual puede complicar el proceso de desarrollo.

- **Diseño de UI/UX**: Diseñar una buena UI/UX que cumpla con las expectativas de los usuarios, quienes ya están acostumbrados a patrones de diseño establecidos y actuales, puede ser una tarea aún más desafiante que desarrollar el propio backend de la aplicación.

<hr>

<img src="./Images/gifo.gif" width="100%">

# Current Solutions:

- Flutter Flow: Esta solucion que provee herramientas para el diseño de interfaces, pero no provee ninguna capacidad de AI. https://www.flutterflow.io/product

- Appypie: Esta solucion text to app, permite realizar aplicaciones solo con un prompt de texto, sin embargo esta requiere de una suscripcion, es de codigo cerrado y el demo proporcionado por la pagina no provee evidencia del uso de AI. https://www.appypie.com/

- UI Bakery: Aunque esta pagina muestra de una mejor forma el diseño de interfaces mediante AI, no provee ninguna funcionalidad a la app, solo generando diseños base. https://uibakery.io/

# Solution: 

Presentamos **Txt2App**, la promesa de Huang se convierte en una realidad, accesible para todos, democratizando el desarrollo de aplicaciones y abriendo nuevas posibilidades para la creación de tecnología gracias a Nvidia Ai Workbench y los LLMs (Generative AI).

<img src="./Images/Txt2App.png" width="300px">

# Diagrams:

El diagrama general de nuestra solucion es el siguiente, este es un summary de los servicios, pero los detallaremos mas adelante.

<img src="./Images/full diagram.drawio.png">

- Google Cloud VM: Estamos utilizando una VM de google con las siguientes caracteristicas.
  - OS: Ubuntu 24.04 LTS.
  - GPU: Nvidia Tesla T4 (16Gb).
  - RAM: 65 Gb.
  - HDD: 500 Gb.
  - vCPU: 10 cores.
- Nvidia AI Workbench: Se utiliza el toolkit de Nvidia para realizar el desarrollo y despleuigue rapido de nuestra aplicacion.
  - https://docs.nvidia.com/ai-workbench/user-guide/latest/overview/introduction.html
- Ollama Server: Utilizamos el servicio de Ollama server para utilizar los modelos LLM utilizados en el proyecto.
  - LLM Model: Deepseek Coder V2.
    - https://ollama.com/library/deepseek-coder-v2
- ReactJS: Este fue el framework web para realizar las UI del proyecto, utilizamos ReactJS puro sin framework adicional.
  - Main UI: Esta es la interfaz principal del proyecto donde se visualiza la ventana de texto y la previsualizacion de la App.
  - App Preview: Esta interfaz pre-renderiza la app para que la pruebe el usuario antes de convertirla en APK.
- React Native:
  - App Builder: Se utiliza el build nativo de Android para convertir el codigo de React en un codigo nativo de Android.
- Fastapi: Utilizamos este framework para realizar la API completa de nuestra aplicacion.
  - Static Website: Esta seccion de la API se usa como server para visualizar la UI desde el browser.
  - API: Esta seccion comunica la UI con los servicios de generacion, previsualizacion y build.