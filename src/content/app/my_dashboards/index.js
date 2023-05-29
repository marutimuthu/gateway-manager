import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import DashboardPageHeader from './DashboardPageHeader';
import MonitorTabContent from './tab_monitor/MonitorTabContent';
import BasicBreadcrumbs from 'src/components/BasicBreadcrumbs';

function Analytics() {

  return (
    <>
      <Helmet>
        <title>Overview | Gateway Manager</title>
      </Helmet>

      <PageTitleWrapper>
        <BasicBreadcrumbs></BasicBreadcrumbs>
        <DashboardPageHeader />
      </PageTitleWrapper>

      
      <Box>
        <MonitorTabContent />
        {/* <RepresentData /> */}
        {/* <Grid container direction="row" justifyContent="center" spacing={3}>
          {tabs.map((tab) => {
            return (
              tab.value === currentTab && (
                <DataChart
                  key={tab.value}
                  responseData={responseData?.data}
                  currentTab={currentTab}
                />
              )
            );
          })}
        </Grid> */}
      </Box>
      <Footer />
    </>
  );
}

export default Analytics;
