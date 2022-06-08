import React, {useCallback} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {storeType} from "../../store/redux";

export type TodolistType = {
    id: string,
    title: string,
    filter: 'all' | 'active' | 'completed';
}

export const Wrapper = React.memo(() => {
    const todolists = useSelector<storeType, Array<TodolistType>>((store) => store.todolistReducer)
    console.log('Wrapper')

    return <Todolists todolists={todolists}/>
});

type todolistsPropsType = {
    todolists: Array<TodolistType>
}


const Todolists = React.memo(({todolists}: todolistsPropsType) => {
    console.log('Todolists')

    const renderTodolists = useCallback(() => {
        return todolists.map((todolist) => {
            return (
                <Grid item key={todolist.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist todolistId={todolist.id} title={todolist.title}/>
                    </Paper>
                </Grid>)
        })
    }, [todolists])

    return (
        <Grid container spacing={5}>
            {todolists && renderTodolists()}
        </Grid>
    )
})
