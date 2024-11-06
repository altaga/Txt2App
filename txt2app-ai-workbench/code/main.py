# Modules
import os
import time
import ollama
import uvicorn
from pydantic import BaseModel
from subprocess import check_output, Popen
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse

# My Modules
from utils import preprocess, postprocess, emptyprompt

# API Setup
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# My Classes Models:
class Item(BaseModel):
    prompt: str

def check_server():
    try:
        check_output(["bash","command.sh"]) # ps -ef | grep ollama | grep serve -> This is the command in the .sh file. I've combined it into a single line for easier execution.
    except:
        DUMP = Popen(["ollama", "serve"])

def check_render():
    # Check Webpage Main UI
    data = ""
    with open("frontend/build/index.html") as f:
        data = f.read().replace('="/', '="')
    file = open("frontend/build/index.html", 'w')
    file.write(data)
    file.close()
    # Check Webpage Render
    data = ""
    with open("app-render/build-fallback/index.html") as f:
        data = f.read().replace('="/', '="')
    file = open("app-render/build-fallback/index.html", 'w')
    file.write(data)
    file.close()
    try:
        # Check Webpage Render
        data = ""
        with open("app-render/build/index.html") as f:
            data = f.read().replace('="/', '="')
        file = open("app-render/build/index.html", 'w')
        file.write(data)
        file.close()
    except:
        ...

def delete_route(router):
    for index, route in enumerate(app.routes):
        if route.path == router:
            print("Del")
            print(router)
            del app.routes[index]
            break

# API STATIC FILES
templates1 = Jinja2Templates(directory="app-render/build")
templates2 = Jinja2Templates(directory="frontend/build")
templates3 = Jinja2Templates(directory="app-render/build-fallback")
app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static5")
app.mount("/assets", StaticFiles(directory="frontend/build/assets"), name="static6")
# Ollama Server Setup
check_server()

# Global Share
app_code = ""
with open("app-render/src/smartphone.js") as f:
    app_code = f.read()
once = False

# POST

@app.post("/api/ollama/generate")
async def generate(item: Item):
    global app_code
    check_server()
    result = ollama.generate(model='deepseek-coder-v2:16b', prompt=preprocess(item.prompt or emptyprompt()), options={"temperature": 0.8})
    webpage = postprocess(result)
    file = open("app-render/src/smartphone.js", 'w')
    file.write(webpage)
    file.close()
    app_code = webpage
    build = Popen(["bash", "build.sh"])
    build.wait()
    data = ""
    check_render()
    return {"result": webpage}

# GET

@app.get("/api")
async def api_ollama():
    check_server()
    ollama.list()
    return {"result": "Hello From Text 2 App API"}

@app.get("/api/ollama/list")
async def list_ollama():
    check_server()
    return {"result": ollama.list()}

@app.get("/api/buildapk")
async def build_apk():
    file = open("Txt2App/App.js", 'w')
    file.write(app_code)
    file.close()
    build = Popen(["bash", "buildApp.sh"])
    build.wait()
    return {"result":"ok"}

@app.get("/api/downloadapk")
async def download_apk():
    return FileResponse("Txt2App/android/app/build/outputs/apk/release/app-release.apk", filename="txt2app.apk")

# Web Page Server

@app.get('/')
def index(request: Request):
    check_render()
    return templates2.TemplateResponse("index.html", {"request": request})

@app.get('/render/')
def index_render(request: Request):
    delete_route("/render/static")
    delete_route("/render/assets")
    try:
        check_render()
        app.mount("/render/static", StaticFiles(directory="app-render/build/static"), name="static1")
        app.mount("/render/assets", StaticFiles(directory="app-render/build/assets"), name="static2")
        return templates1.TemplateResponse("index.html", {"request": request})
    except:
        check_render()
        print("Fallback")
        app.mount("/render/static", StaticFiles(directory="app-render/build-fallback/static"), name="static3")
        app.mount("/render/assets", StaticFiles(directory="app-render/build-fallback/assets"), name="static4")
        return templates3.TemplateResponse("index.html", {"request": request})

