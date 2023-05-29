import { useState, useEffect } from 'react';
import axios from 'axios';

import { Card } from '@mui/material';
import NetworkConfigTable from './OTATable';
import { server_url } from 'src/api/app.js';

function NetworkConfig() {
  const [cryptoOrders, setcryptoOrders] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  
  useEffect(() => {
    axios 
      .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        `${server_url}/api/file/${userInfo.id}`
      )
      .then((response) => {
        // console.log('DEBUG files response', response.data);
        setcryptoOrders(response.data);      
      })
      .catch((error) => {
        console.log(error);
      });
    }, []);
    
  return (
    <Card>
      <NetworkConfigTable cryptoOrders={cryptoOrders} />
    </Card>
  );
}

export default NetworkConfig;
