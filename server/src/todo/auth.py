import functools
from flask import abort
from . import config
from .utils import check_jwt


def authenticate_user(email, password):
    if email == 'admin@todo.com' and password == config.ADMIN_PASSWORD:
        return { 'user_name': 'admin',
                 'user_email': 'admin@todo.com',
                 'user_roles': ['admin', 'user'] }
    else:
        return None

def ensure_user_authorized(role=None):
    def decorate(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            try:
                data = check_jwt(config.SECRET_KEY, config.TOKEN_SIGNATURE_ALGORITHM,)
            except Exception as ex:
                abort(401, ex.args[0])
            if role and role not in data['user_roles']:
                abort(403, 'User has no permissions')
            return fn(*args, **kwargs)
        return wrapper
    return decorate
