import datetime
import jwt
from flask import abort, request


def check_jwt(secret_key, signature_algorithm='HS256'):
    header = request.headers.get('Authorization')
    if not header:
        raise Exception('Access token is missing')
    token = header.split('Bearer ')[1]
    try:
        return jwt.decode(token, secret_key, algorithms=[signature_algorithm])
    except jwt.ExpiredSignatureError:
        raise Exception('Access token expired')
    except Exception:
        raise Exception('Invalid access token')

def generate_jwt(payload, secret_key, signature_algorithm='HS256', lifetime=None):
    if lifetime is None:
        lifetime = datetime.timedelta(minutes=15)
    payload = payload.copy()
    payload['exp'] = datetime.datetime.utcnow() + lifetime
    return jwt.encode(payload, secret_key, algorithm=signature_algorithm)
