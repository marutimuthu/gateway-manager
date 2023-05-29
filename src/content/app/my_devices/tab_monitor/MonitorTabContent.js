import React, { useState } from 'react';
import Box from '@mui/material/Box';

import TabsManager from 'src/components/TabsManager';

import * as CONSTANTS from './constants';
import Statistics from './tab1_overview';
import Activity from './tab2_activity';
import Settings from './tab4_settings';
import Calendar from './tab3_ota';
import styles from './styles/monitor.module.scss';

// Statistics Overview Monitor
// statistics overview monitor
// STATISTICS OVERVIEW MONITOR

function MonitorTabContent() {
  const {
    STATISTICS_VALUE,
    ACTIVITY_VALUE,
    SETTINGS_VALUE,
    CALENDAR_VALUE,
    STATISTICS_NAME,
    ACTIVITY_NAME, 
    SETTINGS_NAME,
    CALENDAR_NAME
  } = CONSTANTS;

  const [currentTabValue, setCurrentTabValue] = useState(STATISTICS_VALUE);

  function handleTabChange(event, newValue) {
    setCurrentTabValue(newValue);
  }

  let TABS_VALUE = [STATISTICS_VALUE, ACTIVITY_VALUE,CALENDAR_VALUE,SETTINGS_VALUE];
  let TABS_NAME = [STATISTICS_NAME, ACTIVITY_NAME,CALENDAR_NAME,SETTINGS_NAME];

  return (
    <Box className={styles.mainContainer}>
      <Box className={styles.tabsContainer}>
        <TabsManager
          currentTabValue={currentTabValue}
          handleTabChange={handleTabChange}
          tabsValue={TABS_VALUE}
          tabsName={TABS_NAME}
        />
      </Box>
      <Box className={styles.tabContent}>
        {currentTabValue === STATISTICS_VALUE && <Statistics />}
        {currentTabValue === ACTIVITY_VALUE && <Activity />}
        {currentTabValue === CALENDAR_VALUE && <Calendar />}
        {currentTabValue === SETTINGS_VALUE && <Settings />}
      </Box>
    </Box>
  );
}

export default MonitorTabContent;
