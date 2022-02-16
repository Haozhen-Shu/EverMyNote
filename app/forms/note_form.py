from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField
from wtforms.validators import DataRequired
from app.models import Note

class NoteForm(FlaskForm):
    userid = IntegerField("userid")
    notebookid = IntegerField("notebookid", validators=[DataRequired()])
    title = StringField("title", validators=[DataRequired()])
    content = TextAreaField("content", validators=[DataRequired()])

    def title_unique(self):
        notebookid = self.notebookid.data
        title = self.title.data
        notebook = Note.query.filter_by(notebookid=notebookid, title=title).first()
        if notebook:
            self.title.errors.append("Title already exists")
            return False
        elif title = "":
            self.title.errors.append("Invalid Title")
            return False
        else:
            return True

