from flask import Blueprint
from flask import request
from flask import jsonify
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from app.extensions import db
from app.models.user import User

import bcrypt

auth_bp = Blueprint(
    "auth",
    __name__
)

@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.get_json()

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    )

    user = User(
        username=data["username"],
        email=data["email"],
        password=hashed_password.decode("utf-8")
    )

    db.session.add(user)

    db.session.commit()

    return jsonify({
        "message": "User registered"
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = User.query.filter_by(
        email=data["email"]
    ).first()

    if not user:
        return jsonify({
            "message": "Invalid email or password"
        }), 401

    if bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    ):

        access_token = create_access_token(
            identity=str(user.id)
        )

        return jsonify({
            "message": "Login successful",
            "token": access_token
        })

    return jsonify({
        "message": "Invalid email or password"
    }), 401

@auth_bp.route("/profile")
@jwt_required()
def profile():

    return jsonify({
        "message": "Protected Route Working"
    })