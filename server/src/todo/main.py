import json
from apifairy import APIFairy
# from argparse import ArgumentParser
from flask import Flask
from flask_cors import CORS
from flask_marshmallow import Marshmallow
from werkzeug.exceptions import HTTPException
from .db import db

apifairy = APIFairy()
ma = Marshmallow()


def register_error_handlers(app):
    @app.errorhandler(HTTPException)
    def handle_http_exception(e):
        response = e.get_response()
        response.data = json.dumps({
            'error': {
                'code': e.code,
                'message': e.description            
            }
        })
        response.content_type = 'application/json'
        return response

def create_app():
    app = Flask(__name__)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})
    app.config.from_pyfile('config.py')
    db.init_app(app)
    ma.init_app(app)
    apifairy.init_app(app)
    from .blueprints.todos import blueprint as todo_blueprint
    app.register_blueprint(todo_blueprint, url_prefix='/api/todos')
    from .blueprints.auth import blueprint as auth_blueprint
    app.register_blueprint(auth_blueprint, url_prefix='/api/auth')
    register_error_handlers(app)
    from .models import Todo
    with app.app_context():
        db.create_all()
    return app


# if __name__ == '__main__':
#     parser = ArgumentParser()
#     parser.add_argument('-p', '--port', type=int, default=5000, help='Port to listen on')
#     args = parser.parse_args()
#     port = args.port
#     app = create_app()
#     app.run(host='0.0.0.0', port=port)