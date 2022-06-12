import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, {AlertProps} from '@mui/material/Alert';
import {changeStatus, coverType, statusType} from "../../store/app-reducer";
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
    const app = useSelector<storeType, SnackbarsType>(state => state.app)

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(changeStatus({status: "inq"}))
    };


    return (
        <Snackbar open={app.status == "ready"} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
            <Alert onClose={handleClose} severity={app.cover} sx={{width: '100%'}}>
                {app.message}
            </Alert>
        </Snackbar>
    );
}
