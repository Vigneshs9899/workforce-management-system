from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app.models.job import Job
from app.models.attendance import Attendance
from app.models.employee import Employee

chart_bp = Blueprint(
    "chart",
    __name__
)


@chart_bp.route("/job-status-chart")
@jwt_required()
def job_status_chart():

    completed = Job.query.filter_by(
        status="Completed"
    ).count()

    pending = Job.query.filter_by(
        status="Pending"
    ).count()

    progress = Job.query.filter_by(
        status="In Progress"
    ).count()

    return jsonify({
        "completed": completed,
        "pending": pending,
        "progress": progress
    })


@chart_bp.route("/hours-chart")
@jwt_required()
def hours_chart():

    employees = Employee.query.all()

    labels = []
    hours = []

    for employee in employees:

        total_hours = 0

        for attendance in employee.attendance:

            if attendance.total_hours:

                total_hours += attendance.total_hours

        labels.append(
            employee.name
        )

        hours.append(
            round(total_hours,2)
        )

    return jsonify({
        "labels": labels,
        "hours": hours
    })