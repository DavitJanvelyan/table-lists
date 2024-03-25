import React, { useState } from 'react';
import { TAB_LIST, TAB_PANEL } from "constants/Tabs";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import "components/Main/index.scss"

function Main() {

  const defaultValue = 'products'

  const [value, setValue] = useState(defaultValue);

  return (
    <div className="main">
      <TabContext value={value}>
        <div className="tab-content">
          <TabList onChange={(_, newValue) => setValue(newValue)}>
            {TAB_LIST.map((tab) => (
              <Tab label={tab} value={tab} key={tab} />
            ))}
          </TabList>
        </div>
        <>
          {TAB_PANEL.map(({ value, component }) => (
            <TabPanel value={value} key={value}>
              {component}
            </TabPanel>
          ))}
        </>
      </TabContext>
    </div>
  );
}

export default Main;