import React, { useState } from 'react';
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
import ParticlesBg from 'particles-bg'
import { useNavigate } from 'react-router';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';

import { server_url } from 'src/api/app.js';

import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        The Hydro Guys
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phonenumber, setPhonenumber] = useState('');
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
        open = false;
    };

  const handleSubmit = (event) => {
    openSnackbar("Please wait..", "info");
    event.preventDefault();
    try {
      // console.log({ email, password })
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const send = async () => {
        axios
          .post(`${server_url}/api/auth/signup`, { email, password, phonenumber, name }, config )
          .then((response) => {
            console.log(response)
            openSnackbar("User registered sucessfully.", "success");
            // alert("User registered sucessfully.")
            setTimeout(() => {
              navigate('/')
            }, 1000);
          })
          .catch((error) => {
            console.log(error); //Logs a string: Error: Request failed with status code 404
            // console.log(error.response.status);
            if (error.response.status == 400 ) {
              openSnackbar("Please fill all details.", "warning");
              // alert("Please fill all details.");
            } else if (error.response.status == 404 ) {
              // alert("Please check input.");
              openSnackbar("Please check input.", "warning");
            }
          });
      }
      send()
    } catch (error) {
      openSnackbar("Something went wrong..", "error");
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
      <ParticlesBg color='#9EA4C1' type="cobweb" bg={true} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 3, width: 150, height: 150 }}
            src=
            "https://i.imgur.com/b8DOtWa.png"
          >
          </Avatar>
          <Typography component="h1" variant="h5">
            🖋 Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  style={{ backgroundColor: 'white' }}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phonenumber"
                  label="Contact Number"
                  name="phonenumber"
                  autoComplete="family-name"
                  style={{ backgroundColor: 'white' }}
                  onChange={(e) => setPhonenumber(e.target.value)}
                  value={phonenumber}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  style={{ backgroundColor: 'white' }}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  style={{ backgroundColor: 'white' }}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I accept the terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{ height: 50, fontSize: 18 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}