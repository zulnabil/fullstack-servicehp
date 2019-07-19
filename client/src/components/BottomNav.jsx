import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/HomeRounded';
import AddIcon from '@material-ui/icons/LibraryAddRounded';
import AboutIcon from '@material-ui/icons/ContactSupportRounded';
import ChatIcon from '@material-ui/icons/ChatRounded';

import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'blocked',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    boxShadow: '0 0 5px 2px rgba(0, 0, 0, .1)'
  },
}));

export default function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('home');

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Home" value='home' icon={<HomeIcon />} component={Link} to='/' />
      <BottomNavigationAction label="Check-in" value='add' icon={<AddIcon />} component={Link} to='/add' />
      <BottomNavigationAction label="About" value='about' icon={<AboutIcon />} component={Link} to='/print-preview/KUPAhxUfSW4hfFEDUzmL' />
      <BottomNavigationAction label="Contact" icon={<ChatIcon />} />
    </BottomNavigation>
  );
}
