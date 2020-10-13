import React,{useState} from 'react';

import Aux from '../Auxillary/Auxillary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux'

const Layout = props => {
  // state = {
  //   showSideDrawer : false
  // }
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const closedSideDrawerHandler = () => {
    // this.setState({showSideDrawer : false})
    setShowSideDrawer(false);
  }
   
  const ToogleSideDrawerHandler = () => {
            //  this.setState( (prevState) => {
            //  return {showSideDrawer : !prevState.showSideDrawer};
            setShowSideDrawer(!showSideDrawer);
}

    return(
      <Aux>
         <Toolbar isAuth = {props.isAuthenticated} 
                  ToogleSideDrawer = {ToogleSideDrawerHandler}/>
         <SideDrawer
            open = {showSideDrawer} 
            closed ={closedSideDrawerHandler}
            isAuth = {props.isAuthenticated}/>
       <main className = {classes.Content}>
        {props.children}
       </main>
    </Aux>
    )
  }

const mapStateToProps = state => {
     return {
       isAuthenticated : state.auth.token !== null
     }
}
export default connect(mapStateToProps)(Layout);