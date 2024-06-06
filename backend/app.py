"""app.py"""

from flask import Flask
from waitress import serve
from api.route.store import store_api
from api.model.db import db
from tracing.log import logger


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"
               ] = "postgresql://admin:password@db/shopping_store"
    # initialize the app with the extension
    db.init_app(app)
    ## Initialize Config
    app.register_blueprint(store_api, url_prefix='/api')

    return app


if __name__ == '__main__':
    logger.info("Starting server...")
    app = create_app()
    serve(app, host="0.0.0.0", port=5000)
