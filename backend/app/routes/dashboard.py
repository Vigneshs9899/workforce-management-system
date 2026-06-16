from flask import Blueprint
from flask import jsonify
from flask_jwt_extended import jwt_required

from app.models.employee import Employee
from app.models.job import Job
from app.models.timesheet import Timesheet

dashboard_bp = Blueprint(
    "dashboard",
    __name__
)


@dashboard_bp.route(
    "/dashboard",
    methods=["GET"]
)
@jwt_required()
def dashboard():

    total_employees = Employee.query.count()

    total_jobs = Job.query.count()

    completed_jobs = Job.query.filter_by(
        status="Completed"
    ).count()

    pending_jobs = Job.query.filter_by(
        status="Pending"
    ).count()

    total_hours = sum(
        t.hours_worked
        for t in Timesheet.query.all()
    )

    return jsonify({
        "total_employees": total_employees,
        "total_jobs": total_jobs,
        "completed_jobs": completed_jobs,
        "pending_jobs": pending_jobs,
        "total_hours_logged": total_hours
    })