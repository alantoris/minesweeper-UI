import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { 
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListSubheader,
} from '@material-ui/core';
import { API_URL } from '../../config';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import ReplayIcon from '@material-ui/icons/Replay';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';


var matchesIcons = {
    'SC': {
        'icon': <CheckCircleOutlineIcon />,
        'color': 'green',
        'descrip': 'Success',
    },
    'FA': {
        'icon': <CancelIcon />,
        'color': 'red',
        'descrip': 'Failed',
    },
    'IP': {
        'icon': <ReplayIcon />,
        'color': 'blue',
        'descrip': 'In progress',
    },
}

const MatchesList = (props) => {

    const { token, history } = props;

    const [matches, setMatches] = React.useState([]);

    useEffect(() => {
          let resStatus = 0;
          const requestOptions = {
              method: 'GET',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
              },
          };
          fetch(`${API_URL}/matches`, requestOptions)
          .then(response => {
              resStatus = response.status;
              return response.json()
          })
          .then(response => {
            console.log(response);
              switch (resStatus) {
                  case 200:
                        setMatches(response.results)
                      break;
                  case 400:
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
    }, [token]);

    const resumeMatch = (uuid) => {
        history.push(`/match/${uuid}`);
    }

    return (
        <div>
          <List 
            component="nav" 
            aria-label="main mailbox folders" 
            subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                    Matches
                </ListSubheader>
            }
        >
            { matches.map(match =>
                <ListItem key={match.uuid}>
                    <ListItemAvatar style={{color: matchesIcons[match.state].color}}>
                        {matchesIcons[match.state].icon}
                    </ListItemAvatar>
                    <Moment format="YYYY/MM/DD HH:mm">{match.created}</Moment>
                    
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete" onClick={() => resumeMatch(match.uuid)}>
                            Resume
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            )}
            
        </List>
      </div>
    )
}

MatchesList.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
};

export default withRouter(MatchesList);