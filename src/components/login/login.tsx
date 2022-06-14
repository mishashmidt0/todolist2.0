import React from 'react';
import {FormControl, FormGroup, FormLabel, Grid, TextField, FormControlLabel, Checkbox, Button} from "@mui/material";
import {useFormik} from "formik";

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        onSubmit: values => {
            alert(JSON.stringify(values))
        }
    })

    return (

        <Grid container justifyContent={"center"}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            To log on get registered here
                            <br/>
                            or use common test account credentials:
                            <br/>
                            Email: free@gmail.com
                            <br/>
                            Password: free
                        </FormLabel>
                        <FormGroup>
                            <TextField label="Email" variant="standard" {...formik.getFieldProps("email")}/>
                            <TextField label="Password" variant="standard"  {...formik.getFieldProps("password")}/>
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

