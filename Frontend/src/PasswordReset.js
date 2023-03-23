import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import React from 'react';


function PasswordResetPage() {
    const { userId, token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        // verify that the token is valid
        fetch(`/api/verify-reset-token?userId=${userId}&token=${token}`)
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error(error));
    }, [userId, token]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords don't match");
            return;
        }

        fetch(`/api/reset-password/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, password })
        })
            .then(response => response.json())
            .then(data => setMessage(data.message))
            .catch(error => console.error(error));
    };

    return (
        <React.Fragment>
        <div>
            <h2>Reset Password</h2>
            <p>{message}</p>
            {message === '' &&
                <form onSubmit={handleSubmit}>
                    <label>
                        Password:
                        <input type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </label>
                    <label>
                        Confirm Password:
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={event => setConfirmPassword(event.target.value)}
                        />
                    </label>
                    <button type="submit">Reset Password</button>
                </form>
            }
        </div>
        </React.Fragment>
    );
}

export default PasswordResetPage;
