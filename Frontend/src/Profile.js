import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#F5F5F5"
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: theme.spacing(2)
  },
  card: {
    margin: theme.spacing(2),
    padding: theme.spacing(2)
  },
  button: {
    margin: theme.spacing(1)
  }, paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


const Profile = (props) => {
  const classes = useStyles();
  const [globalState, setGlobalState] = useState({
    cnic: 'dummy', displayName: 'dummy', phone: 'dummy', country: 'dummy', dob: 'dummy'
  })

  return (
    <div className={classes.root}>
      <Grid container spacing={3} justify="center" alignItems="center">
        <Grid item>
          <Avatar
            alt="Profile Picture"
            src="https://via.placeholder.com/150"
            className={classes.avatar}
          />
          <Typography variant="h5" gutterBottom>
            {globalState.displayName}
          </Typography>
          <Typography variant="body1">{globalState.dob}</Typography>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                <Typography variant="body1">CNIC: {globalState.cnic}</Typography>
                <Typography variant="body1">Phone: {globalState.phone}</Typography>
                <Typography variant="body1">Country: {globalState.country}</Typography>
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Profile;