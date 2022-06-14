import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todo} from "./Todo";
import {useDispatch, useSelector} from "react-redux";
import {storeType} from "../../store/redux";
import {setTodo, TodolistType} from "../../store/todolist-reducer";
import {Navigate} from "react-router-dom";


export const Todolists = React.memo(() => {
    const isLoggedIn = useSelector<storeType>(state => state.auth.isLoggedIn)
    const todolists = useSelector<storeType, Array<TodolistType>>((store) => store.todolistReducer)
    const dispatch = useDispatch<any>()


    useEffect(() => {
        dispatch(setTodo())
    }, [])


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

    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    return (
        <Grid container spacing={5}>
            {todolists && renderTodolists()}
        </Grid>
    )
})
