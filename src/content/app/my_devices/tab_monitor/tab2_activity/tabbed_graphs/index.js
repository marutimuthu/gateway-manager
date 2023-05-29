import { useState, useEffect } from 'react';
import TabsManager from 'src/components/TabsManager';
import Box from '@mui/material/Box';
import axios from "axios";

import * as CONSTANT from './constant';
import SelectTimePeriod from './SelectTimePeriod';
import styles from "./styles/representData.module.scss";
import DataChart from './DataChart';
import {
  Card
} from '@mui/material';
 
function RepresentData() {
  const {
    TEMPRATURE_VALUE,
    HUMIDITY_VALUE,
    PH_VALUE,
    EC_VALUE,
    TEMPRATURE_NAME,
    HUMIDITY_NAME,
    PH_NAME,
    EC_NAME
  } = CONSTANT;

  const [currentTabValue, setCurrentTabValue] = useState(TEMPRATURE_VALUE);
  const [timePeriod, setTimePeriod] = useState('');
  const [responseData, setResponseData] = useState();

  // graph data api request
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `http://54.202.17.198:8080/api/data/${timePeriod}`
      );
      setResponseData(response.data);
    })();
  }, [timePeriod]);

  function handleTabChange(event, newValue) {
    setCurrentTabValue(newValue);
  }

  let TABS_NAME = [TEMPRATURE_NAME, HUMIDITY_NAME, PH_NAME, EC_NAME];
  let TABS_VALUE = [TEMPRATURE_VALUE, HUMIDITY_VALUE, PH_VALUE, EC_VALUE];

  return (
    <Box className={styles.mainContainer}>
      
      <Box className={styles.header}>
        <TabsManager
          tabsValue={TABS_VALUE}
          tabsName={TABS_NAME}
          currentTabValue={currentTabValue}
          handleTabChange={handleTabChange}
        />
         <SelectTimePeriod
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
        />
      </Box>
      <Box className={styles.graphContainer}>
        <DataChart responseData={responseData} currentTab={currentTabValue} timePeriod={timePeriod} />
      </Box>
    
    </Box>
  );
}
export default RepresentData;
