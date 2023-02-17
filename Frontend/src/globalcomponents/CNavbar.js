import { AppBar, Box, Button, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink, useHistory } from "react-router-dom";
import { logout } from '../store/actions/authentication';
import AccountMenu from '../AccountMenu';
import { Link } from 'react-router-dom';

const CNavbar = ({ page }) => {
    const dispatch = useDispatch();
    let history = useHistory();

    const handleClick = () => {
        dispatch(logout());
    };
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                       
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            <Typography
                                variant="h6"
                                noWrap
                                onClick={() => history.push("/")}
                                sx={{
                                    display: { xs: 'none', sm: 'block' },
                                    transition: 'color 0.2s ease-in-out',
                                    '&:hover': {
                                        color: 'primary.main',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                Forex Marketing
                            </Typography>
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            {pageType(page, handleClick)}
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>

        </>
    );
};


const pageType = (page, handleClick) => {
    switch (page) {
        case 'login':
            return <>

                <Button
                    color={'#fafafa'}
                    to="/homepage"
                    component={RouterLink}
                >
                    Home Page
                </Button>
            </>
        case 'signup':
            return <>

                <Button
                    color={'#fafafa'}

                    to="/homepage"
                    component={RouterLink}
                >
                    Home Page
                </Button>
            </>

        case 'homepage':
            return <>
                <Button
                    color={'#fafafa'}

                    to="/login"
                    component={RouterLink}
                >
                    Log In
                </Button>

                <Button
                    color={'#fafafa'}

                    to="/signup"
                    component={RouterLink}
                >
                    Sign Up
                </Button>
            </>
        case 'positionsidebar':
            return <>
                <AccountMenu logoutHandler={handleClick} />
            </>
        default:
            return <></>
    }
}

export default CNavbar;