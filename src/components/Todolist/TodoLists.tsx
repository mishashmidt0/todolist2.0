import React, {useCallback} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todo} from "./Todo";
import {useSelector} from "react-redux";
import {storeType} from "../../store/redux";
import {TodolistType} from "../../store/todolist-reducer";


export const Todolists = React.memo(() => {

    const todolists = useSelector<storeType, Array<TodolistType>>((store) => store.todolistReducer)
    const renderTodolists = useCallback(() => {
        return todolists.map((todolist) => {
            return (
                <Grid item key={todolist.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todo todolistId={todolist.id} title={todolist.title} disable={todolist.editableStatus === "loading"}/>
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
