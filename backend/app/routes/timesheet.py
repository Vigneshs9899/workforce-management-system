from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models.timesheet import Timesheet


timesheet_bp = Blueprint(
    "timesheet",
    __name__
)

@timesheet_bp.route(
    "/timesheets",
    methods=["POST"]
)
@jwt_required()
def create_timesheet():

    data = request.get_json()

    timesheet = Timesheet(
        hours_worked=data["hours_worked"],
        notes=data["notes"],
        employee_id=data["employee_id"],
        job_id=data["job_id"]
    )

    db.session.add(timesheet)

    db.session.commit()

    return jsonify({
        "message": "Timesheet created"
    }), 201



@timesheet_bp.route(
    "/timesheets",
    methods=["GET"]
)
@jwt_required()
def get_timesheets():

    timesheets = Timesheet.query.all()

    result = []

    for t in timesheets:

        result.append({
            "id": t.id,
            "hours_worked": t.hours_worked,
            "notes": t.notes,
            "employee": t.employee.name,
            "job": t.job.title
        })

    return jsonify(result)