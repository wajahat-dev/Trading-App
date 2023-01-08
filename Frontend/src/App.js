import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginPanel from "./loginpage/LoginPanel";
import PositionSidebar from "./PositionSidebar";
import SignUpForm from './SignUpForm';

import HomePage from "./homepage/HomePage";


const App = ({ loadToken }) => {
  const token = useSelector(state => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const needLogin = !token;
  // const needLogin = true;

  useEffect(() => {
    setLoaded(true);
    loadToken();
    
  }, [loadToken]);
  
  if (!loaded) {
    return null;
  }
  
  return (
    <>
    <BrowserRouter>
      <Switch>  
        
        <ProtectedRoute
          path="/login"
          exact={true}
          needLogin={needLogin}
          component={LoginPanel}
        />
        <ProtectedRoute
          path="/signup"
          exact={true}
          needLogin={needLogin}
          component={SignUpForm}
        />
        <ProtectedRoute
          path="/homepage"
          exact={true}
          needLogin={needLogin}
          component={HomePage}
        />
        <PrivateRoute
          path="/"
          component={PositionSidebar}
          needLogin={needLogin}
        />
        
      </Switch>
    </BrowserRouter>
    
    </>
  );
};

const AppContainer = () => {
  const needLogin = useSelector((state) => !state.authentication.token);
  const dispatch = useDispatch();
  return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
};

export default AppContainer;
