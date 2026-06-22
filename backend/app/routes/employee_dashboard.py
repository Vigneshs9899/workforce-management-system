from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt
from datetime import date, timedelta
from app.models.job import Job

from app.models.attendance import Attendance

employee_dashboard_bp = Blueprint(
    "employee_dashboard",
    __name__
)


@employee_dashboard_bp.route("/employee-dashboard")
@jwt_required()
def employee_dashboard():

    claims = get_jwt()

    employee_id = claims["employee_id"]

    today = date.today()

    week_start = today - timedelta(days=today.weekday())

    records = Attendance.query.filter_by(
        employee_id=employee_id
    ).order_by(
        Attendance.id.desc()
    ).all()

    active = Attendance.query.filter_by(
        employee_id=employee_id,
        status="Checked In"
    ).first()

    today_hours = 0
    weekly_hours = 0

    recent_timesheets = []

    for record in records:

        if record.total_hours:

            if record.check_in.date() == today:

                today_hours += record.total_hours

            if record.check_in.date() >= week_start:

                weekly_hours += record.total_hours

        recent_timesheets.append({

            "date":
            record.check_in.strftime(
                "%d-%m-%Y"
            ),

            "hours":
            record.total_hours

        })

        assigned_jobs = Job.query.filter_by(
    employee_id=employee_id
).count()

    return jsonify({

        "status":
        "Checked In" if active else "Checked Out",

        "today_hours":
        round(today_hours,2),

        "weekly_hours":
        round(weekly_hours,2),

       "assigned_jobs": assigned_jobs,

        "check_in":
        active.check_in.isoformat()
        if active else None,

        "recent_timesheets":
        recent_timesheets[:5]

    })