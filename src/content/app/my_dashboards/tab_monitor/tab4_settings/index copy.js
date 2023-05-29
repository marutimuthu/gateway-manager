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
      <Grid container spacing={3}>
        {/* color: 'inherit' | 'action' | 'disabled' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning' | string */}
        <StatisticsCard
          icon={<RouterIcon sx={{ m: 1 }} fontSize='large' color='primary'/>}   
          label={'Device'}
          heading1_key={'Name'}
          heading1_value={device.name}
          heading3_key={'Hardware'}
          heading3_value={device.hardware}
          heading2_key={'FW Ver.'}
          heading2_value={device.firmware_version}
          heading4_key={'MAC ID'}
          heading4_value={device.mac_id}
          heading5_key={'RTC'}
          heading5_value={device.rtc_status}
          heading6_key={'Module'}
          heading6_value={device.module}
          heading7_key={'Scheduled Restart'}
          heading7_value={device.schedule_restart_enable}
          heading8_key={'Scheduled Restart Time (Daily)'}
          heading8_value={`${device.schedule_restart_hour}:${device.schedule_restart_minute}:${device.schedule_restart_second}`}
          heading9_key={'Last Updated'}
          heading9_value={moment.utc(device.updatedAt).local().format('hh:mm:ss A DD-MMM-YY')}
          heading10_key={'Added On'}
          heading10_value={moment.utc(device.createdAt).local().format('hh:mm:ss A DD-MMM-YY')}
        />

        <StatisticsCard
          icon={<FourGMobiledataIcon sx={{ m: 1 }} fontSize='large' color='primary'/>}   
          label={'4G'}
          heading1_key={'LTE Mode'}
          heading1_value={device.lte_mode}
          heading2_key={'Status'}
          heading2_value={device.lte_status}
          heading3_key={'Network Provider'}
          heading3_value={device.lte_operator}
          heading4_key={'RSSI'}
          heading4_value={device.lte_rssi}
          heading5_key={'4G IP'}
          heading5_value={device.lte_ip}
          heading6_key={'Broker URL'}
          heading6_value={device.mqtt_lte_url}
          heading7_key={'Broker Username'}
          heading7_value={device.mqtt_lte_user}
          heading8_key={'Broker Password'}
          heading8_value={device.mqtt_lte_pass}
          heading9_key={'-'}
          heading9_value={' '}
          heading10_key={'-'}
          heading10_value={' '}
        /> 
        
      </Grid>
      
    </Box>
  );
}

export default Statistics;
