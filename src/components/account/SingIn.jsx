import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { 
    Avatar,
    Button,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { Link, withRouter } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { useForm } from "react-hook-form";
import { API_URL } from "../../config";

const SingIn = (props) => {

    const { classes, history } = props;

    const { register, errors, handleSubmit } = useForm();

    const [errorMessage, setErrorMessage] = React.useState([]);

    const onSubmit = data => {
        setErrorMessage([])
        let resStatus = 0;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch(`${API_URL}/users/login/`, requestOptions)
        .then(response => {
            resStatus = response.status;
            return response.json()
        })
        .then(response => {
            switch (resStatus) {
                case 201:
                    localStorage.setItem('token', response.access_token);
                    history.push("/");
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
        <Fragment>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            {
                errorMessage.length > 0 &&
                errorMessage.map(message => 
                        <Typography key={message} align='left' color='error' component="h5">
                            {message}
                        </Typography>
                )
            }
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={false} sm={12} md={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register({ required: "Username is required" })}
                            fullWidth
                            label="Username"
                            name="username"
                            autoFocus
                        />
                        {errors.username && errors.username.message}
                    </Grid>
                    <Grid item xs={false} sm={12} md={12}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            inputRef={register({ required: "Password is required" })}
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                        />
                        {errors.password && errors.password.message}
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                        <Link to="/account/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    )
}

SingIn.propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }),
};

export default withRouter(SingIn);