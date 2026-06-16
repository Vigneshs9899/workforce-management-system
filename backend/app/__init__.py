from flask import Flask
from app.config import Config
from app.extensions import db, jwt
from app.routes.auth import auth_bp
from app.routes.employee import employee_bp
from app.models.user import User
from app.models.employee import Employee


def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)
    app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)
    
    app.register_blueprint(
    employee_bp,
    url_prefix="/api"
)

    

    

    db.init_app(app)

    jwt.init_app(app)

    return app