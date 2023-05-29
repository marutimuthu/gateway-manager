import React from "react";
import Slider from "./Components/Slider";
import "./App.css";

import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import PageHeader from './PageHeader';
import BasicBreadcrumbs from 'src/components/BasicBreadcrumbs';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import ZonesTable from './linked_table/DashboardTable';

import ProfileHeader from '../Components/ProfileHeader';
import { server_url } from 'src/api/app.js';
import { Dashboard } from '@mui/icons-material';

// import Cards from './Cards';

const statusDropdownOptions = ['all', 'connected', 'alarm', 'inactive'];

function Dashboards() {
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [zonesStatus, setZonesStatus] = useState('all');

  // In future we have to store userId in redux
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    axios
      .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        `${server_url}/api/device/${userInfo.id}`
      )
      .then((response) => {
        // console.log('DEBUG zone response', response);
        // console.log(userInfo.id);
        // console.log(response.data);
        setZones(response.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    if (zonesStatus !== 'all') {
      // console.log(zones);
      const filteredZones = zones.filter(
        (zone) => zone.wifi_status === zonesStatus
      );
      setFilteredZones(filteredZones);
    } else {
      // console.log(zones);
      setFilteredZones(zones);
    }
  }, [zonesStatus, zones]);

  const handleDropdownItemChange = (dropdownItem) => {
    setZonesStatus(dropdownItem);
  };

  return (
    <>
      <Helmet>
        <title>My Dashboards | Gateway Manager</title>
      </Helmet>
      <PageTitleWrapper>
        <BasicBreadcrumbs />
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid container direction="row" alignItems="stretch" spacing={3}>
          <Grid paddingTop={2}>
          <Slider />
          </Grid>

          <Grid item xs={12}>
            <Card>
              <ZonesTable
                heading={'Dashboard List'}
              // showDropdown
              // dropdownLabel={'status'}
              // dropdownValue={zonesStatus}
              // handleDropdownItemChange={handleDropdownItemChange}
              // headerDropdownOptions={statusDropdownOptions}
              // zones={filteredZones}
              />
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboards;
