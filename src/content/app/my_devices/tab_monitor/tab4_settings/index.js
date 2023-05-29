import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import DeviceSettingsCard from './DeviceSettingsCard';


function Settings() {
  return (
    <>
      <Helmet>
        <title>Settings | Gateway Manager</title>
      </Helmet>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
        padding={3}
      >
        <DeviceSettingsCard />
      </Grid>
    </>
  );
}

export default Settings;
