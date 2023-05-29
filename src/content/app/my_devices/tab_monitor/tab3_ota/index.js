import React from "react";
import Box from "@mui/material/Box";
import { Helmet } from 'react-helmet-async';
import { Card, CardHeader, Divider, Grid } from '@mui/material';
import NetworkConfig from './OTA';

function Settings() {
  return <Box>
    <Helmet>
      <title>OTA | Gateway Manager</title>
    </Helmet>
  <Grid item xs={12}>
    <NetworkConfig />
  </Grid>

</Box> 
  
}

export default Settings;