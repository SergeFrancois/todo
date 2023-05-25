from marshmallow import validate
from .. import ma


class AccessTokenContainer(ma.Schema):
    access_token = ma.String()


class Credentials(ma.Schema):
    email = ma.String(required=True, validate=validate.Length(min=1, error='Email must be nonempty'))
    password = ma.String(required=True, validate=validate.Length(min=1, error='Password must be nonempty'))
