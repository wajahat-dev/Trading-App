import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { useEffect } from 'react';

export default function CNotification({ isOpen, message, setOpen, varient = 'info' }) {
    const [openLocal, setOpenLocal] = React.useState(false);
    // type AlertColor = 'success' | 'info' | 'warning' | 'error';
    useEffect(() => {
        setOpenLocal(isOpen)
    }, [isOpen, openLocal])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false)
        setOpenLocal(false);
    };
    return (
        // <div  className={{zIndex: 100000}}>
        //     <Snackbar
        //         open={openLocal}
        //         autoHideDuration={3000}
        //         onClose={handleClose}
        //         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        //     >
        //         <Alert severity={varient}>{message}</Alert>
        //     </Snackbar>
        // </div>
        <div style={{ zIndex: 100000}}>
            <Snackbar
                open={openLocal}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={varient}>{message}</Alert>
            </Snackbar>
        </div>
    );
}