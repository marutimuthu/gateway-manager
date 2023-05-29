import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import syncDisplayWithRawData from 'src/helpers/syncDisplayWithRawData';

function TabsManager({
  currentTabValue,
  handleTabChange,
  tabsValue,
  tabsName,
  ...props
}) {
  const [displayTabs, setDisplayTabs] = useState({});

  useEffect(() => {
    const syncValuesWithNames = syncDisplayWithRawData(tabsValue, tabsName);
    setDisplayTabs(syncValuesWithNames);
  }, [tabsValue, tabsName]);

  return (
    <Tabs
      onChange={handleTabChange}
      value={currentTabValue}
      variant="scrollable"
      scrollButtons="auto" 
      textColor="primary"
      indicatorColor="primary"
      {...props}
    >
      {Object.values(displayTabs)?.map((tab) => (
        <Tab key={tab.value} label={tab.name} value={tab.value} />
      ))}
    </Tabs>
  );
}
export default TabsManager;
