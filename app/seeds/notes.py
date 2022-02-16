from app.models import db, Note

def seed_notes():
    note1 = Note(
        userid='1', notebookid='1', title='flask', content="This is a note on flask.")
    note2 = Note(
        userid='1', notebookid='1', title='sqlalchemy', content="This is a note on sqlalchemy.")
    note3 = Note(
        userid='1', notebookid='1', title='class', content="This is a note on class.")
    note4 = Note(
        userid='1', notebookid='2', title='state', content="This is a note on state.")
    note5 = Note(
        userid='1', notebookid='2', title='store', content="This is a note on store.")
    note6 = Note(
        userid='1', notebookid='2', title='component', content="This is a note on component.")
    note7 = Note(
        userid='2', notebookid='1', title='header', content="This is a note on header.")
    note8 = Note(
        userid='2', notebookid='2', title='selector', content="This is a note on selector.")
    note9 = Note(
        userid='2', notebookid='3', title='element', content="This is a note on element.")
    note10 = Note(
        userid='3', notebookid='1', title='recursive', content= "This is a note on recursive.")
    note11 = Note(
        userid='3', notebookid='2', title='loop', content= "This is a note on loop.")

    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.add(note4)
    db.session.add(note5)
    db.session.add(note6)
    db.session.add(note7)
    db.session.add(note8)
    db.session.add(note9)
    db.session.add(note10)
    db.session.add(note11)
    db.session.commit()
   
def undo_notes():
    db.session.execute('TRUNCATE notes RESTART IDENTITY CASCADE;')
    db.session.commit()