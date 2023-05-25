// import ArticleList from "components/ArticleList";
import React from "react"
import { inject, observer } from "mobx-react"
import { reaction } from "mobx"
// import { withRouter, NavLink } from "react-router-dom"
// import { parse as qsParse } from "query-string"
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { checkIsEmpty, checkTooShort, checkEmailInvalid } from '../utils/validationRules'


@inject('accountStore', 'todosStore')
// @withRouter
@observer
class HomePage extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      isTodoAddingOrUpdating: false,
      newTodo: {},
      newTodoValidators: {
        creator_name: {isValid: null}
      },
      rows: []
    }
    this.columns = [
      // { field: 'id', headerName: 'ID', width: 70 },
      { field: 'creator_name', headerName: 'Creator name', flex: 1 },
      { field: 'creator_email', headerName: 'Creator email', flex: 1 },
      { field: 'description', headerName: 'Description', flex: 3, sortable: false },
      { field: 'is_done', headerName: 'Done', headerAlign: 'center', align: 'center',
        renderCell: params => (
          <Checkbox checked={params.value}
                    onChange={event => {this.updateIsDoneTodoField(params.row, event.target.checked)}}
                    disabled={!this.props.accountStore.isUserLoggedIn || !this.props.accountStore.user.roles.includes('admin')} />
        )
      }
    ]
    this.newTodoCreatorNameRef = React.createRef()
  }
  
  componentDidMount() {
    this.props.todosStore.loadTodos(() => {
      this.setState({rows: this.props.todosStore.todos.slice()})
    })
    reaction(() => this.props.accountStore.isUserLoggedIn, () => {
      this.setState({rows: this.props.todosStore.todos.slice()})
    })
    // reaction(() => this.props.todosStore.todos, () => {
    //   this.setState({rows: this.props.todosStore.todos.slice()})
    // })
    this.todosRefreshTimer = setInterval(() => {
      if (!this.state.isTodoAddingOrUpdating) {        
        this.props.todosStore.refreshTodos(() => {
          this.setState({rows: this.props.todosStore.todos.slice()})
        })
      }
    }, 10000)
  }

  componentDidUpdate(previousProps, previousState) {
    // this.props.todosStore.loadTodos()
    // if (previousState.newTodo.creator_name != this.state.newTodo.creator_name)
    //   this.setState(ps => ({...ps, newTodoValidators: {
    //     ...ps.newTodoValidators,
    //     creator_name: {
    //       isValid: !!checkIsEmpty(this.state.newTodo.creator_name) || !!checkTooShort(this.state.newTodo.creator_name, 3),
    //       errorMessage: checkIsEmpty(this.state.newTodo.creator_name) || checkTooShort(this.state.newTodo.creator_name, 3)
    //     }
    //   }}))
  }
  
  componentWillUnmount() {
    clearInterval(this.todosRefreshTimer)
  }
  
  startTodoAdding = () => {
    this.setState({
      isTodoAddingOrUpdating: true,
      newTodo: {}
    })
  }
  
  addTodo = (event, reason) => {
    if (!reason) {
      this.props.todosStore.addTodo(this.state.newTodo, () => {
        this.setState({
          isTodoAddingOrUpdating: false,
          rows: this.props.todosStore.todos.slice()
        })
      })
    }
  }
  
  cancelTodoAdding = (event, reason) => {
    if (!reason) {
      this.setState({
        isTodoAddingOrUpdating: false,
        newTodo: {}
      })
    }
  }
  
  updateIsDoneTodoField = (todo, isDone) => {
    this.props.todosStore.updateTodo({id: todo.id, is_done: isDone}, () => {
      this.setState({rows: this.props.todosStore.todos.slice()})
    })
  }
  
  render() {
    // const { currentUser } = this.props.userStore
    // const { todos, isLoading } = this.props.todosStore
    const newTodo = this.state.newTodo
    const creatorNameError = checkIsEmpty(newTodo.creator_name) || checkTooShort(newTodo.creator_name, 3)
    const creatorEmailError = checkIsEmpty(newTodo.creator_email) || checkEmailInvalid(newTodo.creator_email)
    const descriptionError = checkIsEmpty(newTodo.description) || checkTooShort(newTodo.description, 5)
    const isNewTodoValid = !creatorNameError && !creatorEmailError && !descriptionError
    return (
      <Grid container direction="column" p={2}>
        <Grid item>
          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
            <Button size="small" variant="contained" onClick={this.startTodoAdding}>Add todo</Button>
          </Stack>
        </Grid>
        <Grid item>
          <DataGrid rows={this.state.rows}
                    columns={this.columns}
                    initialState={
                      {
                        pagination: {
                          paginationModel: { page: 0, pageSize: 3 }
                        }
                      }
                    }
                    pageSizeOptions={[3, 5, 10]}
                    disableRowSelectionOnClick
                    sx={{ display: "grid", overflow: 'hidden', minWidth: 0, width: '100%' }} />
        </Grid>
        <Dialog open={this.state.isTodoAddingOrUpdating}>
          <DialogTitle>New todo</DialogTitle>
          <DialogContent>
            <TextField autoFocus
                       margin="dense"
                       id="creator_name"
                       label="Creator name"
                       fullWidth
                       variant="standard"
                       value={newTodo.creator_name}
                       onChange={event => {this.setState(previousState => ({...previousState, newTodo: {...previousState.newTodo, creator_name: event.target.value}}))}}
                       required
                       error={!!creatorNameError}
                       helperText={creatorNameError} />
            <TextField margin="dense"
                       id="creator_email"
                       label="Creator email"
                       type="email"
                       fullWidth
                       variant="standard"
                       value={newTodo.creator_email}
                       required
                       onChange={event => {this.setState(previousState => ({...previousState, newTodo: {...previousState.newTodo, creator_email: event.target.value}}))}}
                       error={!!creatorEmailError}
                       helperText={creatorEmailError} />
            <TextField margin="dense"
                       id="description"
                       label="Description"
                       fullWidth
                       variant="standard"
                       required
                       value={newTodo.description}
                       onChange={event => {this.setState(previousState => ({...previousState, newTodo: {...previousState.newTodo, description: event.target.value}}))}}
                       error={!!descriptionError}
                       helperText={descriptionError} />
          </DialogContent>
          <DialogActions>
            <Stack direction="row" spacing={2} mx={2} mb={2}>
              <Button onClick={this.cancelTodoAdding}>Cancel</Button>
              <Button variant="contained" onClick={this.addTodo} disabled={!isNewTodoValid}>Add</Button>
            </Stack>
          </DialogActions>
        </Dialog>
      </Grid>
    )
  }
}

export default HomePage