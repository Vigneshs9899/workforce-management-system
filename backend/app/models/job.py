from app.extensions import db

class Job(db.Model):

    __tablename__ = "jobs"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    job_code = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    title = db.Column(
        db.String(100),
        nullable=False
    )

    description = db.Column(
        db.Text
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )

    employee_id = db.Column(
        db.Integer,
        db.ForeignKey("employees.id")
    )