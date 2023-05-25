from apifairy import body, response, other_responses
from flask import abort, Blueprint
from http import HTTPStatus
from ..auth import ensure_user_authorized
from ..db import db
from ..models import Todo
from ..schemes import todos


blueprint = Blueprint('todos', __name__)
new_todo_scheme = todos.NewTodo()
todo_scheme = todos.Todo()
todos_scheme = todos.Todo(many=True)
todo_patch_scheme = todos.TodoPatch()


@blueprint.route('/', methods=['GET'])
@response(todos_scheme)
def get_todos():
    todos = db.session.execute(db.select(Todo)).scalars()
    return todos

@blueprint.route('/', methods=['POST'])
@body(new_todo_scheme)
@response(todo_scheme, 201)
def create_todo(data):
    todo = Todo(**data)
    db.session.add(todo)
    db.session.commit()
    return todo

@blueprint.route('/<int:id>', methods=['PUT'])
@ensure_user_authorized('admin')
@body(todo_patch_scheme)
@response(todo_scheme)
def update_todo(data, id):
    todo = db.session.get(Todo, id)
    if not todo:
        abort(404, 'Todo not found')
    # if post.author != token_auth.current_user():
    #     abort(403)
    for key, value in ((k, v) for k, v in data.items() if v is not None):
        setattr(todo, key, value)
    db.session.commit()
    return todo