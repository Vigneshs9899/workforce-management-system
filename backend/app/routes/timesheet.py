from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from datetime import date

from app.extensions import db
from app.models.timesheet import Timesheet
from app.models.employee import Employee
from app.models.job import Job

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

    employee = Employee.query.filter_by(
        employee_code=data["employee_id"]
    ).first()

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    job = Job.query.filter_by(
        job_code=data["job_id"]
    ).first()

    if not job:
        return jsonify({
            "message": "Job not found"
        }), 404

    timesheet = Timesheet(
        work_date=date.today(),
        hours_worked=data["hours_worked"],
        notes=data["notes"],
        employee_id=employee.id,
        job_id=job.id
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

        employee_name = (
            t.employee.name
            if t.employee
            else "Deleted Employee"
        )

        job_title = (
            t.job.title
            if t.job
            else "Deleted Job"
        )

        result.append({
            "id": t.id,
            "hours_worked": t.hours_worked,
            "notes": t.notes,
            "employee": employee_name,
            "job": job_title
        })

    return jsonify(result)

@timesheet_bp.route(
    "/timesheets/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_timesheet(id):

    timesheet = Timesheet.query.get_or_404(id)

    db.session.delete(timesheet)
    db.session.commit()

    return jsonify({
        "message": "Timesheet deleted"
    })


@timesheet_bp.route(
    "/timesheets/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def update_timesheet(id):

    timesheet = Timesheet.query.get_or_404(id)

    data = request.get_json()

    timesheet.hours_worked = data["hours_worked"]
    timesheet.notes = data["notes"]

    db.session.commit()

    return jsonify({
        "message": "Timesheet updated"
    })