import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  IconButton
} from '@material-ui/core';
import NewGameDialog from "./NewGameDialog";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FiberNewIcon from '@material-ui/icons/FiberNew';

const useStyles = makeStyles((theme) => ({
  root: {
  },
}));


const ControlPanel = (props) => {

    const classes = useStyles();

    const [openNewGameDialog, setOpenNewGameDialog] = React.useState(false);

    const { token, deleteToken } = props;


    return (
      <div className={classes.root}>
          <List component="nav" aria-label="main mailbox folders">
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <AccountCircleIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteToken()}>
                  <ExitToAppIcon  />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Divider />
            <ListItem button onClick={() => setOpenNewGameDialog(true)}>
              <ListItemIcon>
                <FiberNewIcon />
              </ListItemIcon>
              <ListItemText primary="New game" />
            </ListItem>
          </List>
          <NewGameDialog token={token} open={openNewGameDialog} setOpen={setOpenNewGameDialog}/>
      </div>
    )
}

export default ControlPanel;