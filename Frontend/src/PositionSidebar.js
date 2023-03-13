import React, { useEffect, useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Switch, useParams } from "react-router-dom";

import PositionDetail from "./PositionDetail";

import StockDetail from './StockDetail';
import UserDetail from './UserDetail';
import { getHistoricalData } from './store/actions/ledger';
import { getPositions, updatePositionAndGet } from "./store/actions/positions";
import { getWatchedStocks, updateWatchedStockAndGet } from './store/actions/watched-stocks';

import { exitWatchedStock } from './store/actions/watched-stocks';


import { purple } from "@material-ui/core/colors";
import { createTheme } from "@mui/material";
import CNavbar from "./globalcomponents/CNavbar";
import SearchContainer from "./search/SearchContainer";
import Kyc from "./kyc";
import Profile from "./Profile";
import DataTable from "./DataTable";
import { Graph } from "./Graph";
import CFooter from "./globalcomponents/CFooter";
import JazzCashCheckout from "./Banks/jazzcash";
import BinancePayCheckout from "./Banks/Binancepay";
import VisaMaster from "./Banks/VisaMaster";
import AdminPanel from "./AdminPanel";
import DisableUserPage from "./DisableUserPage";
import UserContext from "./ContextApi.js/UserContext";
import Referral from "./Referral";

const PositionSidebar = ({ positions, formVisible, watchedStocks, updatePositionAndGet, updateWatchedStockAndGet }) => {
  const dispatch = useDispatch();
  const userData = useContext(UserContext);




  // useEffect(() => {
  //   dispatch(getPositions())
  // }, [dispatch]);

  // useEffect(() => {
  //   dispatch(getWatchedStocks());
  // }, [dispatch]);
  // useEffect(() => {
  //   dispatch(getHistoricalData());
  // }, [dispatch]);

  //updatepositions =================================================================================
  const [flag, setflag] = useState(0)
  const [posLen, setPosLen] = useState(0)
  // useEffect(() => {
  //   if (posLen !== positions?.length) {

  //     const delay = () => {
  //       setTimeout(() => {
  //         delay()
  //         const API_Key = process.env.REACT_APP_FMP_API_KEY;
  //         let stockSymbols = positions && positions.length > 0 && positions.map(m => { return m.stockSymbol }).join(',')
  //         let API_CALL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbols}?apikey=${API_Key}`;
  //         fetch(API_CALL)
  //           .then((response) => {
  //             return response.json()
  //           }).then((data) => {
  //             data && data.length > 0 && data.map(m => {
  //               return updatePositionAndGet({
  //                 stockSymbol: m.symbol,
  //                 currentPrice: m.price
  //               })
  //             })

  //             getPositions();
  //           })
  //       }, 60000)
  //     }
  //     delay()
  //     setPosLen(positions?.length);
  //   }
  // }, [positions, posLen, updatePositionAndGet])
  // useEffect(() => {
  //   if (positions?.length === 0 && flag === 0) {
  //     setflag(1)
  //     getPositions();
  //   }
  // }, [flag, positions, updatePositionAndGet]);

  //updatewatchedstocks =================================================================================
  const [flag2, setflag2] = useState(0)
  const [posLen2, setPosLen2] = useState(0)
  // useEffect(() => {
  //   if (posLen2 !== watchedStocks?.length) {

  //     const delay = () => {
  //       setTimeout(() => {
  //         delay()
  //         const API_Key = process.env.REACT_APP_FMP_API_KEY;
  //         let stockSymbols = watchedStocks && watchedStocks.map(m => { return m.stockSymbol }).join(',')
  //         let API_CALL = `https://financialmodelingprep.com/api/v3/profile/${stockSymbols}?apikey=${API_Key}`;
  //         fetch(API_CALL)
  //           .then((response) => {
  //             return response.json()
  //           }).then((data) => {
  //             data && data.length > 0 && data.map(m => {
  //               return updateWatchedStockAndGet({
  //                 stockSymbol: m.symbol,
  //                 currentPrice: m.price
  //               })
  //             })

  //             getWatchedStocks();
  //           })
  //       }, 60000)
  //     }
  //     delay()
  //     setPosLen2(getWatchedStocks?.length);
  //   }
  // }, [watchedStocks, posLen2, updateWatchedStockAndGet])
  // useEffect(() => {


  //   if (watchedStocks?.length === 0 && flag2 === 0) {
  //     setflag2(1)
  //     getWatchedStocks();
  //   }
  // }, [flag2, updateWatchedStockAndGet, watchedStocks]);



  const { id } = useParams();
  const positionId = Number.parseInt(id);

  if (!positions) {
    return null;
  }

  if (!watchedStocks) {
    return null;
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: '#f44336',
      },
    },
  });

  return (
    <>


      <CNavbar page={'positionsidebar'} />
      Login as {userData?.isAdmin ? 'Admin' : 'User'}

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
          path="/referral"
          render={(props) => <Referral />}
        />

        {/* Starts Admin Routes */}
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
        {/* Ends Admin Routes */}





        <Route exact={true} path="/" component={UserDetail} />
        <Route component={PositionSidebar} />
      </Switch>

      {/* <Graph />
      <DataTable /> */}
      <CFooter />


      {/* <Switch>

        <SearchContainer />

      </Switch>
      <div className='sidebar-label'>Stocks</div>
      {positions.slice(0).reverse().map((position) => {
        return (
          <NavLink key={position.id} to={`/position/${position.id}`}>
            <div
              className={
                positionId === position.id
                  ? "nav-entry is-selected"
                  : "nav-entry"
              }
            >


              <div className={`${parseFloat(100 * (position.currentPrice - position.buyPrice) / position.buyPrice).toFixed(2) > 0
                ? "green" : "red"}`}
              >{parseFloat(100 * (position.currentPrice - position.buyPrice) / position.buyPrice).toFixed(2)}%</div>
              <div>


                <div className="primary-text">{position.stockName}</div>
                <div className="secondary-text">
                  {position.shares} share{position.shares === 1 ? '' : 's'} at ${position.currentPrice}
                </div>

              </div>
            </div>
          </NavLink>
        );
      })}
      <div className='sidebar-label'>Watchlist</div>
      {watchedStocks.slice(0).reverse().map((watchedStock) => {
        return (
          <NavLink key={watchedStock.id} to={`/stock/${watchedStock.stockSymbol}`}>
            <div
              className={
                positionId === watchedStock.id
                  ? "nav-entry is-selected"
                  : "nav-entry"
              }
            >
              <div className='purple'
              >${watchedStock.currentPrice}</div>
              <div>
                <div className="primary-text">{watchedStock.stockName}</div>
                <div className="secondary-text">
                  <span onClick={async () => await dispatch(exitWatchedStock(watchedStock.id))} >Delete</span>
                </div>

              </div>
            </div>
          </NavLink>
        );
      })} */}

    </>
  );
};

const PositionSidebarContainer = (props) => {
  const positions = useSelector((state) => Object.values(state.positions));
  const watchedStocks = useSelector((state) => Object.values(state.watchedStocks));
  const ledger = useSelector((state) => Object.values(state.ledger));
  const dispatch = useDispatch();


  return (
    <>

      <PositionSidebar
        positions={positions}
        watchedStocks={watchedStocks}
        ledger={ledger}
        updatePositionAndGet={(data) => {
          dispatch(updatePositionAndGet(data))
        }}
        updateWatchedStockAndGet={(data) => {
          dispatch(updateWatchedStockAndGet(data))
        }}
        exitWatchedStock={(id) => dispatch(exitWatchedStock(id))}
      />
    </>

  );
};

export default React.memo(PositionSidebarContainer);
