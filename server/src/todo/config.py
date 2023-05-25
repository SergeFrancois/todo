import os
from dotenv import load_dotenv


load_dotenv()

__base_dir = os.path.abspath(os.path.dirname(__file__))


SECRET_KEY = os.getenv('SECRET_KEY')
ACCESS_TOKEN_LIFETIME = os.getenv('ACCESS_TOKEN_LIFETIME') if os.getenv('ACCESS_TOKEN_LIFETIME') else 24*60*60   # time in seconds
TOKEN_SIGNATURE_ALGORITHM = 'HS256'

SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URI') if os.getenv('DATABASE_URI') else 'sqlite:///' + os.path.join(__base_dir, 'main.db')
SQLALCHEMY_TRACK_MODIFICATIONS = False

ADMIN_PASSWORD = '1234'