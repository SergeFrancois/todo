import api from '../api'
import { makeAutoObservable, observable, action, computed } from 'mobx'


class TodosStore {
  isLoading = false
  todos = []

  constructor() {
    makeAutoObservable(this)
    // this.loadTodos()
  }

  addTodo(todo, onComplete = null) {
    api.post('todos/', todo).then(response => {
      this.todos.push(response.data)
    }).finally(() => {
      if (onComplete)
        onComplete()
    })
  }

  loadTodos(onComplete = null) {
    this.isLoading = true
    // this.todos.push({id: 1})
    api.get('todos/').then(response => {
      // this.todos = response.data
    
      response.data.forEach(todo => {
        let todo2 = this.todos.find(t => t.id === todo.id)
        if (todo2)
          Object.assign(todo2, todo)
        else
        {
          // console.log(todo)
          this.todos.push(todo)
        }
      })
      this.isLoading = false
    }).finally(() => {
      if (onComplete)
        onComplete()
    })
  }
  
  refreshTodos(onComplete = null) {
    api.get('todos/').then(response => {
      response.data.forEach(todo => {
        let todo2 = this.todos.find(t => t.id === todo.id)
        if (todo2)
          Object.assign(todo2, todo)
        else
          this.todos.push(todo)
      })
    }).finally(() => {
      if (onComplete)
        onComplete()
    })
  }

  updateTodo(todo, onComplete = null) {
    api.put(`todos/${todo.id}`, todo).then(response => {
      Object.assign(this.todos.find(t => t.id === todo.id), response.data)
    }).finally(() => {
      if (onComplete)
        onComplete()
    })
  }
}

export default new TodosStore()