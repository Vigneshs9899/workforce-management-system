from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.employee import Employee
from app.models.job import Job
from app.models.timesheet import Timesheet

import pandas as pd

import_bp = Blueprint(
    "import",
    __name__
)


@import_bp.route("/import", methods=["POST"])
def import_excel():

    file = request.files["file"]

    employees_df = pd.read_excel(
        file,
        sheet_name="Employees"
    )

    jobs_df = pd.read_excel(
        file,
        sheet_name="Jobs"
    )

    timesheets_df = pd.read_excel(
        file,
        sheet_name="Timesheets"
    )

    # Employees
    for _, row in employees_df.iterrows():

        employee = Employee(
            employee_code=row["employee_code"],
            name=row["name"],
            email=row["email"],
            phone=str(row["phone"]),
            department=row["department"],
            designation=row["designation"]
        )

        db.session.add(employee)

    db.session.commit()

    # Jobs
    for _, row in jobs_df.iterrows():

        employee = Employee.query.filter_by(
            employee_code=row["employee_code"]
        ).first()

        if employee:

            job = Job(
                job_code=row["job_code"],
                title=row["title"],
                description=row["description"],
                employee_id=employee.id,
                status=row["status"]
            )

            db.session.add(job)

    db.session.commit()

    # Timesheets
    for _, row in timesheets_df.iterrows():

        employee = Employee.query.filter_by(
            employee_code=row["employee_code"]
        ).first()

        job = Job.query.filter_by(
            job_code=row["job_code"]
        ).first()

        if employee and job:

            ts = Timesheet(
                employee_id=employee.id,
                job_id=job.id,
                hours_worked=row["hours_worked"],
                notes=row["notes"]
            )

            db.session.add(ts)

    db.session.commit()

    return jsonify({
        "message": "Excel imported successfully"
    })