from flask import Flask
from app.config import Config
from app.extensions import db, jwt
from app.routes.auth import auth_bp
from app.routes.employee import employee_bp
from app.models.user import User
from app.models.employee import Employee
from app.models.job import Job
from app.routes.job import job_bp
from app.routes.timesheet import timesheet_bp
from app.models.timesheet import Timesheet
from app.routes.dashboard import dashboard_bp

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

    app.register_blueprint(
    job_bp,
    url_prefix="/api"
)
    
    app.register_blueprint(
    timesheet_bp,
    url_prefix="/api"
)

    app.register_blueprint(
    dashboard_bp,
    url_prefix="/api"
)
    

    db.init_app(app)

    jwt.init_app(app)

    return app