import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {coverType, getStatusTodolist, statusType} from "../../store/app-reducer";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../store/redux";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type SnackbarsType = {
    status: statusType,
    message: string,
    cover?: coverType
}

export function Snackbars() {
    const dispatch = useDispatch()
    const todolist = useSelector<storeType, SnackbarsType>(state => state.app.todolist)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(getStatusTodolist("inq"))
    };

    return (
        <Snackbar open={todolist.status == "ready"} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={todolist.cover} sx={{width: '100%'}}>
                {todolist.message}
            </Alert>
        </Snackbar>
    );
}
