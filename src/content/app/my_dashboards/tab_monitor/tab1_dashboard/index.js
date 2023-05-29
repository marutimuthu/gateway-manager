import {
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  TextField,
  OutlinedInput,
  InputAdornment,
  useTheme,
  Button,
  LinearProgress
} from '@mui/material';

import moment from 'moment';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import StatisticsCard from './card';
import RepresentData from '../tab2_activity/tabbed_graphs';

import SignalWifi4BarLockIcon from '@mui/icons-material/SignalWifi4BarLock';
import FourGMobiledataIcon from '@mui/icons-material/FourGMobiledata';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import RouterIcon from '@mui/icons-material/Router';
import { useLocation } from 'react-router';

import axios from 'axios';

import { server_url } from 'src/api/app.js';

function Statistics() {
  const [device, setDevice] = useState([]);

  // In future we have to store userId in redux
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

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
        // console.log(response.data[0]);
        setDevice(response.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  return (
    <Box>
      <div className="App">
        {/* <h3>Iframes in React</h3> */}
        {/* <iframe style="border:0" src="https://www.bing.com" width="750" height="300"></iframe> */}
        <iframe allowfullscreen src="http://dashboard.iotinfra.link/?orgId=1" frameborder="0" height="750" width="100%"></iframe>
      </div>
    </Box>
  );
}

export default Statistics;
