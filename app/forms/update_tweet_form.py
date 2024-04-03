from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class UpdateTweetForm(FlaskForm):
    tweet_id = IntegerField("tweetId", validators=[DataRequired()])
    updated_tweet = StringField("updatedTweet", validators=[DataRequired()])
