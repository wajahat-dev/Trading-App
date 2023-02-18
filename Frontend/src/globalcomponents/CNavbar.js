import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useHistory } from "react-router-dom";
import { logout } from '../store/actions/authentication';
import AccountMenu from '../AccountMenu';
import { Link } from 'react-router-dom';
import {
    Button,
    Box,
    Drawer,
    AppBar,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    makeStyles,
    Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useGridSelector } from '@material-ui/data-grid';
import { ListItemButton } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import PersonOffIcon from '@mui/icons-material/PersonOff';
// import { Disabled as DisabledIcon } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    drawer: {
        // width: 240,
        flexShrink: 0,
    },
    drawerPaper: {
        // width: 240,
    },
    toolbar: theme.mixins.toolbar,
}));

const CNavbar = ({ page }) => {
    const dispatch = useDispatch();
    let history = useHistory();
    const trades = useSelector(state => state.trades);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleClick = () => {
        dispatch(logout());
    };

    const handleDrawerClose = () => {
        setDrawerOpen(false);
    };




    const classes = useStyles();


    const list = (anchor) => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
        //   onClick={toggleDrawer(anchor, false)}
        //   onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem key={'Disable'} disablePadding button component={Link} to="/disable">
                    <ListItemButton>
                        <ListItemIcon >
                            <PersonOffIcon />
                        </ListItemIcon>
                        <ListItemText primary={'Suspend Account'} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
            {/* <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List> */}
        </Box>
    );


    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {/* {trades.userDetails.isAdmin && <> */}
                        {true && <>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                            // className={classes.menuButton}
                            >
                                <MenuIcon />
                            </IconButton>

                            <React.Fragment key={'left'}>
                                {/* <Button onClick={toggleDrawer('left', true)}>{'left'}</Button> */}
                                <Drawer
                                    anchor={'left'}
                                    open={drawerOpen}
                                    onClose={handleDrawerOpen}
                                >
                                    {list('left')}
                                </Drawer>
                            </React.Fragment>
                        </>
                        }

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