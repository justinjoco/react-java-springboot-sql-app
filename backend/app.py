"""app.py"""
import logging
import sys

from flask import Flask
from waitress import serve
from api.route.home import home_api

file_handler = logging.FileHandler(filename='tmp.log')
stdout_handler = logging.StreamHandler(stream=sys.stdout)
handlers = [file_handler, stdout_handler]

logging.basicConfig(
    level=logging.INFO,
    format=
    '[%(asctime)s] {%(filename)s:%(lineno)d} %(levelname)s - %(message)s',
    handlers=handlers)

logger = logging.getLogger(__name__)


def create_app():
    app = Flask(__name__)

    ## Initialize Config
    app.register_blueprint(home_api, url_prefix='/api')

    return app


if __name__ == '__main__':
    logger.info("Starting server...")
    app = create_app()
    serve(app, host="0.0.0.0", port=5000)
