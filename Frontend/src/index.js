import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';


const store = configureStore();

const theme = createMuiTheme({
  palette: {
    // primary: green,
    // secondary: red,
    primary: blue,
    secondary: purple,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App /> 
      </MuiThemeProvider> 
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
