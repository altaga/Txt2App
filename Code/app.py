import uvicorn        # Uvicorn is the server used to run FastAPI apps
from main import app  # Import the app instance from main.py

if __name__ == '__main__':
    # Run the app on host "0.0.0.0" and port 8080
    # This setup is important for running the app with Nvidia AI Workbench
    uvicorn.run(app=app, port=8080, host="0.0.0.0")
