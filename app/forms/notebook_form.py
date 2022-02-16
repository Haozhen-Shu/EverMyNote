from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from app.models import Notebook

class NotebookForm(FlaskForm):
    userid = IntegerField("userid")
    title = StringField('title', validators=[DataRequired()])

    def title_unique(self):
        userid = self.userid.data
        title = self.title.data
        notebook = Notebook.query.filter_by(userid=userid, title=title).first()

        if notebook:
            self.title.errors.append("Notebook already exists")
            return False
        elif title="":
            self.title.errors.append("Invalid title")
            return False
        else:
            return True