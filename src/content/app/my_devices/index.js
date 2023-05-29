import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Footer from 'src/components/Footer';
import { Box, Container, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';

import PageTitleWrapper from 'src/components/PageTitleWrapper';

import PageHeader from '../Components/PageHeader';
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
        <PageHeader />
      </PageTitleWrapper>
      
      <MonitorTabContent />
      <Footer />
    </>
  );
}

export default Analytics;
