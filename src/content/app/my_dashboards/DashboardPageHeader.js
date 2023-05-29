import { Typography, Button, Grid, Tooltip, IconButton } from '@mui/material';
import { useNavigate } from 'react-router';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import CellWifiIcon from '@mui/icons-material/CellWifi';

import SignalWifi4BarLockIcon from '@mui/icons-material/SignalWifi4BarLock';
import NetworkLockedIcon from '@mui/icons-material/NetworkLocked';
import FourGMobiledataIcon from '@mui/icons-material/FourGMobiledata';

import axios from 'axios';
import { useState, useEffect } from 'react';

import moment from 'moment';
import { server_url } from 'src/api/app.js';

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const PageHeader = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(0);
  const [severity, setSeverity] = useState(0);
  const vertical = 'bottom'
  const horizontal = 'right'
  const openSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
    // console.log(message,severity)
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [device, setDevice] = useState([]);

  const navigate = useNavigate();

  function handleBack() {
    navigate('/app/dashboards');
  }

  const mac_id = location.pathname.split('/')
  // console.log(mac_id[3])

  useEffect(() => {
    axios
      .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        `${server_url}/api/device/find/${mac_id[3]}`
      )
      .then((response) => {
        // console.log('DEBUG zone response', response);
        // console.log(response.data[0].updatedAt );
        if (((parseInt(Math.floor(Date.now() / 1000)) - parseInt(moment.utc(response.data[0].updatedAt).local() / 1000)) < (response.data[0].http_refresh_interval_mins * 60)) == 1) {
          openSnackbar("Gateway is online!", "success");
        } else {
          openSnackbar("Gateway is offline!", "warning");
        }
        setDevice(response.data[0]);
      })
      .catch((error) => {
        openSnackbar("Something went wrong..", "error");
        console.log(error);
      });
  }, []);


  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <Grid display="flex" item>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton color="primary" sx={{ p: 2, mr: 2 }} onClick={handleBack}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <div>
          <Typography variant="h2" component="h2" gutterBottom>
            {device.name}
          </Typography>
          <Typography variant="subtitle2">
            URL: 
            {" " + moment.utc(device.updatedAt).local().fromNow() + " "}
            {"- " + moment.utc(device.updatedAt).local().format('hh:mm:ss A DD-MMM-YYYY')}
          </Typography>
        </div>
        {/* <SignalWifi4BarLockIcon sx={{ m: 1, ml: 2 }} fontSize='large' color='disabled' /> */}
        {/* color: 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string */}
        {/* <NetworkLockedIcon sx={{ m: 1 }} fontSize='large' color='disabled'/> */}
        {/* <FourGMobiledataIcon sx={{ m: 1 }} fontSize='large' color='disabled' /> */}
      </Grid>
    </Grid>
  );
}

export default PageHeader;
