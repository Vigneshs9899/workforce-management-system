from app import create_app
from app.extensions import db
from app.models.user import User
import bcrypt

app = create_app()

with app.app_context():

    db.create_all()

    if not User.query.filter_by(
        email="vicky@gmail.com"
    ).first():

        hashed_password = bcrypt.hashpw(
            "admin123".encode("utf-8"),
            bcrypt.gensalt()
        )

        admin = User(
            username="admin",
            email="vicky@gmail.com",
            password=hashed_password.decode("utf-8"),
            role="ADMIN"
        )

        db.session.add(admin)
        db.session.commit()

        print("Admin user created.")

    else:

        print("Admin already exists.")