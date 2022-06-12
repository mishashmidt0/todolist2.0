import React, {useState} from "react";
import {Grid, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";

type AddItemFormType = {
    dispatch: any,
    disable?: boolean
}
export const AddItemForm = React.memo(({dispatch, disable = false}: AddItemFormType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState('');


    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('');
        setTitle(e.currentTarget.value);
    };

    const addTask = () => {
        if (title.trim() === '') {
            setError('Error, can`t add empty task');
            return;
        }
        dispatch(title)
        setTitle('');
    };

    const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') addTask();
    };


    return (<div>

        <Grid container style={{padding: '20px'}}>

            <TextField
                value={title}
                variant={'outlined'}
                label={'Title'}
                onChange={onChangeText}
                onKeyPress={onKeyPress}
                error={!!error}
                helperText={error}
                disabled={disable}
            />
            <IconButton onClick={addTask} color="primary" disabled={disable}><ControlPoint/></IconButton>
        </Grid>
    </div>);
})
