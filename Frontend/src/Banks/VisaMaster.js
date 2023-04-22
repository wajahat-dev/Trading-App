import React, { useState } from 'react';
import { Button, Modal, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

function PaymentModal(props) {
    const classes = useStyles();
    const [cardNumber, setCardNumber] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCVC] = useState('');

    const handleCardNumberChange = (event) => {
        setCardNumber(event.target.value);
    };

    const handleCardholderNameChange = (event) => {
        setCardholderName(event.target.value);
    };

    const handleExpirationDateChange = (event) => {
        setExpirationDate(event.target.value);
    };

    const handleCVCChange = (event) => {
        setCVC(event.target.value);
    };

    const handleAddFundsClick = () => {
        const data = {
            cardNumber: cardNumber,
            cardholderName: cardholderName,
            expirationDate: expirationDate,
            cvc: cvc,
            amount: props.selectedAmount,
        };

        axios.post('/api/addFunds', data)
            .then((response) => {
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Modal
            open={props.open}
            onClose={props.handleClose}
            className={classes.modal}
        >
            <div className={classes.paper}>
                <TextField
                    label="Card Number"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    style={{ marginBottom: "1rem" }}
                />
                <TextField
                    label="Cardholder Name"
                    value={cardholderName}
                    onChange={handleCardholderNameChange}
                    style={{ marginBottom: "1rem" }}
                />
                <div className="expiration-cvc">
                    <TextField
                        label="Expiration Date"
                        value={expirationDate}
                        onChange={handleExpirationDateChange}
                        style={{ marginBottom: "1rem" }}
                    />
                    <TextField
                        label="CVC/CVV Secure Code"
                        value={cvc}
                        onChange={handleCVCChange}
                        style={{ marginBottom: "1rem" }}
                    />
                </div>
                <Button onClick={handleAddFundsClick} style={{ marginTop: "1rem" }}>
                    Add funds with {props.selectedAmount} USD
                </Button>
            </div>
        </Modal>
    );
}

export default function VisaMaster() {
    const [selectedAmount, setSelectedAmount] = useState('');
    const [customAmount, setCustomAmount] = useState('');
    const [open, setOpen] = useState(false);

    const handleAmountChange = (event) => {
        setSelectedAmount(event.target.outerText.split('$')[1]);
        setCustomAmount(event.target.outerText.split('$')[1]);
    };

    const handleCustomAmountChange = (event) => {
        setSelectedAmount('');
        setCustomAmount(event.target.value);
    };

    const handlePayClick = () => {
        if (selectedAmount || customAmount) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <h1>Select an amount to add:</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <Button variant="contained" color="primary" onClick={handleAmountChange} value="10" style={{ margin: '0.5rem' }}>
                    $10
                </Button>
                <Button variant="contained" color="primary" onClick={handleAmountChange} value="20" style={{ margin: '0.5rem' }}>
                    $20
                </Button>
                <Button variant="contained" color="primary" onClick={handleAmountChange} value="30" style={{ margin: '0.5rem' }}>
                    $30
                </Button>
                <Button variant="contained" color="primary" onClick={handleAmountChange} value="50" style={{ margin: '0.5rem' }}>
                    $50
                </Button>
                <div style={{ flexGrow: 1, margin: '0.5rem' }}>
                    <TextField label="Custom amount" value={customAmount} onChange={handleCustomAmountChange} type="number" fullWidth />
                </div>
                <div style={{ margin: '0.5rem' }}>
                    <Button variant="contained" color="primary" onClick={handlePayClick} style={{ minWidth: '5rem' }}>
                        Pay
                    </Button>
                </div>
            </div>
            <PaymentModal open={open} handleClose={handleClose} selectedAmount={selectedAmount || customAmount} />
        </div>

    )
}
