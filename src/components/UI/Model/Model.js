import React from 'react'

import classes from './Modal.css';
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';

const Modal = props => {

  // shouldComponentUpdate(nextProps, nextState){
  //   return nextProps.showOrderSummary !== this.props.showOrderSummary  || nextProps.children !== this.props.children;
  //    }

    //  componentDidUpdate(){
    //    console.log('[Model ---Component Did Update]')
    //  }
     return(
      <Aux>
   
      <Backdrop showOrderSummary= {props.showOrderSummary} 
            removeBackdrop= {props.removeBackdrop}/>
       <div className = {classes.Modal}
         style = {{
           transform: props.showOrderSummary?'translateY(0)' : 'translateY(-100vh)' , 
           opacity : props.showOrderSummary? '1' : '0'
        }}
      >
      {props.children}
    </div>
    </Aux>
     )
}
export default React.memo(Modal, (prevProps, nextProps) => 
                nextProps.showOrderSummary === prevProps.showOrderSummary &&
                nextProps.children === prevProps.children);