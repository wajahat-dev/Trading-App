import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { Switch } from 'react-router-dom';

export default function CNotification({ isOpen, message, setOpen }) {
    const [open, setOpen1] = React.useState(false);

    useEffect(()=>{
        setOpen1(isOpen)
    },[isOpen, open])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
        setOpen1(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
   

            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={message}
                // action={action}
            />
        </div>
    );
}