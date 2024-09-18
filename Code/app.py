# Modules
import uvicorn
# My App
from main import app

if __name__ == '__main__':
    uvicorn.run(app=app, port=8080, host="0.0.0.0")