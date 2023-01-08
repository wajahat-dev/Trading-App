import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from './store/actions/authentication';
import { white } from '@mui/material/colors';
import { Link } from 'react-router-dom';


export default function MUIheader(props) {

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Forex Marketing

            </Typography>


          </Box>


          <Box sx={{ flexGrow: 1 }} />
          {/* <Link to="/">
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Dashboard
            </Typography>
          </Link>
          <Button variant="text" onClick={handleClick}><Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
            color={'secondary'}
          >
            Logout
          </Typography></Button> */}
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Link to="/">

              <Button sx={{ color: '#fff' }}>

                Dashboard
              </Button>
            </Link>

            <Button sx={{ color: '#fff' }}>
              Logout
            </Button>
          </Box>


        </Toolbar>
      </AppBar>
    </Box>
  );
}