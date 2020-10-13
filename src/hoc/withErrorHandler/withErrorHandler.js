import React,{Component} from 'react';

import Aux from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Model/Model';
import useHttpErrorHandler from '../../hooks/http-error-hook';

const withErrorHandler = (WrappedComponent , axios) => {
   return props => {
  const [error, clearError] = useHttpErrorHandler(axios);
    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};
// const ErrorHandler = (WrappedComponent , axios ) => {
//   return class extends Component{
//     state = {
//       error : null
//     }

//     componentWillMount () {

//       this.reqInterceptor = axios.interceptors.request.use(req => {
//         this.setState({error : null})
//         return req;
//       });

//       this.resInterceptor = axios.interceptors.response.use(res => res , error => {
//         this.setState({error : error});
//       })
      
//     }

//    componentWillUnmount () {
//       axios.interceptor.request.eject(this.reqInterceptor);
//         axios.interceptor.response.eject(this.resInterceptor);
//      }
//     errorConfirmedHandler = () => {
//       this.setState({error:null});
//     }
//     render(){
//     return(
//         <Aux>
//         <Model 
//               showOrderSummary = {this.state.error} 
//               removeBackdrop = {this.errorConfirmedHandler}>
//             {this.state.error ? this.state.error.message : null}
//         </Model>
//         <WrappedComponent {...this.props} />
//       </Aux>
//       )}
//   }
// }

export default withErrorHandler;