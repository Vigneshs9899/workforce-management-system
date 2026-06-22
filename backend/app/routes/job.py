from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt

from app.extensions import db
from app.models.job import Job
from app.models.employee import Employee

job_bp = Blueprint(
    "job",
    __name__
)


# ==========================
# Admin - Create Job
# ==========================
@job_bp.route("/jobs", methods=["POST"])
@jwt_required()
def create_job():

    data = request.get_json()

    job = Job(
        job_name=data["job_name"],
        customer=data["customer"],
        description=data["description"],
        priority=data["priority"],
        status=data["status"],
        due_date=data["due_date"],
        employee_id=data["employee_id"]
    )

    db.session.add(job)
    db.session.commit()

    return jsonify({
        "message": "Job created successfully"
    })


# ==========================
# Admin - View All Jobs
# ==========================
@job_bp.route("/jobs")
@jwt_required()
def get_jobs():

    jobs = Job.query.order_by(
        Job.id.desc()
    ).all()

    result = []

    for job in jobs:

        result.append({

            "id": job.id,

            "job_name": job.job_name,

            "customer": job.customer,

            "description": job.description,

            "priority": job.priority,

            "status": job.status,

            "due_date":
            str(job.due_date),

            "remarks":
            job.remarks,

            "employee":
            job.employee.name if job.employee else "-"

        })

    return jsonify(result)


# ==========================
# Admin - Delete Job
# ==========================
@job_bp.route("/jobs/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_job(id):

    job = Job.query.get_or_404(id)

    db.session.delete(job)

    db.session.commit()

    return jsonify({
        "message": "Job deleted"
    })


# ==========================
# Employee - My Jobs
# ==========================
@job_bp.route("/my-jobs")
@jwt_required()
def my_jobs():

    claims = get_jwt()

    employee_id = claims["employee_id"]

    jobs = Job.query.filter_by(
        employee_id=employee_id
    ).all()

    result = []

    for job in jobs:

        result.append({

            "id": job.id,

            "job_name": job.job_name,

            "customer": job.customer,

            "priority": job.priority,

            "status": job.status,

            "due_date":
            str(job.due_date),

            "remarks":
            job.remarks

        })

    return jsonify(result)


# ==========================
# Employee - Update Status
# ==========================
@job_bp.route(
    "/update-job/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def update_job(id):

    data = request.get_json()

    job = Job.query.get_or_404(id)

    job.status = data["status"]

    job.remarks = data["remarks"]

    db.session.commit()

    return jsonify({
        "message": "Job updated"
    })