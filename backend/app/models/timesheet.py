from app.extensions import db
from datetime import date

class Timesheet(db.Model):

    __tablename__ = "timesheets"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    work_date = db.Column(
        db.Date,
        default=date.today
    )

    hours_worked = db.Column(
        db.Integer,
        nullable=False
    )

    notes = db.Column(
        db.Text
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id")
    )

    job_id = db.Column(
        db.Integer,
        db.ForeignKey("jobs.id")
    )