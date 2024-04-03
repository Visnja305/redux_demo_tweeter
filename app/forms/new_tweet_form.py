from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class New_Tweet_Form(FlaskForm):
    tweet = StringField("tweet", validators=[DataRequired()])
    user_id = IntegerField("userId", validators=[DataRequired()])
