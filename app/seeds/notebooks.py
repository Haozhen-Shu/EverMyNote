from app.models import db, Notebook

def seed_notebooks():
    one = Notebook(
        userid='1', title='Python')
    two = Notebook(
        userid='1', title='Redux')
    three = Notebook(
        userid='1', title='React')
    four = Notebook(
        userid='2', title='HTML')
    five = Notebook(
        userid='2', title='CSS')
    six = Notebook(
         userid='2', title='PUG')
    ten = Notebook(
        userid='2', title='JINJA')
    seven = Notebook(
        userid='3', title='Javascript')
    eight = Notebook(
        userid='3', title='NodeJs')
    nine = Notebook(
        userid='3', title='Heroku')
    ten = Notebook(
        userid='3', title='Express')

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)
    db.session.add(four)
    db.session.add(five)
    db.session.add(six)
    db.session.add(seven)
    db.session.add(eight)
    db.session.add(nine)
    db.session.add(ten)


    db.session.commit()

def undo_notebooks():
    db.session.execute('TRUNCATE notebooks RESTART IDENTITY CASCADE;')
    db.session.commit()