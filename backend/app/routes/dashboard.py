from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models.employee import Employee
from app.models.job import Job
from app.models.timesheet import Timesheet

dashboard_bp = Blueprint("dashboard", __name__)


@dashboard_bp.route("/dashboard", methods=["GET"])
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
        t.hours_worked for t in Timesheet.query.all()
    )

    return jsonify({
        "total_employees": total_employees,
        "total_jobs": total_jobs,
        "completed_jobs": completed_jobs,
        "pending_jobs": pending_jobs,
        "total_hours": total_hours
    })


@dashboard_bp.route("/dashboard/recent-employees")
@jwt_required()
def recent_employees():

    employees = Employee.query.order_by(
        Employee.id.desc()
    ).limit(5)

    result = []

    for emp in employees:
        result.append({
            "employee_code": emp.employee_code,
            "name": emp.name
        })

    return jsonify(result)


@dashboard_bp.route("/dashboard/recent-jobs")
@jwt_required()
def recent_jobs():

    jobs = Job.query.order_by(
        Job.id.desc()
    ).limit(5)

    result = []

    for job in jobs:
        result.append({
            "job_code": job.job_code,
            "title": job.title
        })

    return jsonify(result)


@dashboard_bp.route("/dashboard/hours-chart")
@jwt_required()
def hours_chart():

    timesheets = Timesheet.query.all()

    result = []

    for t in timesheets:

        result.append({
            "employee": t.employee.name,
            "hours_worked": t.hours_worked
        })

    return jsonify(result)


@dashboard_bp.route("/dashboard/recent-timesheets")
@jwt_required()
def recent_timesheets():

    timesheets = Timesheet.query.order_by(
        Timesheet.id.desc()
    ).limit(5)

    result = []

    for ts in timesheets:
        result.append({
            "employee": ts.employee.name,
            "hours_worked": ts.hours_worked
        })

    return jsonify(result)