from app.extensions import db

class Employee(db.Model):

    __tablename__ = "employees"

    id = db.Column(db.Integer, primary_key=True)

    employee_code = db.Column(
        db.String(20),
        unique=True,
        nullable=False
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True
    )

    phone = db.Column(
        db.String(20)
    )

    department = db.Column(
        db.String(100)
    )

    designation = db.Column(
        db.String(100)
    )

    status = db.Column(
        db.String(20),
        default="Active"
    )

    jobs = db.relationship(
    "Job",
    backref="employee",
    lazy=True,
    cascade="all, delete-orphan"
)
    
    attendance = db.relationship(
    "Attendance",
    backref="employee",
    lazy=True
)
    
    timesheets = db.relationship(
    "Timesheet",
    backref="employee",
    lazy=True
)