from .db import db
import datetime

class Note(db.Model):
    __tablename__ = "notes"

    id = db.Column(db.Integer, primary_key=True)
    userid = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    notebookid = db.Column(db.Integer, db.ForeignKey("notebooks.id"), nullable=False) 
    title = db.Column(db.String(45), nullable=False)
    content = db.Column(db.String(455), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now())
    
    def to_dict(self):
        return {
            "id": self.id,
            "userid": self.userid,
            "notebookid": self.notebookid,
            "title": self.title,
            "content": self.content,
            "created_at": self.created_at,
            "updated_at": self.updated_at        
        }


