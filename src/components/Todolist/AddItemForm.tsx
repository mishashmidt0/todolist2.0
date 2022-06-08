import React, {useState} from "react";
import {Grid, IconButton, TextField} from "@material-ui/core";
import {ControlPoint} from "@material-ui/icons";



export const AddItemForm = React.memo(({ dispatch}: any) => {

    console.log('AddItemForm')

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
            />

            <IconButton onClick={addTask} color={'primary'}><ControlPoint/></IconButton>
        </Grid>
    </div>);
})
