import React, {useCallback} from "react";
import {AppBar, Button, IconButton, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../store/redux";
import {logoutTC} from "../login/auth-reducer";
import {Dispatch} from "redux";


export const Header = React.memo(() => {
    const isLoggedIn = useSelector<storeType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<Dispatch<any>>()
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Typography variant="h6">
                    News
                </Typography>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
            </Toolbar>

        </AppBar>
    )
})
