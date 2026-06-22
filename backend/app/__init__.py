from flask import Flask
from flask_cors import CORS

from app.config import Config
from app.extensions import db, jwt

from app.routes.auth import auth_bp
from app.routes.employee import employee_bp
from app.routes.job import job_bp
from app.routes.timesheet import timesheet_bp
from app.routes.dashboard import dashboard_bp
from app.routes.import_data import import_bp
from app.routes.attendance import attendance_bp
from app.routes.admin_dashboard import admin_dashboard_bp
from app.routes.employee_dashboard import employee_dashboard_bp
from app.routes.chart_routes import chart_bp

def create_app():

    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    db.init_app(app)

    jwt.init_app(app)

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

    app.register_blueprint(
        import_bp,
        url_prefix="/api"
    )

    app.register_blueprint(
        attendance_bp,
        url_prefix="/api"
    )

    app.register_blueprint(
        admin_dashboard_bp,
        url_prefix="/api"
    )

    app.register_blueprint(
        employee_dashboard_bp,
        url_prefix="/api"
    )

    app.register_blueprint(
    chart_bp,
    url_prefix="/api"
)

    return app