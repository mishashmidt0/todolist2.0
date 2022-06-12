import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import s from "./style.module.css"
import {useSelector} from "react-redux";
import {storeType} from "../../store/redux";


export default function LinearIndeterminate() {
    const loading = useSelector<storeType>(state => state.app.loading)

    return (
        <div className={s.loading}>
            {loading === "loading" && <Box sx={{width: '100%'}}>
                <LinearProgress/>
            </Box>}

        </div>
    );
}
