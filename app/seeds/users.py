from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(username="Demo", email="demo@aa.io", password="password")
    sam = User(username="sam", email="sam@aa.io", password="password")
    will = User(username="will", email="will@aa.io", password="password")
    bob = User(username="bob", email="bob@aa.io", password="password")
    anthony = User(username="anthony", email="anthony@aa.io", password="password")

    # db.session.add(demo)
    db.session.add(sam)
    db.session.add(will)
    db.session.add(bob)
    db.session.add(anthony)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
