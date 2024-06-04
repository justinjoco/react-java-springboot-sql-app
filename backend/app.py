"""app.py"""
import logging
import sys

from flask import Flask
from waitress import serve

file_handler = logging.FileHandler(filename='tmp.log')
stdout_handler = logging.StreamHandler(stream=sys.stdout)
handlers = [file_handler, stdout_handler]

logging.basicConfig(
    level=logging.INFO,
    format='[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
    handlers=handlers
)

logger = logging.getLogger(__name__)

app = Flask(__name__)

@app.route("/")
def hello_world():
    """Return hello world"""
    return "<p>Hello, World!</p>"

if __name__ == '__main__':
    logger.info("Starting server...")
    serve(app, host="0.0.0.0", port=5000)
