import React from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    TextField,
    Typography,
} from '@material-ui/core';
import Draggable from 'react-draggable';
import { useForm } from "react-hook-form";
import {
    API_URL,
    BOARD_MINES_DEFAULT,
    BOARD_WIDTH_DEFAULT,
    BOARD_HEIGHT_DEFAULT,
    BOARD_MIN_WIDTH,
    BOARD_MAX_WIDTH,
    BOARD_MIN_HEIGHT,
    BOARD_MAX_HEIGHT,
} from '../../config'
import { withRouter } from 'react-router-dom';

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function NewGameDialog(props) {

  const { token, open, setOpen, history } = props;
  const { register, errors, handleSubmit, getValues } = useForm();
  const [errorMessage, setErrorMessage] = React.useState([]);

  const onSubmit = data => {
    setErrorMessage([])
    let resStatus = 0;
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`
        },
        body: JSON.stringify(data),
    };
    fetch(`${API_URL}/matches/`, requestOptions)
    .then(response => {
        resStatus = response.status;
        return response.json()
    })
    .then(response => {
        switch (resStatus) {
            case 201:
                history.push(`/match/${response.uuid}`);
                setOpen(false)
                break;
            case 400:
                console.log(response);
                let errors = [];
                for (var k in response) {
                    if (response[k].length > 0){
                        if (k === "non_field_errors"){
                            errors.push(response[k][0])
                        }
                        else{
                            errors.push(`${k}: ${response[k][0]}`)
                        }
                        
                    }
                }
                setErrorMessage(errors)
                break
            case 500:
                setErrorMessage(['Server error, try again'])
                break
            default:
                setErrorMessage(['Unknown error, try again'])
                break
        }
    })
    .catch(err => {
        console.error(err)
    })
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          New game
        </DialogTitle>
        <DialogContent>
            <Grid container>
                <Grid item xs={false} sm={12} md={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ 
                            required: "Width is required",
                            validate: (value) => {
                                if (value < BOARD_MIN_WIDTH) {
                                    return `Width value must be greater than ${BOARD_MIN_WIDTH}`;
                                } else {
                                    if (value > BOARD_MAX_WIDTH){
                                        return `Width value must be less than ${BOARD_MAX_WIDTH}`;
                                    }
                                    else{
                                        return true;
                                    }
                                }
                            }, 
                        })}
                        type="number"
                        fullWidth
                        defaultValue={BOARD_WIDTH_DEFAULT}
                        label="Width"
                        name="width"
                    />
                    {errors.width && errors.width.message}
                </Grid>
                <Grid item xs={false} sm={12} md={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ 
                            required: "Height is required", 
                            validate: (value) => {
                                if (value < BOARD_MIN_HEIGHT) {
                                    return `Height value must be greater than ${BOARD_MIN_HEIGHT}`;
                                } else {
                                    if (value > BOARD_MAX_HEIGHT){
                                        return `Height value must be less than ${BOARD_MAX_HEIGHT}`;
                                    }
                                    else{
                                        return true;
                                    }
                                }
                            },  
                        })}
                        fullWidth
                        name="height"
                        label="Height"
                        type="number"
                        defaultValue={BOARD_HEIGHT_DEFAULT}
                    />
                    {errors.height && errors.height.message}
                </Grid>
                <Grid item xs={false} sm={12} md={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ 
                            required: "Mines quantity is required",
                            validate: (value) => {
                                if (value < 1) {
                                    return `There must be at least 1 mine`;
                                } else {
                                    if (value > getValues()["height"]*getValues()["width"]){
                                        return `Mines quantity value must be less than avaible spaces (${getValues()["height"]*getValues()["width"]})`;
                                    }
                                    else{
                                        return true;
                                    }
                                }
                            },  
                        })}
                        fullWidth
                        name="mines"
                        label="Mines"
                        type="number"
                        defaultValue={BOARD_MINES_DEFAULT}
                    />
                    {errors.mines && errors.mines.message}
                </Grid>
            </Grid>
            {
                errorMessage.length > 0 &&
                errorMessage.map(message => 
                        <Typography key={message} align='left' color='error' component="h5">
                            {message}
                        </Typography>
                )
            }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Create
          </Button>
        </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

NewGameDialog.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
};

export default withRouter(NewGameDialog);