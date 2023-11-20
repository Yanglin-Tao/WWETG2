import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';

/* TODO: This component is a list of items for dining hall users to navigate their dashboards.
*/

const dashboard = () => {
  window.open("/displayDiningHallDashboard", "_self");
};

const menu = () => {
  window.open("/displayDailyMenu", "_self");
};

const create = () => {
  window.open("/createDailyMenu", "_self");
};

const reports = () => {
  window.open("/displayDailyMenu", "_self");
};

const account = () => {
  window.open("/displayDiningHallAccount", "_self");
};

const report = () => {
  window.open("/displayDiningHallReports", "_self");
};

export const mainListItems = (
  <React.Fragment>
    <ListItemButton onClick={dashboard}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={menu}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="History Menus" />
    </ListItemButton>
    <ListItemButton onClick={create}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Create Menu" />
    </ListItemButton>
    <ListItemButton onClick={report}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="My Reports" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>
    <ListItemButton onClick={account}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
  </React.Fragment>
);
