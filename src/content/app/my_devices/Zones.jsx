import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import {Container, Grid, Card, LinearProgress} from '@mui/material';

import PageHeader from './PageHeader';
import BasicBreadcrumbs from 'src/components/BasicBreadcrumbs';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import ZonesTable from '../Components/linked_table/ZonesTable';

import ProfileHeader from '../Components/ProfileHeader';
import { server_url } from 'src/api/app.js';

// import Cards from './Cards';

const statusDropdownOptions = ['all', 'connected', 'alarm', 'inactive'];

function ZoneOverview() {
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [zonesStatus, setZonesStatus] = useState('all');
  const [loading, setLoading] = useState(false);

  // In future we have to store userId in redux
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    setLoading(true);
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
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
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
        <title>My Devices | Gateway Manager</title>
      </Helmet>
        {loading ? <LinearProgress /> : false}
      <PageTitleWrapper>
        <BasicBreadcrumbs />
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
    
        <Grid container direction="row" alignItems="stretch" spacing={3}>
          <Grid item xs={12}>
            <Card>
              <ZonesTable
                heading={'Device List'}
                showDropdown
                dropdownLabel={'status'}
                dropdownValue={zonesStatus}
                handleDropdownItemChange={handleDropdownItemChange}
                headerDropdownOptions={statusDropdownOptions}
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

export default ZoneOverview;
