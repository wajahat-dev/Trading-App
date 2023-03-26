import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, useRouteMatch, Switch } from "react-router-dom";

import { TOKEN_KEY, loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginPanel from "./loginpage/LoginPanel";
import PositionSidebar from "./PositionSidebar";
import SignUpForm from './SignUpForm';
import { Redirect, Route } from "react-router-dom";

import HomePage from "./homepage/HomePage";
import Profile from "./Profile";
import JazzCashCheckout from "./Banks/jazzcash";
import UserContext from "./ContextApi.js/UserContext";
import { userDetails } from "./contants";
import CNotification from "./globalcomponents/CNotification";
import CLoader from "./globalcomponents/CLoader";
import PasswordResetPage from "./PasswordReset";


const App = ({ loadToken }) => {
  const token = useSelector(state => state.authentication.token);
  const [loaded, setLoaded] = useState(false);
  const needLogin = !token;
  const [userData, setUserData] = useState({ ...userDetails })
  const [globalState, setGlobalState] = useState({
    message: '',
    open: false,
    varient: 'info'
  })
  let match = useRouteMatch();


  const [loader, setLoader] = useState(false)
console.log('wwwwwwwww',match)
  // const needLogin = true;

  useEffect(() => {
    setLoaded(true);
    loadToken();

  }, [loadToken]);
  useEffect(() => {
    // alert(match)
    localStorage.getItem('TOKEN_KEY') && maintainSession()



  }, [])

  const maintainSession = async () => {



    setLoader(true)

    try {
      const response = await fetch(`${process.env.React_APP_BASEURLPARTIAL}/getLoginInfo`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          accept: '*/*',
          Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,
        },
      });
      const data = await response.json()
      debugger
      if (data.success && data.messageBox === '') {
        setUserData(data.user)
      } else {
        setGlobalState(p => ({ ...p, message: data.messageBox, open: true }))
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)

    }

  }



  if (!loaded) {
    return null;
  }



  return (
    <>
      <CNotification isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />
      <CLoader enabled={loader} />

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
          {/* <ProtectedRoute

            // path="/resetpassword"
            path="/resetpassword/:topicId"
            // path="/resetpassword/:guid([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})"
            exact={true}
            needLogin={needLogin}
            component={PasswordResetPage}
          /> */}
          <Route
             path="/resetpassword"
            // path="/resetpassword/:guid([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})"

            // path="/resetpassword/:guid([0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12})"
            exact={true}
            render={(props) => <PasswordResetPage {...props} />}

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
