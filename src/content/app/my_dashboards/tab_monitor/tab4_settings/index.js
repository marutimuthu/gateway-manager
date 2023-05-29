import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import DeviceSettingsCard from './DeviceSettingsCard';

import { Container, Grid } from '@mui/material';

function Settings() {
    return (
        <>
            <Helmet> 
                <title>Settings | Gateway Manager</title>
            </Helmet>
            <Container maxWidth="lg">
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="stretch"
                    spacing={3}
                    padding={3}
                >
                    <DeviceSettingsCard  />
                </Grid>
            </Container>
        </>
    );
}

export default Settings;
