import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';


const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if(props.open){
    attachedClasses = [classes.SideDrawer,classes.Open]; 
  }
  return(
    <Aux> 
    <Backdrop 
          showOrderSummary={props.open} 
          removeBackdrop = {props.closed}/> 

     <div className = {attachedClasses.join(' ')} onClick = {props.closed}>
         <div className={classes.Logo}>
            <Logo />
         </div>
   
         <nav>
            <NavigationItems  isAuthenticated = {props.isAuth} />
         </nav>
    </div>
    </Aux>
   );
}
export default SideDrawer;