import React from 'react';
import classes from './DrawerToggle.css';

const menu = (props) => (
  <div className={classes.DrawerToggle} onClick={props.onClicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default menu;