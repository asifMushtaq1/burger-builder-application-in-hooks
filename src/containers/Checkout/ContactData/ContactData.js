import React, { useState } from 'react'

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css'
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../../store/actions/index';
import { updateObject , checkValidity} from '../../../shared/utility';


const ContactData = props => {
    const [orderForm, setOrderForm] =  useState({
              name: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Your Name'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          street: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Street'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          zipCode: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'ZIP Code'
              },
              value: '',
              validation: {
                  required: true,
                  minLength: 5,
                  maxLength: 5,
                  isNumeric: true
              },
              valid: false,
              touched: false
          },
          country: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: 'Country'
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
          },
          email: {
              elementType: 'input',
              elementConfig: {
                  type: 'email',
                  placeholder: 'Your E-Mail'
              },
              value: '',
              validation: {
                  required: true,
                  isEmail: true
              },
              valid: false,
              touched: false
          },
          deliveryMethod: {
              elementType: 'select',
              elementConfig: {
                  options: [
                      {value: 'fastest', displayValue: 'Fastest'},
                      {value: 'cheapest', displayValue: 'Cheapest'}
                  ]
              },
              value: 'fastest',
              validation: {},
              valid: true
          }
      });
     const [formIsValid, setFormIsInvalid] =  useState(false);


  const orderHandler = ( event ) => {
      event.preventDefault();
      // this.setState( { spinner: true } );
      const formData = {};
      for (let formElementIdentifier in orderForm) {
          formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
      }
      const order = {
          ingredients: props.ingredientsStore,
          price: props.price,
          orderData: formData,
          userId : props.userId 
      }
      props.onOrderBurger(props.token, order);
      // axios.post( '/orders.json', order )
      //     .then( response => {
      //         this.setState( { spinner: false } );
      //         this.props.history.push( '/' );
      //     } )
      //     .catch( error => {
      //         this.setState( { spinner: false } );
      //     } );
  }

//   checkValidity(value, rules) {
//       let isValid = true;
//       if (!rules) {
//           return true;
//       }
      
//       if (rules.required) {
//           isValid = value.trim() !== '' && isValid;
//       }

//       if (rules.minLength) {
//           isValid = value.length >= rules.minLength && isValid
//       }

//       if (rules.maxLength) {
//           isValid = value.length <= rules.maxLength && isValid
//       }

//       if (rules.isEmail) {
//           const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//           isValid = pattern.test(value) && isValid
//       }

//       if (rules.isNumeric) {
//           const pattern = /^\d+$/;
//           isValid = pattern.test(value) && isValid
//       }

//       return isValid;
//   }

  const inputChangedHandler = (event, inputIdentifier) => {
    //   const updatedOrderForm = {
    //       ...this.state.orderForm
    //   };
    //   const updatedFormElement = { 
    //       ...updatedOrderForm[inputIdentifier]
    //   };
    //   updatedFormElement.value = event.target.value;
    //   updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    //   updatedFormElement.touched = true;
    //   updatedOrderForm[inputIdentifier] = updatedFormElement;
    const updatedFormElement = updateObject(orderForm[inputIdentifier],{
        value :  event.target.value,
        valid : checkValidity(event.target.value, orderForm[inputIdentifier].validation),
        touched : true
    })
    const updatedOrderForm = updateObject(orderForm, {
        [inputIdentifier] : updatedFormElement
    })
      
      let formIsValid = true;
      for (let inputIdentifier in updatedOrderForm) {
          formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
      }
      setOrderForm(updatedOrderForm);
      setFormIsInvalid(formIsValid);
      //this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid});
  }
      const formElementsArray = [];
      for (let key in orderForm) {
          formElementsArray.push({
              id: key,
              config: orderForm[key]
          });
      }
      let form = (
          <form onSubmit={orderHandler}>
              {formElementsArray.map(formElement => (
                  <Input 
                      key={formElement.id}
                      elementType={formElement.config.elementType}
                      elementConfig={formElement.config.elementConfig}
                      value={formElement.config.value}
                      invalid={!formElement.config.valid}
                      shouldValidate={formElement.config.validation}
                      touched={formElement.config.touched}
                      changed={(event) =>inputChangedHandler(event, formElement.id)} />
              ))}
              <Button btnType="Success" disabled={!formIsValid}>ORDER</Button>
          </form>
      );
      if (props.spinner ) {
          form = <Spinner />;
      }
      return (
          <div className={classes.ContactData}>
              <h4>Enter your Contact Data</h4>
              {form}
          </div>
      );
}

const mapStatetoProps = state => {
  return {
   ingredientsStore : state.burgerBuilder.ingredients,
   price : state.burgerBuilder.totalPrice,
   spinner : state.order.spinner,
   token : state.auth.token,
   userId : state.auth.userId
  }
};

const mapDispatchToProps = dispatch => {
    return {
      onOrderBurger : (token, orderData) => dispatch (actionTypes.purchaseBurger(token, orderData))
    }
}
export default connect(mapStatetoProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
 