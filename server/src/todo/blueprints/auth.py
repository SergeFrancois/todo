import datetime
from apifairy import body, response, other_responses
from flask import abort, Blueprint
from http import HTTPStatus
from .. import config
from ..auth import authenticate_user
from ..db import db
from ..models import Todo
from ..schemes import auth
from ..utils import generate_jwt


blueprint = Blueprint('auth', __name__)
credentials_scheme = auth.Credentials()
access_token_container_scheme = auth.AccessTokenContainer()


@blueprint.route('/token', methods=['POST'])
@body(credentials_scheme)
@response(access_token_container_scheme, 201)
@other_responses({401: 'Invalid email or password'})
def create_access_token(credentials):
    user = authenticate_user(credentials['email'], credentials['password'])
    if not user:
        abort(401, 'Invalid email or password')
    token = generate_jwt(user, config.SECRET_KEY, config.TOKEN_SIGNATURE_ALGORITHM, datetime.timedelta(seconds=config.ACCESS_TOKEN_LIFETIME))
    return {'access_token': token}