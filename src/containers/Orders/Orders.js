import React, { useEffect } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderAction from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

import {connect} from 'react-redux';

const Orders = props => {
     useEffect( () => {
      props.onFetchOrders(props.token, props.userId);
     },[]);

    // axios.get('/orders.json')
    // .then(res => {
    //   let fetchedOrders = [];
    //    for(let key in res.data){
    //    fetchedOrders.push({
    //      ...res.data[key],
    //      id : key
    //    });
    //   }
    //    this.setState({spinner : false , orders : fetchedOrders})
    //    })
    //   .catch(err => {
    //   this.setState({spinner : false}) 
    // });

    let orders = <Spinner />
    if(!props.spinner){
      orders =  props.orders.map(order => (
        <Order 
        key = {order.id}
        ingredients = {order.ingredients}
        price = {order.price}
        />
      ))
    }
    return (
      <div>
       {orders}
      </div>
    )
}

const mapStateToProps = state => {
  return {
    orders : state.order.orders,
    spinner : state.order.spinner,
    token : state.auth.token,
    userId : state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
   onFetchOrders : (token, userId) => dispatch(orderAction.fetchOrders(token, userId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders , axios));