from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Tweet, db
from app.forms import New_Tweet_Form, UpdateTweetForm

tweet_routes = Blueprint("tweets", __name__)


@tweet_routes.route("/")
def get_all_tweets():
    tweets = Tweet.query.all()
    # tweets = db.session.query(Twe t, User).all()
    # res = []
    res = []
    for tweet in tweets:
        res.append(tweet.to_dict())
    return res
    # return [tweet.to_dict() for tweet in tweets]


@tweet_routes.route("/<int:id>")
def get_one_tweet(id):
    try:
        tweet = Tweet.query.get(id)
        if tweet == None:
            raise TypeError("Tweet did not exist")

        return tweet.to_dict()
    except TypeError as e:
        msg = str(e)
        return {"message": msg}, 404


@tweet_routes.route("/", methods=["POST"])
@login_required
def post_tweet():
    form = New_Tweet_Form()
    form["csrf_token"].data = request.cookies["csrf_token"]
    print(form.data)
    if form.validate_on_submit():
        try:
            new_tweet = Tweet(tweet=form.data["tweet"], user_id=form.data["user_id"])
            if not new_tweet:
                raise TypeError("Tweet could not be posted at this timne")
            db.session.add(new_tweet)
            db.session.commit()

            return new_tweet.to_dict()
        except TypeError as e:
            msg = str(e)
            return {"message": msg}, 500
    else:
        return {"message": "There was an error"}, 500


@tweet_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_tweet(id):

    try:
        tweet = Tweet.query.get(id)
        if not tweet:
            raise TypeError("Tweet Could not be found")
        db.session.delete(tweet)
        db.session.commit()

        return tweet.to_dict()
    except TypeError as e:
        msg = str(e)
        return {"message": msg}, 404


@tweet_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_tweet(id):
    # grab body
    form = UpdateTweetForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        try:
            tweet = Tweet.query.get(id)
            if not tweet:
                raise Exception("Tweet can not be found")

            tweet.tweet = form.data["updated_tweet"]
            db.session.commit()
            return tweet.to_dict()
        except Exception as e:
            msg = str(e)
            return {"message": msg}
