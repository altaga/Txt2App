# Project name
This project is Txt2App: Turn any idea into a fully functional mobile app, powered by LLM and Nvidia AI Workbench.

This documentation is designed to be open within AI Workbench, on github the links may appear broken.

## Description

Introducing **Txt2App**, Huang's promise becomes a reality, accessible to everyone, democratizing application development and opening up new possibilities for technology creation thanks to Nvidia Ai Workbench and LLMs (Generative AI).

<img src="https://i.ibb.co/qsyBjGF/Txt2App.png" width="300px">

## Getting Started

### Ollama:

This project requires the use of LLM models to be able to generate the App code without having to use code, so we will have to install the Ollama service, this will give us access to use the language models we want through API and Ollama Python which will give us access to this API more easily in a Python program.

<img src="https://i.ibb.co/wL3Cvpp/ollama.png" height="400px"> 

- Ollama Service: https://ollama.com/
- Ollama Python: https://github.com/ollama/ollama-python

We used the following LLM model to create code since it gave us the best results, but we invite you to try several models to carry out your tests.

- Deepseek Coder V2: https://ollama.com/library/deepseek-coder-v2

If you want to test only this model and operation, we leave you a Jupiter Notebook that you can run in the Nvidia AI Workbench to perform your own tests.

- [TEST NOTEBOOK](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/Notebooks/Text%20to%20App.ipynb)

### Frontend:

This frontend section is divided into two sections, since we have two important project elements here, which are the Main UI and the previewer. In both cases, the ReactJS framework was used, although with some modifications to be able to mount it on our FastAPI server (this will be detailed later).

### Preview App:

The app preview was done with a ReactJS library called `react-native-web` which converts native React Native code into a version viewable in our browser.

<img src="https://i.ibb.co/fnfFDnG/screen.png" height="400px"> 

This code is available at the following path:

- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/app-render/src/)

### Main UI:

The main UI of our application provides us with an easy way to access the prompt of the desired app, preview and test it and finally generate an installable APK.

<img src="https://i.ibb.co/S5QQC8k/screen2.png" height="400px"> 

This code is available at the following path:

- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/frontend/src/)

## Build App Backend:

The app build process is done using the React Native framework version 0.73 along with the Android command-line tools. This project allows us to build a functional Android app by calling the npm deploy command as specified in the `package.json` provided by the project.

    ...
    "scripts": {
      "android": "react-native run-android",
      "ios": "react-native run-ios",
      "lint": "eslint .",
      "start": "react-native start",
      "test": "jest",
      "deploy": "cd android && http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/gradlew :app:assembleRelease"
    }
    ...

This code is available at the following path:
- [Package JSON](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/txt2app/package.json)
- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/txt2app/)

## Fastapi:

Finally, having all the backend and frontend elements configured, we can go straight to our API with [FastAPI](https://fastapi.tiangolo.com/), this was configured in our Nvidia AI Workbench to function as a Custom App.

<img src="https://i.ibb.co/NNrzcYk/custom-App.png" width="100%"> 

The configurations that were made for the custom app were the following:

<img src="https://i.ibb.co/q71YM56/settings.png" height="400px">

The most important thing here is that we use port 8080 and host 0.0.0.0 which would be the localhost.

### Uvicorn Server:

Due to the way Nvidia AI Workbench works we had to use a module called Uvicorn, which allows us to select the host and port through which we are going to deploy our API. It is very important that both the Host and the Port are configured identically to the custom app.

    # Modules
    import uvicorn
    # My App
    from main import app

    if __name__ == '__main__':
        uvicorn.run(app=app, port=8080, host="0.0.0.0")

This code is available at the following path:
- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/app.py)

### Ollama Server:

Our API must be able to check if Ollama Server is on in order to use it within it, so we created a section of code that checks this and if it is not on, it runs it in the background.

    def check_server():
        try:
            check_output(["bash","command.sh"]) # ps -ef | grep ollama | grep serve -> This is the command in the .sh file. I've combined it into a single line for easier execution.
        except:
            DUMP = Popen(["ollama", "serve"])

If the server is up and running correctly we can call the LLM model directly from the API with the following route.

    @app.post("/api/ollama/generate")
    async def generate(item: Item):
        global app_code
        check_server()
        result = ollama.generate(model='deepseek-coder-v2:16b', prompt=preprocess(item.prompt), options={"temperature": 0.8})
        webpage = postprocess(result)
        file = open("app-render/src/smartphone.js", 'w')
        file.write(webpage)
        file.close()
        app_code = webpage
        build = Popen(["bash", "build.sh"])
        build.wait()
        data = ""
        with open("app-render/build/index.html") as f:
            data = f.read().replace('="/', '="')
        file = open("app-render/build/index.html", 'w')
        file.write(data)
        file.close()
        return {"result": webpage}

This code is available at the following path:
- [command.sh](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/command.sh)
- [build.sh](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/build.sh)
- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/app.py)

### Static Website:

In order to correctly display the UI, the server needs to be able to deliver a static website, so this was configured for both [Frontend](#frontend) applications.

    ...
    def check_render():
    # Check Webpage Render 
    data = ""
    with open("app-render/build/index.html") as f:
        data = f.read().replace('="/', '="')
    file = open("app-render/build/index.html", 'w')
    file.write(data)
    file.close()
    
    # Check Webpage Main UI
    data = ""
    with open("frontend/build/index.html") as f:
        data = f.read().replace('="/', '="')
    file = open("frontend/build/index.html", 'w')
    file.write(data)
    file.close()
    ...
    templates1 = Jinja2Templates(directory="app-render/build")
    templates2 = Jinja2Templates(directory="frontend/build")
    app.mount("/render/static", StaticFiles(directory="app-render/build/static"), name="static1")
    app.mount("/render/assets", StaticFiles(directory="app-render/build/assets"), name="static2")
    app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static3")
    app.mount("/assets", StaticFiles(directory="frontend/build/assets"), name="static4")
    ...
    @app.get('/render/')
    def index(request: Request):
        check_render()
        return templates1.TemplateResponse("index.html", {"request": request})

    @app.get('/')
    def index(request: Request):
        check_render()
        return templates2.TemplateResponse("index.html", {"request": request})

This code is available at the following path:
- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/main.py)

### Build Android APK:

Finally, the last section of the APK we need to explore is the execution of the final app build. This is generated by the React Native project by making the following API call.

    @app.get("/api/buildapk")
    async def build_apk():
        file = open("txt2app/App.js", 'w')
        file.write(app_code)
        file.close()
        build = Popen(["bash", "buildApp.sh"])
        build.wait()
        return {"result":"ok"}

    @app.get("/api/downloadapk")
    async def download_apk():
        return FileResponse("txt2app/android/app/build/outputs/apk/release/app-release.apk", filename="txt2app.apk")

This code is available at the following path:
- [buildApp.sh](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/buildApp.sh)
- [CODE](http://localhost:10002/projects/text-to-app/applications/jupyterlab/lab/tree/code/main.py)
