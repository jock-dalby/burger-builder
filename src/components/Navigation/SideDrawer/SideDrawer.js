import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';

const sideDrawer = props => {

  let attachClasses = [classes.SideDrawer, classes.Close];
  if (props.showSideDrawer) {
    attachClasses = [classes.SideDrawer, classes.Open];
  }
  return (
    <Aux>
      <Backdrop show={props.showSideDrawer} onClicked={props.onClicked}/>
      <div className={attachClasses.join(' ')} onClick={props.onClicked}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated}/>
        </nav>
      </div>
    </Aux>
  )
};

export default sideDrawer;