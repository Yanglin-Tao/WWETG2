import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

/* TODO: This component is a list of items for common users to navigate their dashboards.
*/
const dashboard = () => {
  window.open("/displayCommonUserDashboard", "_self");
};

const menu = () => {
  window.open("/browseDailyMenu", "_self");
};
const allergy = () => {
  window.open("/displayCommonUserAllergy", "_self");
};
const preference = () => {
  window.open("/displayCommonUserFoodPreference", "_self");
};
const goal = () => {
  window.open("/displayCommonUserGoals", "_self");
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
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Browse Menu" />
    </ListItemButton>
    <ListItemButton onClick={goal}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="My Goals" />
    </ListItemButton>
    <ListItemButton onClick={dashboard}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="My Reports" />
    </ListItemButton>
    <ListItemButton onClick={allergy}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Allergies" />
    </ListItemButton>
    <ListItemButton onClick={preference}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Preferences" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Settings
    </ListSubheader>
    <ListItemButton onClick={dashboard}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="My Account" />
    </ListItemButton>
    <ListItemButton onClick={dashboard}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Privacy Settings" />
    </ListItemButton>
  </React.Fragment>
);
