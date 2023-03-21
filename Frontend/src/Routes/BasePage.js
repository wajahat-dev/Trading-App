import React from "react";
import { Route, Switch } from "react-router-dom";
import PositionSidebar from "../PositionSidebar";
import AdminPanel from "../AdminPanel";
import BinancePayCheckout from "../Banks/Binancepay";
import VisaMaster from "../Banks/VisaMaster";
import JazzCashCheckout from "../Banks/jazzcash";
import DisableUserPage from "../DisableUserPage";
import PositionDetail from "../PositionDetail";
import Profile from "../Profile";
import Referral from "../Referral";
import StockDetail from '../StockDetail';
import UserDetail from '../UserDetail';
import Kyc from "../kyc";
import Amount from "../Amount";
import NotFound from "../NotFound";

export const BasePage = (props) => {

  return (
    <>

      <Switch>
        <Route
          path="/position/:id"
          render={(props) => <PositionDetail {...props} />}
        />
        <Route
          path="/stock/:stockSymbol"
          render={(props) => <StockDetail {...props} />}
        />

        <Route
          path="/profile"
          render={(props) => <Profile />}
        />
        <Route
          path="/jazzcash"
          render={(props) => <JazzCashCheckout />}
        />
        <Route
          path="/binancepay"
          render={(props) => <BinancePayCheckout />}
        />
        <Route
          path="/visamaster"
          render={(props) => <VisaMaster />}
        />
        <Route
          path="/kycc"
          render={(props) => <Kyc />}
        />
        <Route
          path="/amount"
          render={(props) => <Amount />}
        />
        <Route
          path="/referral"
          render={(props) => <Referral />}
        />

        <Route
          needLogin={true}
          path="/admin"
          render={(props) => <AdminPanel />}
        />
        <Route
          needLogin={true}

          path="/disable"
          render={(props) => <DisableUserPage />}
        />

        <Route  path="/" component={UserDetail} />
        <Route component={PositionSidebar} />
        <Route path='*' exact={true} component={<NotFound />} />

      </Switch>

    </>
  );


};
