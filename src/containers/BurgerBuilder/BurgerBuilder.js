import React, { useState, useEffect } from 'react';

import Aux from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Model/Model';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
//import PropTypes from 'prop-types';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { connect } from 'react-redux';
import * as burgerBuilderAction from '../../store/actions/index.js';
import * as orderAction from '../../store/actions/index';
import * as authAction from '../../store/actions/index';

// const INGREDIENT_PRICE = {
//   salad : 0.5,
//   bacon : 0.7,
//   cheese : 0.5,
//   meat : 8.5,
// }
const BurgerBuilder = props => {
  const [showOrderSummary, setShowOrderSummary] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, [])

   const  updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
           .map(igKey => {
            return ingredients[igKey];         
        }).reduce((sum , el) => {
           return sum + el;   
        }, 0);
        // this.setState({purchasable : sum > 0});
        return sum > 0;
    };
  const showOrderSummaryHandler = () => {
    if (props.isAuthenticated) {
      setShowOrderSummary(true);
      //this.setState({showOrderSummary : true});
    }
    else {
      props.onSetAuthRedirectPath('/checkout');
      props.history.push('/auth');
    }
    };
   // addIngredientHandler = (type) => {
  //      const oldIngredients = this.state.ingredients[type];
  //      const addedIngredients = oldIngredients + 1;
  //      const updatedIngredients = {
  //        ...this.state.ingredients
  //      }
  //      updatedIngredients[type] = addedIngredients;
  //      const priceAdditon = INGREDIENT_PRICE[type];
  //      const oldPrice = this.state.totalPrice;
  //      const newPrice = oldPrice + priceAdditon; 
  //      this.setState({ totalPrice:newPrice , ingredients: updatedIngredients})
  //      this.updatePurchaseState(updatedIngredients);
  // }

  //  removeIngredientHandler = (type) => {
  //   const oldIngredients = this.state.ingredients[type];
  //   if(oldIngredients <=0){
  //     return;
  //   }
  //      const removeIngredients = oldIngredients - 1;
  //      const updatedIngredients = {
  //        ...this.state.ingredients
  //      }
  //      updatedIngredients[type] = removeIngredients;
  //      const priceDeduction = INGREDIENT_PRICE[type];
  //      const oldPrice = this.state.totalPrice;
  //      const newPrice = oldPrice - priceDeduction; 
  //      this.setState({totalPrice:newPrice , ingredients : updatedIngredients})
  //      this.updatePurchaseState(updatedIngredients);
  //  }

   const removeBackdropHandler = () => {
     setShowOrderSummary(false);
     //this.setState({showOrderSummary : false});
     props.history.push('/');
   }
   const continueOrderSummaryHandler = () => {
     //alert('Continue to Order');
     props.onPurchaseInit();
     props.history.push('/checkout');
    }
   // console.log(this.props)
  //   const queryParams = [];
  //   for (let i in this.state.ingredients){
  //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent                                    (this.state.ingredients[i]));
  //   }
  //    queryParams.push('price=' + this.state.totalPrice)
  //   // queryParams.push('price=' + this.props.price)
  //   const queryString = queryParams.join('&')
  //    this.props.history.push({
  //      pathname : '/checkout',
  //      search : '?' + queryString
  //  })

     const disabledInfo = {
       ...props.ingredientsStore
     }
     for(let key in disabledInfo){
       disabledInfo[key] = disabledInfo[key] <= 0
     }
     let orderSummary = null;

     let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />
     if(props.ingredientsStore){
      burger = 
      (
      <Aux>
        {/* <Burger ingredients = {this.state.ingredients}/> */}
            <Burger ingredients = {props.ingredientsStore}/>
 
        <BuildControls 
                // ingredientAdded  = {this.addIngredientHandler}
                ingredientAdded = {props.onIngredientsAdded}
                // ingredientRemove = {this.removeIngredientHandler}
                ingredientRemove = {props.onIngredientsRemove}
                disabled         = {disabledInfo}
                price            = {props.price}
                // purchasable      = {this.state.purchasable}
                 purchasable      = {updatePurchaseState(props.ingredientsStore)}
                showOrderSummary = {showOrderSummaryHandler}
                isAuth = {props.isAuthenticated}
               />
      </Aux>
      );
             orderSummary = <OrderSummary 
                  //  ingredients = {this.state.ingredients} 
                  ingredients = {props.ingredientsStore} 
                   purchasedCancelled = {removeBackdropHandler}
                   purchasedContinued = {continueOrderSummaryHandler}
                   price = {props.price}/>;
    }
    //  if(this.state.spinner){
    //   orderSummary = <Spinner />;
    // }
   return(
       <Aux>
         <Modal showOrderSummary = {showOrderSummary} removeBackdrop = {removeBackdropHandler}>
           {orderSummary}
         </Modal>
        {burger}
       </Aux>
     );
}
    // BurgerBuilder.propTypes = {
    //   type : PropTypes.string.isRequired
    // };
const mapStateToProps = state => {
   return {
    ingredientsStore : state.burgerBuilder.ingredients,
    price : state.burgerBuilder.totalPrice,
    error : state.burgerBuilder.error,
    purchased : state.order.purchased,
    isAuthenticated : state.auth.token !== null 
   };
};
const mapDispatchToProps = dispatch => {
   return {
     onIngredientsAdded:(ingName)=>dispatch(
       burgerBuilderAction.ingredientAdded(ingName)),
 
     onIngredientsRemove : (ingName) => dispatch(
      burgerBuilderAction.ingredientRemove(ingName)),

    onInitIngredients : (ingredients) => dispatch(
      burgerBuilderAction.initIngredients(ingredients)),

    onPurchaseInit : () => dispatch (orderAction.purchaseInit()),
    
    onSetAuthRedirectPath : (path) => dispatch(authAction.setAuthRedirectPath(path))
   }
}
export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder ,axios));