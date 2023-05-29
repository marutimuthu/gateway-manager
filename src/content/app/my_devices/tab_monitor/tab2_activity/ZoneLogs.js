import { Card, Box, LinearProgress } from '@mui/material';
import ZoneLogsTable from './ZoneLogsTable';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { server_url } from 'src/api/app.js';

function ZoneLogs() {
  const [cryptoOrders, setcryptoOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const mac_id = location.pathname.split('/')
  console.log(mac_id[3])
  // var url = `${server_url}/api/logs/${mac_id[3]}?page=1&limit=100`
  var url = `${server_url}/api/logs/${mac_id[3]}?page=1&limit=100`
  useEffect(() => {
    setLoading(true);
    axios
      .get(url)
      .then((response) => {
        // console.log('DEBUG Logs response', response);
        // console.log(userInfo.id);
        // console.log(response.data);
        // setZones(response.data);
        // console.log(response.data.results[0].type)
        setcryptoOrders(response.data.results);
        setLoading(false);
        // cryptoOrders = response.data;
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // const cryptoOrders = [
  //   {
  //     id: '1',
  //     time: new Date().toLocaleString(),
  //     activity: 'WiFi',
  //     oldValue: 'Disconnected',
  //     newValue: 'Connected',
  //     status: 'connected'
  //   },
  //   {
  //     id: '2',
  //     time: new Date().toLocaleString(),
  //     activity: 'Ethernet',
  //     oldValue: 'Disconnected',
  //     newValue: 'Connected',
  //     status: 'inactive'
  //   },
  //   {
  //     id: '3',
  //     time: new Date().toLocaleString(),
  //     activity: '4G',
  //     oldValue: 'Disconnected',
  //     newValue: 'Connected',
  //     status: 'alarm'
  //   }

  // ];

  return (
    <Box>
      {loading ? <LinearProgress sx={{ m: 2 }} /> : false}
      <Card>
        <ZoneLogsTable cryptoOrders={cryptoOrders} />
      </Card>
    </Box>
  );
}

export default ZoneLogs;
