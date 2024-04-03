import React, { useState } from 'react';
import { TAB_LIST, TAB_PANEL } from "constants/Tabs";

import { Outlet, useLocation, useNavigate } from "react-router-dom";

import DarkMode from "components/DarkMode";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import "components/Main/index.scss"

function Main() {

  const navigate = useNavigate()
  const { pathname } = useLocation();
  const defaultValue = pathname.substring(1)

  const [value, setValue] = useState(defaultValue || '');

  return (
    <div className="main">
      <TabContext value={value}>
        <div className="tab-content">
          <TabList onChange={(_, newValue) => setValue(newValue)}>
            {TAB_LIST.map(({ label, value }) => (
              <Tab label={label} value={value} key={value} sx={{color: 'var(--body_color)'}} onClick={() => navigate(value)} />
            ))}
          </TabList>
        </div>
        <>
          {TAB_PANEL.map((panel) => (
            <TabPanel value={panel} key={panel}>
              <div className="mode">
                <DarkMode />
              </div>
              <Outlet />
            </TabPanel>
          ))}
        </>
      </TabContext>
    </div>
  );
}

export default Main;