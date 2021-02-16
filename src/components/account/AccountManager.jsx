import React from 'react';
import { 
    CssBaseline,
    Grid,
    Paper,
} from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import SingIn from './SingIn'
import SingUp from './SingUp'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AccountManager(props) {
  const classes = useStyles();

  const { token, setToken } = props;

  return (
    token ? (
      <Redirect to="/match" />
    ) :
    (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
              <Route path="/account/login">
                  <SingIn classes={classes} setToken={setToken}/>
              </Route>
              <Route path="/account/signup">
                  <SingUp classes={classes}/>
              </Route>
              <Redirect from="/account" to="/account/login" />
          </div>
        </Grid>
      </Grid>
    )
  );
}