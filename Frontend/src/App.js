import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import { loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginPanel from "./loginpage/LoginPanel";
import PositionSidebar from "./PositionSidebar";
import SignUpForm from './SignUpForm';

import HomePage from "./homepage/HomePage";
import Profile from "./Profile";
import JazzCashCheckout from "./Banks/jazzcash";
import UserContext from "./ContextApi.js/UserContext";
import { userDetails } from "./contants";


const App = ({ loadToken }) => {
  const token = useSelector(state => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const needLogin = !token;
  const [userData, setUserData] = useState({ ...userDetails })

  // const needLogin = true;

  useEffect(() => {
    setLoaded(true);
    loadToken();

  }, [loadToken]);
  useEffect(()=>{
    console.log('wwwwwwwwwwwwwwwwwwww')
  },[])

  
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
            component={() => <LoginPanel setUserData={e => setUserData(e)} />}
            // component={() => <LoginPanel setUserData={setUserData} />}
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
          {/* <ProtectedRoute
          // path="/profile"
          path="/login"
          exact={true}
          needLogin={needLogin}
          component={Profile}
        /> */}
          <PrivateRoute
            path="/"
            // component={() => <PositionSidebar  />}
            component={() => <UserContext.Provider value={userData}><PositionSidebar /></UserContext.Provider >}
            // component={() => <UserContext.Provider value={userData}><PositionSidebar /></UserContext.Provider >}
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
