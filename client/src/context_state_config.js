import React, { useReducer } from 'react';

import * as ACTIONS from './ducks/actions/actions';

import * as RootReducer from './ducks/reducers/plain_reducer';
import * as AuthReducer from './ducks/reducers/auth_reducer';
import * as FormReducer from './ducks/reducers/form_reducer';

import Routes from './routes';
import { Auth, Context } from './utils';

const auth = new Auth();

const ContextState = () => {
  /*
        Plain Reducer
    */
  const [stateRootReducer, dispatchRootReducer] = useReducer(
    RootReducer.RootReducer,
    RootReducer.initialState
  );

  const handleDispatchTrue = () => {
    //    dispatchRootReducer(type: "SUCCESS")
    //    dispatchRootReducer(ACTIONS.SUCCESS)
    dispatchRootReducer(ACTIONS.success());
  };

  const handleDispatchFalse = () => {
    //     dispatchRootReducer(type: "FAILURE")
    //    dispatchRootReducer(ACTIONS.FAILURE)
    dispatchRootReducer(ACTIONS.failure());
  };

  /*
      Auth Reducer
    */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState
  );

  const handleLogin = () => {
    dispatchAuthReducer(ACTIONS.login_success());
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.login_failure());
  };

  const handleAddProfile = profile => {
    dispatchAuthReducer(ACTIONS.add_profile(profile));
  };

  const handleRemoveProfile = () => {
    dispatchAuthReducer(ACTIONS.remove_profile());
  };

  /*
      Form Reducer
    */

  const [stateFormReducer, dispatchFormReducer] = useReducer(
    FormReducer.FormReducer,
    FormReducer.initialState
  );

  const handleFormChange = event => {
    dispatchFormReducer(ACTIONS.user_input_change(event.target.value));
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    event.persist();
    dispatchFormReducer(ACTIONS.user_input_submit(event.target.useContext.value));
  };

  //Handle authentication from callback
  const handleAuthentication = props => {
    if (props.location.hash) {
      auth.handleAuth();
    }
  };

  return (
    <div>
      <Context.Provider
        value={{
          //Reducer1
          stateProp1: stateRootReducer.stateprop1,
          stateProp2: stateRootReducer.stateprop2,
          dispatchContextTrue: () => handleDispatchTrue(),
          dispatchContextFalse: () => handleDispatchFalse(),

          //Form Reducer
          useContextChangeState: stateFormReducer.user_textChange,
          useContextSubmitState: stateFormReducer.user_textSubmit,
          useContextSubmit: event => handleFormSubmit(event),
          useContextChange: event => handleFormChange(event),

          //Auth Reducer
          authState: stateAuthReducer.is_authenticated,
          profileState: stateAuthReducer.profile,
          handleUserLogin: () => handleLogin(),
          handleUserLogout: () => handleLogout(),
          handleUserAddProfile: profile => handleAddProfile(profile),
          handleUserRemoveProfile: () => handleRemoveProfile(),

          //Handle auth
          handleAuth: props => handleAuthentication(props),
          authObj: auth
        }}
      >
        <Routes />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
