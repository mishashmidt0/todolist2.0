import React, {useCallback} from "react";
import {AppBar, Button, Toolbar} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../store/redux";
import {logoutTC} from "../login/auth-reducer";
import {Dispatch} from "redux";
import LogoutIcon from '@mui/icons-material/Logout';

export const Header = React.memo(() => {
    const isLoggedIn = useSelector<storeType, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch<Dispatch<any>>()
    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return (
        <AppBar position="static">
            <Toolbar>
                {isLoggedIn && <Button color="inherit" onClick={logoutHandler} endIcon={<LogoutIcon/>}>Log out</Button>}
            </Toolbar>

        </AppBar>
    )
})
