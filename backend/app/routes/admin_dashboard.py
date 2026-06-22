from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required

from app.models.employee import Employee
from app.models.job import Job
from app.models.attendance import Attendance

admin_dashboard_bp = Blueprint(
    "admin_dashboard",
    __name__
)

@admin_dashboard_bp.route("/admin-dashboard")
@jwt_required()
def admin_dashboard():

    recent_employees = Employee.query.order_by(
        Employee.id.desc()
    ).limit(5).all()

    recent_jobs = Job.query.order_by(
        Job.id.desc()
    ).limit(5).all()

    recent_timesheets = Attendance.query.order_by(
        Attendance.id.desc()
    ).limit(5).all()

    return jsonify({

        "employees":
        Employee.query.count(),

        "jobs":
        Job.query.count(),

        "completed_jobs":
        Job.query.filter_by(
            status="Completed"
        ).count(),

        "pending_jobs":
        Job.query.filter_by(
            status="Pending"
        ).count(),

        "attendance":
        Attendance.query.filter_by(
            status="Checked In"
        ).count(),

        "recent_employees":[
            {
                "employee_code":e.employee_code,
                "name":e.name
            }
            for e in recent_employees
        ],

        "recent_jobs":[
            {
                "job_name":j.job_name,
                "status":j.status
            }
            for j in recent_jobs
        ],

        "recent_timesheets":[
            {
                "employee":t.employee.name,
                "hours":t.total_hours
            }
            for t in recent_timesheets
        ]

    })