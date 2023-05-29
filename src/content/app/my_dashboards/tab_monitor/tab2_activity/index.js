import React from "react";
import Box from "@mui/material/Box";
import { Helmet } from 'react-helmet-async';
import { Container, Grid, Card } from '@mui/material';
import Footer from 'src/components/Footer';

import ZoneLogs from './ZoneLogs';

function Activity() {
  return <Box>
    <Helmet>
      <title>Activity | Gateway Manager</title>
    </Helmet>
    <Container maxWidth="lg">
      <Grid

        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
      // spacing={3}
      >
        <Grid item xs={12}>
          <ZoneLogs />
        </Grid>
      </Grid>
    </Container>
  </Box>
}

export default Activity;