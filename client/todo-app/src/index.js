// import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'
import { HashRouter } from "react-router-dom"
import { Provider } from "mobx-react"
import App from './App'
import reportWebVitals from './reportWebVitals'
import * as serviceWorker from './serviceWorker'
import accountStore from "./stores/accountStore"
import todosStore from "./stores/todosStore"


const container = document.getElementById('root')
const root = ReactDOM.createRoot(container)
const stores = {
  accountStore,
  todosStore
}

// <HashRouter>
// </HashRouter>
root.render(
  <Provider {...stores}>
    <App />
  </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
