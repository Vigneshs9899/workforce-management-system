from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt
import pytz

from app.models.attendance import Attendance

timesheet_bp = Blueprint(
    "timesheet",
    __name__
)

india = pytz.timezone("Asia/Kolkata")


@timesheet_bp.route("/timesheets")
@jwt_required()
def get_timesheets():

    claims = get_jwt()

    role = claims["role"]

    if role == "ADMIN":

        records = Attendance.query.order_by(
            Attendance.id.desc()
        ).all()

    else:

        records = Attendance.query.filter_by(
            employee_id=claims["employee_id"]
        ).order_by(
            Attendance.id.desc()
        ).all()

    result = []

    for record in records:

        result.append({

            "employee":
            record.employee.name,

            "date":
            record.check_in.strftime(
                "%d-%m-%Y"
            ),

            "check_in":
            record.check_in.strftime(
                "%I:%M %p"
            ),

            "check_out":
            record.check_out.strftime(
                "%I:%M %p"
            )
            if record.check_out
            else "-",

            "hours":
            record.total_hours,

            "status":
            record.status

        })

    return jsonify(result)