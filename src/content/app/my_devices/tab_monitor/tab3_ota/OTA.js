import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card, LinearProgress, Box } from '@mui/material';
import NetworkConfigTable from './OTATable';
import { server_url } from 'src/api/app.js';

function NetworkConfig() {
  const [cryptoOrders, setcryptoOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  useEffect(() => {
    setLoading(true);
    axios 
      .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        `${server_url}/api/file/${userInfo.id}`
      )
      .then((response) => {
        // console.log('DEBUG files response', response.data);
        setcryptoOrders(response.data); 
        setLoading(false);     
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
    }, []);
    
  return (
    <Box>
      {loading ? <LinearProgress sx={{ m: 2 }} /> : false}
      <Card>
        <NetworkConfigTable cryptoOrders={cryptoOrders} />
      </Card>
    </Box>
  );
}

export default NetworkConfig;
