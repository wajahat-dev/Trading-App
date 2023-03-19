import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import { TOKEN_KEY, loadToken } from "./store/actions/authentication";
import { ProtectedRoute, PrivateRoute } from "./util/route-util";
import LoginPanel from "./loginpage/LoginPanel";
import PositionSidebar from "./PositionSidebar";
import SignUpForm from './SignUpForm';

import HomePage from "./homepage/HomePage";
import Profile from "./Profile";
import JazzCashCheckout from "./Banks/jazzcash";
import UserContext from "./ContextApi.js/UserContext";
import { userDetails } from "./contants";
import CNotification from "./globalcomponents/CNotification";
import CLoader from "./globalcomponents/CLoader";


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


  const [loader, setLoader] = useState(false)

  // const needLogin = true;

  useEffect(() => {
    setLoaded(true);
    loadToken();

  }, [loadToken]);
  useEffect(() => {

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
