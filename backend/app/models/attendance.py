from app.extensions import db
from datetime import datetime


class Attendance(db.Model):

    __tablename__ = "attendance"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id"),
        nullable=False
    )

    check_in = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    check_out = db.Column(
        db.DateTime,
        nullable=True
    )

    total_hours = db.Column(
        db.Float,
        default=0
    )

    status = db.Column(
        db.String(20),
        default="Checked In"
    )

