from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Notebook, Note
from app.forms import NotebookForm, NoteForm
import datetime

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

### Notebook
@user_routes.route('/<int:userid>/notebooks')
@login_required
def get_all_notebooks(userid):
    all_notebooks = Notebook.query.filter_by(userid=userid).all()
    return {"notebooks": [notebook.to_dict() for notebook in all_notebooks]}


@user_routes.route('/<int:userid>/notebooks/<int:notebookid>')
@login_required
def get_one_notebook(userid, notebookid):
    notebook = Notebook.query.filter_by(userid=userid, id=notebookid).first()
    print(notebook, "from routes RRRRRRR")
    notes = Note.query.filter_by(notebookid=notebookid).all()
    return {"notebook": notebook.to_dict(), "notes": [note.to_dict() for note in notes]}

@user_routes.route('/<int:userid>/notebooks', methods=["POST"])
@login_required
def create_one_notebook(userid):
    form = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["userid"].data = userid
    print(form['title'], "TTTTTTTTTitle")
    print(form.data, "Datatattaatat")
    if form.validate_on_submit()and form.title_valid():
        data = request.get_json()
        notebook = Notebook(userid = userid,
                            title = data['title']
        )
        db.session.add(notebook)
        db.session.commit()
        all_notebooks = Notebook.query.filter_by(userid=userid).all()
        return {"notebook": notebook.to_dict(), "notebooks":[notebook.to_dict() for notebook in all_notebooks]}
    else:
        return jsonify({"errors": form.errors})
#         # jsonify serializes data to JavaScript Object Notation (JSON) format

@user_routes.route('/<int:userid>/notebooks/<int:notebookid>', methods=["PATCH"])
@login_required
def edit_one_notebook(userid, notebookid):
    form  = NotebookForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["userid"].data = userid
    if form.validate_on_submit() and form.title_valid():
        data = request.get_json()
        notebook = Notebook.query.get(notebookid)
        if "title" in data.keys() and data["title"] != "":
            notebook.title = data["title"]
            notebook.updated_at = datetime.datetime.now()
        db.session.commit()
        all_notebooks = Notebook.query.filter_by(userid=userid).all()
        return {"notebooks": [notebook.to_dict() for notebook in all_notebooks]}
    else:
        return jsonify({"errors": form.errors})

@user_routes.route('/<int:userid>/notebooks/<int:notebookid>', methods=["DELETE"])
@login_required
def remove_one_notebook(userid, notebookid):
    notebook = Notebook.query.filter_by(id=notebookid).first()
    db.session.delete(notebook)
    db.session.commit()
    all_notebooks = Notebook.query.filter_by(userid=userid).all()
    return {"notebooks": [notebook.to_dict() for notebook in all_notebooks]}


### Note
@user_routes.route('/<int:userid>/notebooks/<int:notebookid>/notes')
@login_required
def get_notebook_notes(userid, notebookid):
    notebook_notes = Note.query.filter_by(userid=userid, notebookid=notebookid).all()
    return {"notes": [note.to_dict() for note in notebook_notes]}


@user_routes.route('/<int:userid>/notebooks/<int:notebookid>/notes/<int:noteid>')
@login_required
def get_notebook_note(userid, notebookid, noteid):
    notebook_note = Note.query.filter_by(id=noteid).first()
    return notebook_note.to_dict()

@user_routes.route('/<int:userid>/notebooks/<int:notebookid>/notes', methods=["POST"])
@login_required
def create_one_note(userid, notebookid):
    data = request.get_json()
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["userid"].data = userid
    form["notebookid"].data=notebookid
    if form.validate_on_submit() and form.title_valid():
        # data = request.get_json()
        note = Note(userid = userid,
                    notebookid = notebookid,
                    title = data["title"],
                    content = data["content"],
                    updated_at = datetime.datetime.now()
        )
        db.session.add(note)
        db.session.commit()
        all_notes = Note.query.filter_by(userid=userid, notebookid=notebookid).all()
        all_notebooks = Note.query.filter_by(userid=userid).all()
        return {"note": note.to_dict(), "notes": [note.to_dict() for note in all_notes], "notebooks": [notebook.to_dict() for notebook in all_notebooks]}
    else:
        return jsonify({"errors": form.errors})


@user_routes.route('/<int:userid>/notebooks/<int:notebookid>/notes/<int:noteid>', methods=["PATCH"])
@login_required
def edit_one_note(userid, notebookid, noteid):
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["userid"].data = userid
    form["notebookid"].data=notebookid
    data = request.get_json()
    print(form.data)
    if form.validate_on_submit() and form.title_valid():
        note = Note.query.get(noteid)
        note.title = data["title"]
        note.content = data["content"]
        note.upated_at = datetime.datetime.now()
        db.session.commit()
        all_notes = Note.query.filter_by(userid=userid, notebookid=notebookid).all()
        all_notebooks = Notebook.query.filter_by(userid=userid).all()
        return {"note": note.to_dict(), "notes": [note.to_dict() for note in all_notes], "notebooks": [notebook.to_dict() for notebook in all_notebooks]}
    else:
        return jsonify({"errors": form.errors})


@user_routes.route('/<int:userid>/notebooks/<int:notebookid>/notes/<int:noteid>', methods=["DELETE"])
@login_required 
def remove_one_note(userid, notebookid, noteid):
    note = Note.query.get(noteid)
    db.session.delete(note)
    db.session.commit()
    all_notes = Note.query.filter_by(userid=userid, notebookid=notebookid).all()
    all_notebooks = Notebook.query.filter_by(userid=userid).all()
    return {"notes": [note.to_dict() for note in all_notes], "notebooks": [notebook.to_dict() for notebook in all_notebooks]}


##notepage
@user_routes.route('/<int:userid>/notes')
# @login_required
def get_all_notes(userid):
    all_notes = Note.query.filter_by(userid=userid).all()
    return {"notes": [note.to_dict() for note in all_notes]}

@user_routes.route('/<int:userid>/notes/<int:noteid>')
# @login_required
def get_one_note(userid, noteid):
    one_note = Note.query.filter_by(id=noteid).first()
    if one_note:
        return one_note.to_dict()
    else:
        return jsonify({"errors": "Note can not be found!"})

@user_routes.route('/<int:userid>/notes', methods=["POST"])
# @login_required
def create_one_note_back(userid):
    data = request.get_json()
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["userid"].data = userid
    if form.validate_on_submit() and form.title_valid():
        note = Note(userid = userid,
                    title = data["title"],
                    content = data["content"],
                    notebookid = data["notebookid"]
        )
        db.session.add(note)
        db.session.commit()
        all_notes = Note.query.filter_by(userid=userid).all()
        return {"note": note.to_dict(), "notes": [note.to_dict() for note in all_notes]}
    else:
        return jsonify({"errors": form.errors})

@user_routes.route('/<int:userid>/notes/<int:noteid>', methods=["PATCH"])
# @login_required
def edit_one_note_back(userid,noteid):
    form = NoteForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    form["userid"].data = userid
    data = request.get_json()
    # print(form.data)
    if form.validate_on_submit() and form.title_valid():
        note = Note.query.get(noteid)
        note.notebookid = data["notebookid"]
        note.title = data["title"]
        note.content = data["content"]
        note.upated_at = datetime.datetime.now()
        db.session.commit()
        all_notes = Note.query.filter_by(userid=userid).all()
        return {"note": note.to_dict(), "notes": [note.to_dict() for note in all_notes]}
    else:
        return jsonify({"errors": form.errors})

@user_routes.route('/<int:userid>/notes/<int:noteid>', methods=["DELETE"])
# @login_required 
def remove_one_note_back(userid, noteid):
    note = Note.query.get(noteid)
    if note: 
        db.session.delete(note)
        db.session.commit()
    all_notes = Note.query.filter_by(userid=userid).all()
    return {"notes": [note.to_dict() for note in all_notes]}

