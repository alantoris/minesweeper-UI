import React from 'react';
import { 
    CssBaseline,
    Grid,
    Paper,
} from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Board from './Board'
import ControlPanel from './ControlPanel'

const useStyles = makeStyles((theme) => ({
    root: {
      height: '100vh',
    },
    board: {
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


const Match = (props) => {

    const classes = useStyles();

    const token = localStorage.getItem('token');

    return (
        token ? (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={9} className={classes.board}>
                    <Board></Board>
                </Grid>
                <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                    <ControlPanel></ControlPanel>
                </Grid>
            </Grid>
        ) :
        (
            <Redirect to="/account/login" /> 
        )
    )
}

export default Match;