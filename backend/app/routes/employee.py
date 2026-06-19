from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models.employee import Employee

employee_bp = Blueprint(
    "employee",
    __name__
)

@employee_bp.route(
    "/employees",
    methods=["POST"]
)
@jwt_required()
def create_employee():

    data = request.get_json()

    employee_count = Employee.query.count() + 1

    employee = Employee(
    employee_code=f"EMP{employee_count:03}",
    name=data.get("name"),
    email=data.get("email"),
    phone=data.get("phone"),
    department=data.get("department"),
    designation=data.get("designation")
)

    db.session.add(employee)
    db.session.commit()

    return jsonify({
        "message": "Employee created"
    }), 201


@employee_bp.route(
    "/employees",
    methods=["GET"]
)
@jwt_required()
def get_employees():

    employees = Employee.query.all()

    result = []

    for emp in employees:
        result.append({
            "id": emp.id,
            "employee_code": emp.employee_code,
            "name": emp.name,
            "email": emp.email,
            "phone": emp.phone,
            "department": emp.department,
            "designation": emp.designation,
            "status": emp.status
        })

    return jsonify(result)


@employee_bp.route(
    "/employees/<int:id>",
    methods=["GET"]
)
@jwt_required()
def get_employee(id):

    employee = Employee.query.get_or_404(id)

    return jsonify({
        "id": employee.id,
        "employee_code": employee.employee_code,
        "name": employee.name,
        "email": employee.email,
        "phone": employee.phone,
        "department": employee.department,
        "designation": employee.designation,
        "status": employee.status
    })


@employee_bp.route(
    "/employees/<int:id>",
    methods=["PUT"]
)
@jwt_required()
def update_employee(id):

    employee = Employee.query.get_or_404(id)

    data = request.get_json()

    employee.name = data["name"]
    employee.email = data["email"]
    employee.phone = data["phone"]
    employee.department = data["department"]
    employee.designation = data["designation"]

    db.session.commit()

    return jsonify({
        "message": "Employee updated"
    })


@employee_bp.route(
    "/employees/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_employee(id):

    employee = Employee.query.get_or_404(id)

    db.session.delete(employee)

    db.session.commit()

    return jsonify({
        "message": "Employee deleted"
    })