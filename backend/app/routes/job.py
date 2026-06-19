from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models.job import Job
from app.models.employee import Employee

job_bp = Blueprint(
    "job",
    __name__
)

@job_bp.route(
    "/jobs",
    methods=["POST"]
)
@jwt_required()
def create_job():

    data = request.get_json()

    employee = Employee.query.filter_by(
        employee_code=data["employee_id"]
    ).first()

    if not employee:
        return jsonify({
            "message": "Employee not found"
        }), 404

    job = Job(
        job_code=data["job_code"],
        title=data["title"],
        description=data.get("description", ""),
        employee_id=employee.id,
        status=data["status"]
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({
        "message": "Job created"
    }), 201


@job_bp.route(
    "/jobs",
    methods=["GET"]
)
@jwt_required()
def get_jobs():

    jobs = Job.query.all()

    result = []

    for job in jobs:

        if job.employee:

            employee_data = {
                "id": job.employee.id,
                "name": job.employee.name,
                "email": job.employee.email
            }

        else:

            employee_data = {
                "id": None,
                "name": "Employee Deleted",
                "email": ""
            }

        result.append({
            "id": job.id,
            "job_code": job.job_code,
            "title": job.title,
            "status": job.status,
            "employee": employee_data
        })

    return jsonify(result)


@job_bp.route(
    "/jobs/<int:id>/status",
    methods=["PUT"]
)
@jwt_required()
def update_job_status(id):

    job = Job.query.get_or_404(id)

    data = request.get_json()

    job.status = data["status"]

    db.session.commit()

    return jsonify({
        "message": "Job status updated"
    })



@job_bp.route(
    "/jobs/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_job(id):

    job = Job.query.get_or_404(id)

    db.session.delete(job)

    db.session.commit()

    return jsonify({
        "message": "Job deleted"
    })