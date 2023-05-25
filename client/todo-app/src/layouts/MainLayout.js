import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { Outlet } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { inject, observer } from "mobx-react"


// export default class MainLayout extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       isLoginButtonClicked: false
//     }
//   }
// 
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.isLoginButtonClicked)
//       this.setState({isLoginButtonClicked: false})
//   }
// 
//   render () {
function MainLayout(props) {
  const navigate = useNavigate()
  // <Grid container direction="column" style={{ height: '100%' }}>
  return (
    <Stack direction="column" style={{ height: '100%' }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Todo app</Typography>
          {!props.accountStore.isUserLoggedIn ? (<Button variant="outline" onClick={() => {navigate('/login')}}>Login</Button>) :
           (<Button variant="outline" onClick={() => {props.accountStore.logout()}}>Logout</Button>) }
        </Toolbar>
      </AppBar>
      <Box style={{
          overflowY: "auto",
          maxHeight: "100%",
          display: "flex",
          flexGrow: 1,
          flexDirection: "column"
        }}>
        <Outlet />
      </Box>
    </Stack>
  )    
}

export default inject('accountStore')(observer(MainLayout))
