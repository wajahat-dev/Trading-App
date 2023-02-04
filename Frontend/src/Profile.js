import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePosition } from './store/actions/current-position';
import { createPosition, exitPosition } from './store/actions/positions';
import { createInstance } from './store/actions/ledger';



const Profile = ({ authenticated, setAuthenticated }) => {
  const token = useSelector(state => state.authentication.token);
    
    
    if (!token) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            thsi is profile
        </div>
    );
}


export default Profile;
