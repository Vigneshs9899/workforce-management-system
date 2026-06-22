from app.extensions import db


class Job(db.Model):

    __tablename__ = "jobs"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    job_name = db.Column(
        db.String(200),
        nullable=False
    )

    customer = db.Column(
        db.String(200),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    priority = db.Column(
        db.String(20),
        default="Medium"
    )

    status = db.Column(
        db.String(30),
        default="Pending"
    )

    due_date = db.Column(
        db.Date
    )

    remarks = db.Column(
        db.Text
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id"),
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )

    updated_at = db.Column(
        db.DateTime,
        server_default=db.func.now(),
        onupdate=db.func.now()
    )