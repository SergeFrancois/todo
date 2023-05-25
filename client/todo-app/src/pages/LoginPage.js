import React, { useState, useEffect, useRef } from "react"
import { inject, observer } from "mobx-react"
import { DataGrid } from '@mui/x-data-grid'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useNavigate } from "react-router-dom"
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'
import { checkIsEmpty, checkTooShort, checkEmailInvalid } from '../utils/validationRules'


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

// @inject('accountStore')

function LoginPage(props) {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const navigate = useNavigate()
  
  function login() {
    props.accountStore.login(
      email, password,
      null,
      () => { navigate('/') },
      message => { 
        setErrorMessage(message)
      }
    )
  }
  
  const emailError = checkIsEmpty(email) || checkEmailInvalid(email)
  const passwordError = checkIsEmpty(password) || checkTooShort(password, 4)
  const isDataValid = !emailError && !passwordError
  
  return (
    <Grid container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          justify="center"
          sx={{ height: '100%' }}>
     <Card raised>
      <CardContent>
        <TextField autoFocus
                   margin="dense"
                   id="email"
                   label="Email"
                   type="email"
                   fullWidth
                   variant="standard"
                   value={email}
                   onChange={event => {setEmail(event.target.value)}}
                   error={!!emailError}
                   helperText={emailError} />
        <TextField margin="dense"
                   id="password"
                   label="Password"
                   type="password"
                   fullWidth
                   variant="standard"
                   value={password}
                   onChange={event => {setPassword(event.target.value)}}
                   error={!!passwordError}
                   helperText={passwordError} />
       </CardContent>
       <CardActions>
        <Button fullWidth variant="contained" sx={{m: 1}} disabled={!isDataValid} onClick={login}>Login</Button>
       </CardActions>
     </Card>
     <Snackbar open={errorMessage != null}
               autoHideDuration={5000}
               anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
               onClose={() => {setErrorMessage(null)}}>
       <Alert severity="error" sx={{ width: '100%' }}>
         {errorMessage}
       </Alert>
      </Snackbar>
    </Grid>
  )
}

export default inject('accountStore')(observer(LoginPage))
