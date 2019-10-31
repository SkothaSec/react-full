import React, { useContext, useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router';
import {AuthCheck, Context, history} from './utils';

import {HomePage, CallbackPage, ProfilePage} from './components/views';
import {Header} from './components/layout';
import {HooksContainer, HooksForm} from './hooks';
import {PrivateComponent} from './components/user';

const PrivateRoute = ({component: Component, auth }) => (
  <Route render={props => auth === true
    ? <Component auth={auth} {...props} />
    : <Redirect to={{pathname:'/'}} />
  }
  />
)

const Routes = () => {
    const context = useContext(Context)


      return(
        <div>
          <Router history={history} >
          <Header />
          <br />
          <br />
          <div>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/hooksform' component={HooksForm} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/hookscontainer' component={HooksContainer} />
              <Route path='/authcheck' component={AuthCheck} />

              <PrivateRoute path='/privateroute'
                            auth={context.authState}
                            component={PrivateComponent} />
              <PrivateRoute path="/profile"
                            auth={context.authState}
                            component={ProfilePage} />
              <Route path='/callback' render={(props) => { context.handleAuth(props);
                                                            return <CallbackPage />}} />


            </Switch>
          </div>
          </Router>
        </div>
  )}



export default Routes;