import React, { Fragment } from 'react';
import { 
    Avatar,
    Button,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { API_URL } from "../../config";

const SingUp = (props) => {

    const { classes } = props;

    const [errorMessage, setErrorMessage] = React.useState([]);
    const [successMessage, setSuccessMessage] = React.useState([]);

    const { register, errors, handleSubmit, getValues } = useForm();

    const onSubmit = data => {
        setSuccessMessage([])
        setErrorMessage([])
        let resStatus = 0
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        };
        fetch(`${API_URL}/users/signup/`, requestOptions)
            .then(response => {
                resStatus = response.status
                return response.json()
            })
            .then(response => {
                switch (resStatus) {
                    case 201:
                        setSuccessMessage(['Account created. Sign in with your new credentials'])
                        break
                    case 400:
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
                console.error(err);
            })
    }

    return (
        <Fragment>
            <Avatar className={classes.avatar}>
                <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            {
                errorMessage.length > 0 ?
                errorMessage.map(message => 
                        <Typography key={message} align='left' color='error' component="h5">
                            {message}
                        </Typography>
                ) : (
                    successMessage.length > 0 &&
                    successMessage.map(message =>
                            <Typography key={message} align='left' component="h5">
                                {message}
                            </Typography>
                        )
                )
            }
            
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={false} sm={6} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ required: "Email is required" })}
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoFocus
                    />
                    {errors.email && errors.email.message}
                    </Grid>
                    <Grid item xs={false} sm={6} md={6}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        inputRef={register({ required: "Username is required" })}
                        fullWidth
                        label="Username"
                        name="username"
                    />
                    {errors.username && errors.username.message}
                    </Grid>                    
                </Grid>
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
                <TextField
                    variant="outlined"
                    margin="normal"
                    inputRef={register({ 
                            required: "Repeat the password here", 
                            validate: (value) => {
                                if (value === getValues()["password"]) {
                                    return true;
                                } else {
                                    return "The passwords do not match";
                                }
                            }, 
                        })}
                    fullWidth
                    name="password_confirmation"
                    label="Repeat Password"
                    type="password"
                />
                {errors.password_confirmation && errors.password_confirmation.message}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                >
                    Sign Up
                </Button>
                <Grid container>
                    <Grid item xs>
                    </Grid>
                    <Grid item>
                        <Link to="/account/login" variant="body2">
                        {"Do you already have an account? Sign In"}
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </Fragment>
    )
}

export default SingUp;