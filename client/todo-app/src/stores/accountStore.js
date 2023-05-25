import api from '../api'
import jwt from 'jwt-decode'
import { makeAutoObservable, observable, action, computed } from 'mobx'


class AccountStore {
  accessToken = null
  isUserLoggedIn = false
  user = null

  constructor() {
    makeAutoObservable(this)
  }

  login(email, password, onComplete = null, onSuccess = null, onError = null) {
    api.post('auth/token', {email, password}).then(response => {
      const token = response.data.access_token
      const data = jwt(token)
      this.user = {
        name: data.user_name,
        email: data.user_email,
        roles: data.user_roles
      }
      this.isUserLoggedIn = true
      this.accessToken = token
      localStorage.setItem('token', token)
      if (onSuccess)
        onSuccess()
    }).catch(error => {
      if (onError)
        onError(error.response.data.error ? error.response.data.error.message : null)
    }).finally(() => {
      if (onComplete)
        onComplete()
    })
  }
  
  logout() {
    this.user = null
    this.isUserLoggedIn = false
    this.accessToken = null
    localStorage.removeItem('token')
  }
}

export default new AccountStore()