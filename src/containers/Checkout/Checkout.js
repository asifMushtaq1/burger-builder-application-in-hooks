import React from 'react'

import CheckoutSummary from '../../components/Order/CheckoutSummary.js';
import {Route, Redirect} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

const Checkout = props =>{
  // state = {
  //   ingredients : null,
  //   price : 0 
  // }

  // componentWillMount () {
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingredients = {};
  //   let price = 0;
  //   for (let param of query.entries()){
  //     if(param[0] === 'price'){
  //       price = param[1];
  //     }
  //     else{
  //        // [salad , 1]
  //       ingredients[param[0]] = +param[1];
  //     }
     
    
  //   }
  //   this.setState({ingredients : ingredients , totalPrice : price});
    
  // }
  const cancelCheckoutHandler = () => {
   props.history.goBack();
  }
  const continueCheckoutHandler = () => {
   props.history.replace('/Checkout/contact-data');
  }
    let summary = <Redirect to = '/'/>
    if(props.ingredientsStore){
      const purchasedRedirect = props.purchased ? <Redirect to ='/'/> : null
      summary = (
        <div>
          {purchasedRedirect}
        <CheckoutSummary 
           ingredients={props.ingredientsStore}
           cancelCheckout = {cancelCheckoutHandler}
           continueCheckout = {continueCheckoutHandler}/>
        <Route 
               path = {props.match.path + '/contact-data'}
               component = {ContactData} 
              //  render ={(props)=>( <ContactData 
              //                           ingredients = {this.state.ingredients}  price = {this.state.totalPrice} 
              //                           {...props}
          />
        )} />
      </div>
      );
    }
    return summary;

}
const mapStatetoProps = state => {
   return {
     ingredientsStore : state.burgerBuilder.ingredients,
     purchased : state.order.purchased
   }
}
export default connect(mapStatetoProps)(Checkout);