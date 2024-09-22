import ollama  # Ollama server module (https://github.com/ollama/ollama-python)
from pydantic import BaseModel  # Base class for data validation and parsing
from subprocess import check_output, Popen  # To run shell commands and processes
from fastapi import FastAPI, Request  # Web framework for building APIs
from fastapi.staticfiles import StaticFiles  # Serves static files (HTML, CSS, JS, etc.)
from fastapi.templating import Jinja2Templates  # To render HTML templates
from fastapi.middleware.cors import CORSMiddleware  # To handle CORS for cross-origin requests, like API calls from other custom apps
from fastapi.responses import FileResponse  # To return files, like APKs for download
from utils import preprocess, postprocess, emptyprompt  # Helper functions for prompt processing

# API Setup: Initialize the FastAPI app and configure CORS settings
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    # Allow requests from any domain
    allow_credentials=True, # Allow credentials (cookies, etc.)
    allow_methods=["*"],    # Allow all HTTP methods
    allow_headers=["*"],    # Allow all headers
)


# Model to validate incoming POST request payloads
class Item(BaseModel):
    prompt: str  # Expects a 'prompt' field with a string value


# Function to check if the Ollama LLM server is running, and start it if not
def check_server():
    try:
        # Run the bash script to verify if the Ollama server is running
        check_output(["bash", "command.sh"])  # Check if the Ollama server is active
    except:
        # Start Ollama server if the above command fails
        DUMP = Popen(["ollama", "serve"])


# Function to ensure HTML rendering by fixing resource paths and checking rendering fallback
def check_render():
    # Fix resource paths in the main webpage UI (frontend app)
    data = ""
    with open("frontend/build/index.html") as f:
        data = f.read().replace('="/', '="')  # Fix the asset path issue
    file = open("frontend/build/index.html", "w")
    file.write(data)
    file.close()

    # Fix the paths in the fallback render version
    data = ""
    with open("app-render/build-fallback/index.html") as f:
        data = f.read().replace('="/', '="')
    file = open("app-render/build-fallback/index.html", "w")
    file.write(data)
    file.close()

    # Attempt to fix paths for the app preview
    try:
        data = ""
        with open("app-render/build/index.html") as f:
            data = f.read().replace('="/', '="')
        file = open("app-render/build/index.html", "w")
        file.write(data)
        file.close()
    except:
        ...  # If this fails, move on without crashing, the app will still work but showing the fallback


# Function to delete a route from the FastAPI router
def delete_route(router):
    for index, route in enumerate(app.routes):
        if route.path == router:  # Check if the path matches the given route
            print("Del")
            print(router)
            del app.routes[index]  # Delete the route if found, if not found, do nothing
            break


# API STATIC FILES: Setting up directories to serve static files like HTML, CSS and JS.
templates1 = Jinja2Templates(directory="app-render/build")
templates2 = Jinja2Templates(directory="frontend/build")
templates3 = Jinja2Templates(directory="app-render/build-fallback")
app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static5")
app.mount("/assets", StaticFiles(directory="frontend/build/assets"), name="static6")

# Ollama Server Setup: Ensure the LLM server is running
check_server()

# Global Share: Load and store the app's code from a JS file for modification and rebuilding
app_code = ""
with open("app-render/src/smartphone.js") as f:
    app_code = f.read()

###### ROUTES #######

### POST request
@app.post("/api/ollama/generate")
async def generate(item: Item):
    global app_code
    check_server()  # Ensure Ollama LLM server is running
    # item.prompt is the user's prompt
    # emptyprompt() is the default prompt if the user does not provide one
    # preprocess() is a helper function to preprocess the prompt to ensure the model can handle it correctly
    result = ollama.generate(
        model="deepseek-coder-v2:16b",
        prompt=preprocess(item.prompt or emptyprompt()),
        options={"temperature": 0.8},
    )

    # postprocess() is a helper function to postprocess the result to ensure the UI can render it correctly
    webpage = postprocess(result)
    # Save the generated webpage to the smartphone.js file, to be used in the UI preview
    file = open("app-render/src/smartphone.js", "w")
    file.write(webpage)
    file.close()

    app_code = webpage  # Update global variable with new code
    build = Popen(["bash", "build.sh"])  # Trigger rebuilding of the UI preview
    build.wait()  # Wait for the build process to finish

    check_render()  # Ensure the new UI will render correctly
    return {"result": webpage}  # Return the updated UI code


### GET requests
@app.get("/api")
async def api_ollama():
    check_server()  # Ensure Ollama server is running
    ollama.list()  # Dont remove, this command is needed to ensure the Ollama server and Ollama python module is up. 
    return {"result": "Hello From Text 2 App API"}


@app.get("/api/ollama/list")
async def list_ollama():
    check_server()  # Ensure Ollama server is running before listing models
    return {"result": ollama.list()}  # Return available models from Ollama


@app.get("/api/buildapk")
async def build_apk():
    # Save the current app code to a file before building the APK
    file = open("Txt2App/App.js", "w")
    file.write(app_code)
    file.close()

    # Run the APK build script, this command lint the code and build the APK.
    build = Popen(["bash", "buildApp.sh"])
    build.wait()  # Wait for the build to finish
    return {"result": "ok"}  # Confirm the APK build


@app.get("/api/downloadapk")
async def download_apk():
    # Serve the APK file for download
    return FileResponse(
        "Txt2App/android/app/build/outputs/apk/release/app-release.apk",
        filename="txt2app.apk",
    )


# Web Page Static Server, this is the main web page
@app.get("/")
def index(request: Request):
    check_render()  # Ensure the main webpage renders correctly
    return templates2.TemplateResponse("index.html", {"request": request})

# Web Page Static Server for preview UI
@app.get("/render/")
def index_render(request: Request):
    delete_route("/render/static")  # Clear any previous routes for static assets
    delete_route("/render/assets")

    try:
        check_render()  # Ensure the UI renders correctly
        # Mount the static assets for the preview UI
        app.mount(
            "/render/static",
            StaticFiles(directory="app-render/build/static"),
            name="static1",
        )
        app.mount(
            "/render/assets",
            StaticFiles(directory="app-render/build/assets"),
            name="static2",
        )
        return templates1.TemplateResponse("index.html", {"request": request})
    except:
        check_render()  # If preview fails, fall back to a "error" page, avoid crashing the app
        print("Fallback")
        app.mount(
            "/render/static",
            StaticFiles(directory="app-render/build-fallback/static"),
            name="static3",
        )
        app.mount(
            "/render/assets",
            StaticFiles(directory="app-render/build-fallback/assets"),
            name="static4",
        )
        return templates3.TemplateResponse("index.html", {"request": request})
