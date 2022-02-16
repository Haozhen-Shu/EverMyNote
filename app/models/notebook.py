from .db import db
import datetime

class Notebook(db.Model):
    __tablename__ = "notebooks"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    title = db.Column(db.String(45), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at =  db.Column(db.DateTime, default=datetime.datetime.now())

    notes = db.relationship("Note", cascade="all,delete", backref="notebook", lazy=True)

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "userid": self.userid,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "notes": {note.id: note.to_dict() for note in self.notes}
        }