import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import { Link } from "react-router-dom";

import { HomeIcon, CheckinIcon, AboutIcon, ContactIcon } from './NavIcon'

import PrimarySearchAppBar from './AppBar'

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: 'auto',
  },
});

function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Home'>
              <ListItemIcon>{HomeIcon()}</ListItemIcon>
              <ListItemText primary='Home'/>
            </ListItem>
          </Link>
          <Link to='/add/' style={{ textDecoration: 'none', color: 'black' }}>
            <ListItem button key='Check-in'>
                <ListItemIcon>{CheckinIcon()}</ListItemIcon>
                <ListItemText primary='Check-in'/>
            </ListItem>
          </Link>
      </List>
      <Divider />
      <List>
         <ListItem button key='About'>
            <ListItemIcon>{AboutIcon()}</ListItemIcon>
            <ListItemText primary='About'/>
          </ListItem>
          <ListItem button key='Contact'>
            <ListItemIcon>{ContactIcon()}</ListItemIcon>
            <ListItemText primary='Contact'/>
          </ListItem>
      </List>
    </div>
  );

  return (
    <div>
      <PrimarySearchAppBar handleClick={toggleDrawer('left', true)}/>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
      {/* <MenuIcon onClick={toggleDrawer('left', true)} /> */}
    </div>
  );
}

export default TemporaryDrawer;