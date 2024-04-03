from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .user import User


class Tweet(db.Model):
    __tablename__ = "tweets"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    tweet = db.Column(db.String(180), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    created_at = db.Column(db.DateTime(), default=db.func.now())

    user = db.relationship("User", back_populates="tweets")

    def make_pretty_date(self):
        if not self.created_at:
            return "NEW"
        else:
            pretty_date = str(self.created_at).split(" ")[0]
            return pretty_date

    def to_dict(self):
        return {
            "id": self.id,
            "tweet": self.tweet,
            "User": User.query.get(self.user_id).to_dict(),
            "createdAt": self.make_pretty_date(),
        }
