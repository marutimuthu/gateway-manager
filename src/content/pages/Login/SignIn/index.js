import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ParticlesBg from 'particles-bg';
import { useNavigate } from 'react-router';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';
import { server_url } from 'src/api/app.js';
// const server_url = "http://54.202.17.198:8080"
const signin_url = `${server_url}/api/auth/signin`

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://marutimuthu.github.io/portfolio-v4">
        MMM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(0);
  // info, success, error, warning
  const [severity, setSeverity] = useState(0);
  // top, bottom
  const vertical = 'top'
  // left, right
  const horizontal = 'right'

  const openSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('userInfo'));
    if (items !== null) {
      navigate('/app/devices')
    }
  }, []);

  const handleSubmit = (event) => {
    openSnackbar("Please wait..", "info");
    event.preventDefault();
    try {
      // console.log({ email, password, remember })
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const send = async () => {
        axios
          .post(signin_url, { email, password }, config)
          .then((response) => {
            // console.log(response)
            // console.log(response.data)
            // if (remember == true) {
            //   localStorage.setItem('userInfo', JSON.stringify(response.data));
            // }
            localStorage.setItem('userInfo', JSON.stringify(response.data));
            openSnackbar("Welcome!", "success");
            // navigate('/hydroponics/analytics')
            setTimeout(() => {
              navigate('/app/devices')
            }, 1000);
          })
          .catch((error) => {
            console.log(error); //Logs a string: Error: Request failed with status code 404
            console.log(error.response.status);
            if (error.response.status == 401) {
              openSnackbar("Incorrect Password", "warning");
              // alert("Incorrect Password");
            } else if (error.response.status == 404) {
              // openSnackbar("User is not registered.", "warning");
              openSnackbar("Something went wrong..", "error");
            }
          });
      }
      send()

    } catch (error) {
      openSnackbar("Something went wrong..", "error");
      console.log(error);
    }
  };

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(login(email, password))

  // }

  return (

    <ThemeProvider theme={theme}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <ParticlesBg color="#8C7CF0" type="cobweb" bg={true} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar
            sx={{ m: 3, width: 200, height: 200 }}
            // placeholderStyle={{ backgroundColor: 'transparent' }}
            src="/static/images/logo/logo.jpg"
          >
          </Avatar>
          {/* <LockOutlinedIcon /> */}
          <Typography component="h1" variant="h5">
            Welcome!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              style={{ backgroundColor: 'white' }}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              style={{ backgroundColor: 'white' }}
              type={showPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {/* <FormControlLabel
              control={<Checkbox id="remember" value="remember" color="primary" />}
              onChange={(e) => setRemember(e.target.checked)}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ height: 50, fontSize: 18 }}
            >
              🚀 Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
