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

  // const needLogin = true;

  useEffect(() => {
    setLoaded(true);
    loadToken();

  }, [loadToken]);
  useEffect(()=>{

    maintainSession()



  },[])

  const maintainSession =  async ()=>{
    
    const data = await fetch(`https://localhost:7000/api/getLoginInfo`, {
      method: "get",
      "accept": '*/*',
      headers: {
        "Content-Type": "application/json",
        accept: '*/*',

        Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,
    },
    });
    debugger
    if(data.success && data.messageBox === ''){
      setUserData(data.user)
    }else{
      setGlobalState(p => ({ ...p, message: data.messageBox, open: true }))
    }
    
  }


  
  if (!loaded) {
    return null;
  }




  return (
    <>
      <CNotification isOpen={globalState.open} setOpen={e => setGlobalState(p => ({ ...p, open: e }))} message={globalState.message} />

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
