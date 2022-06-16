import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField, Typography} from "@mui/material";
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./auth-reducer";
import {Dispatch} from "redux";
import {storeType} from "../../store/redux";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const isLoggedIn = useSelector<storeType>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<Dispatch<any>>()
    const formik = useFormik({
        validate: (values) => {
            if (!values.email) return ({email: "Email is required"})
            if (!values.password) return ({password: "password is required"})
        },
        initialValues: {
            email: "free@samuraijs.com",
            password: "free",
            rememberMe: false,
        },
        onSubmit: values => {
            dispatch(loginTC(values))
        }
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }
    return (
        <Grid container justifyContent={"center"}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <Typography variant={"subtitle2"} gutterBottom component="div"> To log on get registered here <br/>or use common test account
                                credentials:</Typography>
                            <Typography variant={"subtitle2"} gutterBottom component="div"> Email: free@samuraijs.com</Typography>
                            <Typography variant={"subtitle2"} gutterBottom component="div">Password: free</Typography>
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" variant="standard" {...formik.getFieldProps("email")} />
                            {formik.errors.email && <div>{formik.errors.email}</div>}

                            <TextField label="Password" variant="standard"  {...formik.getFieldProps("password")} type={"password"}/>
                            {formik.errors.password && formik.touched.password && formik.errors.password}

                            <FormControlLabel label="Remember me" control={
                                <Checkbox {...formik.getFieldProps("rememberMe")} checked={formik.values.rememberMe}/>}/>
                            <Button type={"submit"} variant={"contained"} color={"primary"}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>

    );
};

