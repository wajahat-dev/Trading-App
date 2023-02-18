import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CLoader from './globalcomponents/CLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
    backgroundColor: "#F5F5F5",
    marginTop: 10,
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
    formData: { cnic: 'dummy', displayName: 'dummy', phone: 'dummy', country: 'dummy', dob: 'dummy' }
  })
  const [loader, setLoader] = React.useState(false)


  const getData = async () => {
    debugger
    setLoader(true)
    try {
      const response = await fetch(`https://localhost:7000/api/userprofile`, {
        method: "get",
        "accept": '*/*',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('TOKEN_KEY')
            ? localStorage.getItem('TOKEN_KEY')
            : ''
            }`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setGlobalState(p => ({
            ...p,
            formData: { cnic: data[0].cnic, displayName: data[0].displayname, phone: data[0].phone, country: data[0].country, dob: data[0].dob }
          }))

        }
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoader(false)
    }
  };


  React.useEffect(() => {
    getData()
  }, [])



  return (
    <>
      <CLoader enabled={loader} />
      <div className={classes.root}>
        <Grid container spacing={3} justify="center" alignItems="center">
          <Grid item>
            <Avatar
              alt="Profile Picture"
              src="https://via.placeholder.com/150"
              className={classes.avatar}
            />
            <Typography variant="h5" gutterBottom>
              {globalState.formData.displayName}
            </Typography>
            <Typography variant="body1">{globalState.formData.dob}</Typography>
          </Grid>
        </Grid>
        <Grid container justify="center">
          <Grid item xs={12} md={6}>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  <Typography variant="body1">CNIC: {globalState.formData.cnic}</Typography>
                  <Typography variant="body1">Phone: {globalState.formData.phone}</Typography>
                  <Typography variant="body1">Country: {globalState.formData.country}</Typography>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Profile;