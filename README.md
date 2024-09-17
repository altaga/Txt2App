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

# Diagram and Summary:

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

# Google VM:

Seleccionar el tipo de máquina virtual para el proyecto fue una tarea sencilla, especialmente al considerar que Google ofrece una gran variedad de GPU Nvidia. Después de realizar algunas pruebas en el calculador, se decidió utilizar una VM con las siguientes características.

<img src="./Images/vm.png">

<hr>

VM Selection Summary:

| HW/SW  | Selected Value         |
| ------ | ---------------------- |
| OS     | Ubuntu 24.04 LTS       |
| GPU    | Nvidia Tesla T4 (16Gb) |
| RAM    | 65 Gb                  |
| HDD    | 500 Gb                 |
| vCPU   | 10 cores               |

Se utilizo una maquina bastante potente en cuestion de RAM y vCPU ya que teniamos que experimentar la mejor seleccion de modelo LLM y no tener problemas con limitaciones de recursos, esto claro contemplando que no ibamos a utilizar modelos como llama3 405b, los cuales ocupan recuros de HW muy elevados en costos.

## SSH Setup:

Algo importante que hay que configurar para que no tengamos ningun problema en la siguiente seccion, es la configuracion de acceso SSH que que requerimos para configurar la VM y el acceso mediante el Nvidia AI Workbench.

- En nuestra pc local tendremos que crear una RSA Keypair, esto pude realizarse de muchas formas, sin embargo nosotros usaremos el comando `ssh-keygen` de la libreria OpenSSH.

  <img src="./Images/ssh0.png">

- La private key estara ya en nuestra carpeta .shh pero ocuparemos los datos del archivo id_rsa.pub, la que es la clave publica.

  <img src="./Images/ssh0_1.png">

- Iremos a la seccion inferior de la configuracion de VM:

  <img src="./Images/ssh1.png">

- Seleccionamos Advanced Options - Security - Manage Access - Add manually generated SSH keys, ahi colocaremos la public key del archivo id_rsa.pub.

  <img src="./Images/ssh2.png">

- Una vez echo esto ya tendremos todo listo para utilizar la VM sin ningun inconveniente mediante SSH, la ip address de la VM estara disponible despues de unos segundos.

  <img src="./Images/ssh3.png">

# Nvidia AI Workbench:

Ya con la VM configurada tendremos que conectarnos a ella mediante SSH para poder configurarla, esto puedes realizarlo con cualquier programa para ese fin, incluso GC te provee una interfaz web para realizar este proceso sin problema.

## Ubuntu Remote Install: 
- Abre una terminal SSH en el programa que prefieras (por ejemplo la web ui de GC).
  <img src="./Images/nw0.png">

- Una vez dentro de la VM pondremos el siguiente comando sin mas.

      mkdir -p $HOME/.nvwb/bin && \
      curl -L https://workbench.download.nvidia.com/stable/workbench-cli/$(curl -L -s https://workbench.download.nvidia.com/stable/workbench-cli/LATEST)/nvwb-cli-$(uname)-$(uname -m) --output $HOME/.nvwb/bin/nvwb-cli && \
      chmod +x $HOME/.nvwb/bin/nvwb-cli && \
      sudo -E $HOME/.nvwb/bin/nvwb-cli install

- Este comando instalara todas las dependencias del Nvidia AI Workbench, pero iremos paso a paso, tendras que aceptar los terminos de uso del programa.

  <img src="./Images/nw1.png">

- Para este proyecto se utilizo Docker, pero tu puedes experimentar con Podman si lo deseas.

  <img src="./Images/nw2.png">

- Recomendamos aqui que se haga la instalacion de los drivers como lo indica Nvidia AI Workbench, en nuestra maquina virtual funciono sin ningun problema.
  
  <img src="./Images/nw3.png">

- Empezara el proceso de instalacion, segun tu VM puede tardar menos de 2 min o mas de 5 min como indica Nvidia AI Workbench, sin embargo al usar una VW de Google no habra ningun problema por la velocidad de internet.

  <img src="./Images/nw4.png">

- Una vez terminado todo el proceso se reiniciara la VM, esto cerrara nuestra sesion de SSH, sin embargo ya no sera necesaria, ya podremos acceder desde nuestra Nvidia AI Workbench Local.

  <img src="./Images/nw5.png">

## Local Access: 

Ahora tenemos que configurar las credenciales de accesso a la platafoma en Nvidia AI Workbench local.

- Configura todas las credenciales de acceso como IP de la VM, private key, etc.

  <img src="./Images/nw6.png">

- Si todo funciono correctamente ya tendremos accesso a nuestro server remoto de Nvidia AI Workbench en la VM de google, en el caso de nuestro proyecto seleccionamos New Project.

  <img src="./Images/nw7.png"> 

- Segun las caraterosticas de tu proyecto personal elige el enviroment ideal para ti, en nuestro caso seleccionamos **Python with CUDA 12.2**.

  <img src="./Images/nw8.png"> 

- Si todo salio bien hasta ahora tendras acceso a una ventana como la siguiente, donde ya podras empezar a trabajar en el Nvidia AI Workbench remoto.

  <img src="./Images/nw9.png"> 

# Ollama:



# Frontend:

# Build App Backend:

# Fastapi:

# Txt2App:

## Prompt:

## Preview and Test:

## Build and Download:

## Install the App:

# Commentary:

# References: