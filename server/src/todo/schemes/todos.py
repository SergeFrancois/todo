from .. import ma


class NewTodo(ma.Schema):
    creator_name = ma.String()
    creator_email = ma.String()
    description = ma.String()


class Todo(ma.Schema):
    id = ma.Integer()
    creator_name = ma.String()
    creator_email = ma.String()
    description = ma.String()
    is_done = ma.Boolean()


class TodoPatch(ma.Schema):
    id = ma.Integer(allow_none=True)
    creator_name = ma.String(allow_none=True)
    creator_email = ma.String(allow_none=True)
    description = ma.String(allow_none=True)
    is_done = ma.Boolean(allow_none=True)
