import React, { useEffect } from 'react';
import { 
    CssBaseline,
    Grid,
    Paper,
} from '@material-ui/core';
import { Redirect, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Board from './Board'
import ControlPanel from './ControlPanel'
import { API_URL } from '../../config'

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

    let { uuid } = useParams();

    const { token, deleteToken }  = props;

    const [match, setMatch] = React.useState(null);

    useEffect(() => {
      if(uuid != null && match == null){
        let resStatus = 0;
        const requestOptions = {
            method: 'GET',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`
            },
        };
        fetch(`${API_URL}/matches/${uuid}`, requestOptions)
        .then(response => {
            resStatus = response.status;
            return response.json()
        })
        .then(response => {
          console.log(response);
            switch (resStatus) {
                case 200:
                    setMatch(response)
                    break;
                case 400:
                    console.log(response);
                    let errors = [];
                    for (var k in response) {
                        if (response[k].length > 0){
                            if (k === "non_field_errors"){
                                console.error(response[k][0])
                            }
                            else{
                              console.error(`${k}: ${response[k][0]}`)
                            }
                            
                        }
                    }
                    console.error(errors)
                    break
                case 500:
                  console.error(['Server error, try again'])
                    break
                default:
                  console.error(['Unknown error, try again'])
                  break
            }
        })
        .catch(err => {
            console.error(err)
        })

      }
  }, [uuid, match, token]);

    return (
        token ? (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={false} sm={4} md={9} className={classes.board}>
                    <Board match={match}></Board>
                </Grid>
                <Grid item xs={12} sm={8} md={3} component={Paper} elevation={6} square>
                    <ControlPanel token={token} deleteToken={deleteToken}></ControlPanel>
                </Grid>
            </Grid>
        ) :
        (
            <Redirect to="/account/login" /> 
        )
    )
}

export default Match;