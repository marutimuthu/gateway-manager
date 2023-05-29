import { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import Footer from 'src/components/Footer';
import { Container, Grid, Tab, Tabs } from '@mui/material';

import BasicBreadcrumbs from 'src/components/BasicBreadcrumbs';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import ProfileHeader from './ProfileHeader';

import TeamOverview from './TeamOverview';
import TasksAnalytics from './TasksAnalytics';
import Performance from './Performance';
import Projects from './Projects';
import Checklist from './Checklist';
import Profile from './Profile';
import TaskSearch from './TaskSearch';


function DashboardTasks() {


  const [currentTab, setCurrentTab] = useState('analytics');

  const tabs = [
    { value: 'analytics', label: 'Overview' },
    { value: 'taskSearch', label: 'Profile' }
  ];

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Helmet>
        <title>Overview | Gateway Manager</title>
      </Helmet>
      <PageTitleWrapper>
        <BasicBreadcrumbs />
        <ProfileHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Tabs
              onChange={handleTabsChange}
              value={currentTab}
              variant="scrollable"
              scrollButtons="auto"
              textColor="primary"
              indicatorColor="primary"
            >
              {tabs.map((tab) => (
                <Tab key={tab.value} label={tab.label} value={tab.value} />
              ))}
            </Tabs>
          </Grid>
          {currentTab === 'analytics' && (
            <>
              {/* <Grid item xs={12}>
                <TeamOverview />
              </Grid> */}
              <Grid item xs={12} sm={6} md={4}>
                <Performance />
              </Grid>
              <Grid item xs={12} sm={6} md={8}>
                <TasksAnalytics />
              </Grid>
              {/* <Grid item xs={12}>
                <Projects />
              </Grid> */}
              {/* <Grid item xs={12} md={6}>
                <Checklist />
              </Grid> */}
            </>
          )}
          {currentTab === 'taskSearch' && (
            <>
              {/* <Grid item xs={12}>
                <TaskSearch />
              </Grid> */}
              <Grid item xs={12} md={6}>
                <Profile />
              </Grid>
            </>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default DashboardTasks;
