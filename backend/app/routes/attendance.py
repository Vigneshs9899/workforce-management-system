from flask import Blueprint, jsonify
from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from datetime import datetime
import pytz

from app.extensions import db
from app.models.attendance import Attendance
from app.models.employee import Employee

attendance_bp = Blueprint(
    "attendance",
    __name__
)

india = pytz.timezone("Asia/Kolkata")


@attendance_bp.route("/checkin", methods=["POST"])
@jwt_required()
def checkin():

    claims = get_jwt()

    employee_id = claims["employee_id"]

    employee = Employee.query.get(employee_id)

    active = Attendance.query.filter_by(
        employee_id=employee.id,
        status="Checked In"
    ).first()

    if active:
        return jsonify({
            "message": "Already checked in"
        }), 400

    attendance = Attendance(
    employee_id=employee.id,
    check_in=datetime.now()
)

    db.session.add(attendance)
    db.session.commit()

    return jsonify({
        "message": "Checked In"
    })


@attendance_bp.route("/checkout", methods=["PUT"])
@jwt_required()
def checkout():

    claims = get_jwt()

    employee_id = claims["employee_id"]

    employee = Employee.query.get(employee_id)

    attendance = Attendance.query.filter_by(
        employee_id=employee.id,
        status="Checked In"
    ).first()

    if not attendance:
        return jsonify({
            "message": "No active check-in"
        }), 404

    attendance.check_out = datetime.now()

    hours = (
        attendance.check_out -
        attendance.check_in
    ).total_seconds() / 3600

    attendance.total_hours = round(
        hours,
        2
    )

    attendance.status = "Checked Out"

    db.session.commit()

    return jsonify({
        "message": "Checked Out"
    })


@attendance_bp.route("/attendance-status")
@jwt_required()
def attendance_status():

    claims = get_jwt()

    employee_id = claims["employee_id"]

    attendance = Attendance.query.filter_by(
        employee_id=employee_id,
        status="Checked In"
    ).first()

    if attendance:

        return jsonify({
            "status": "Checked In",
            "check_in": attendance.check_in.isoformat()
        })

    return jsonify({
        "status": "Checked Out"
    })


@attendance_bp.route("/attendance-history")
@jwt_required()
def attendance_history():

    claims = get_jwt()

    employee_id = claims["employee_id"]

    records = Attendance.query.filter_by(
        employee_id=employee_id
    ).order_by(
        Attendance.id.desc()
    ).all()

    result = []

    for record in records:

        result.append({

            "check_in":
record.check_in.strftime(
    "%d-%m-%Y %I:%M %p"
),

"check_out":
record.check_out.strftime(
    "%d-%m-%Y %I:%M %p"
) if record.check_out else "-",

            "total_hours":
            record.total_hours,

            "status":
            record.status

        })

    return jsonify(result)