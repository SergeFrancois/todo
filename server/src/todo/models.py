from .db import db


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creator_name = db.Column(db.String)
    creator_email = db.Column(db.String)
    description = db.Column(db.String)
    is_done = db.Column(db.Boolean, nullable=False, default=False)

