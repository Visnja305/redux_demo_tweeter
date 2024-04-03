from ..models import Tweet, db


def seed_tweets():
    fake_tweets = [
        Tweet(tweet="Hello world", user_id=1),
        Tweet(tweet="How are you", user_id=2),
        Tweet(tweet="I am good", user_id=3),
        Tweet(tweet="My name is Anthony", user_id=4),
    ]

    for tweet in fake_tweets:
        db.session.add(tweet)

    db.session.commit()
