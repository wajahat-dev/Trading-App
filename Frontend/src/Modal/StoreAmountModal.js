import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { TextField } from '@mui/joy';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import Typography from '@mui/joy/Typography';
import { FormControl, Input, InputLabel } from '@mui/material';
import * as React from 'react';

export default function StoreAmountModal({ open, amount, handleAmountChange, storeAmount, handleCancelClick, onClick, onClose, header, message, labels = { one: 'Ok', two: 'Cancel' } }) {
    return (
        <React.Fragment>
            <Modal open={open} onClose={onClose} size="md">
                <ModalDialog
                    variant="outlined"
                    role="alertdialog"
                    aria-labelledby="alert-dialog-modal-title"
                    aria-describedby="alert-dialog-modal-description"
                >
                    <Typography
                        id="alert-dialog-modal-title"
                        component="h2"
                        startDecorator={<WarningRoundedIcon />}
                    >
                        Deposit Amount
                    </Typography>
                    <Divider />
                    <FormControl >
                        <InputLabel htmlFor="name-simple">Enter amount in dollars</InputLabel>
                        <Input id="name-simple" value={amount} onChange={handleAmountChange} />

                    </FormControl>
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end', pt: 2 }}>
                        <Button variant="outlined" color="danger" onClick={storeAmount}>
                            Store
                        </Button>
                        <Button variant="outlined" color="neutral" onClick={handleCancelClick}>

                            Cancel

                        </Button>
                    </Box>
                </ModalDialog>
            </Modal>

        </React.Fragment>
    );
}