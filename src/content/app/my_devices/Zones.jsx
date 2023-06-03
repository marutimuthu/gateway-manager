import { useState, useEffect } from 'react';

import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Container, Grid, Card, LinearProgress } from '@mui/material';

import PageHeader from './PageHeader';
import BasicBreadcrumbs from 'src/components/BasicBreadcrumbs';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import Footer from 'src/components/Footer';

import ZonesTable from '../Components/linked_table/ZonesTable';

import Performance from './Performance';

import ProfileHeader from '../Components/ProfileHeader';
import { server_url } from 'src/api/app.js';
import moment from 'moment/moment';
// import Cards from './Cards';

const statusDropdownOptions = ['None', 'Active', 'Inactive'];

function ZoneOverview() {
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [zonesStatus, setZonesStatus] = useState('None');
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(0);
  const [inactive, setInactive] = useState(0);

  // In future we have to store userId in redux
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  function findActive(params) {
    // console.log(params);
    let current_time = parseInt(Math.floor(Date.now() / 1000));
    let active = 0
    let inactive = 0
  
    params.forEach((element) => {
      // console.log(element)
      // console.log(element.updatedAt)
      // console.log("current_time " + current_time)
      var gateway_time = parseInt(moment.utc(element.updatedAt).local() / 1000);
      // console.log("gateway_time " + gateway_time)
      let http_refresh_interval_mins = parseInt(element.http_refresh_interval_mins) * 60;
  
      // console.log("http_refresh_interval_mins" + http_refresh_interval_mins)
      if (current_time - gateway_time < http_refresh_interval_mins * 60 * 5) {
        // console.log(element.updatedAt);
        active++
        // console.log("Active " + active);
        setActive(active)
      } else {
        inactive++
        // console.log("Inactive " + inactive);
        setInactive(inactive)
      }
    });
  }

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
        findActive(response.data)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        // console.log(error);
      });
  }, []);

  useEffect(() => {
    if (zonesStatus == 'None') {
      setFilteredZones(zones);
    } else if (zonesStatus == 'Active') {
      const filteredZones = zones.filter(
        (zone) =>
          parseInt(Math.floor(Date.now() / 1000)) -
            parseInt(moment.utc(zone.updatedAt).local() / 1000) <
          parseInt(zone.http_refresh_interval_mins) * 60 * 60 * 5
      );
      setFilteredZones(filteredZones);
    } else if (zonesStatus == 'Inactive') {
      const filteredZones = zones.filter(
        (zone) =>
          parseInt(Math.floor(Date.now() / 1000)) -
            parseInt(moment.utc(zone.updatedAt).local() / 1000) >
          parseInt(zone.http_refresh_interval_mins) * 60 * 60 * 5
      );
      setFilteredZones(filteredZones);
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
          <Grid item xs={12} sm={6} md={4}>
            <Performance 
              active={active}
              inactive={inactive}
            />
          </Grid>
          <Grid item xs={12}>
            <Card>
              <ZonesTable
                heading={'Device List'}
                showDropdown
                dropdownLabel={'Filter'}
                dropdownValue={zonesStatus}
                handleDropdownItemChange={handleDropdownItemChange}
                headerDropdownOptions={statusDropdownOptions}
                zones={filteredZones}
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
