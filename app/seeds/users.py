from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@test.io', password='password', profile_url='https://as1.ftcdn.net/v2/jpg/04/73/30/84/1000_F_473308487_bN08dwkUpX96YvDh9SzKuBJxOYqFEGgd.jpg')
    marnie = User(
        username='marnie', email='marnie@test.io', password='password', profile_url='https://as1.ftcdn.net/v2/jpg/04/73/30/84/1000_F_473308468_DwuhPqmY6yriAmSI420REB3FD0eYqD2H.jpg')
    bobbie = User(
        username='bobbie', email='bobbie@test.io', password='password', profile_url='https://as1.ftcdn.net/v2/jpg/04/73/30/84/1000_F_473308449_RZR7Bad20DwIGZgfF7R8hkhGz6iKGWPv.jpg')

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
