import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "../components/Todolist/AddItemForm";
import {Container} from '@material-ui/core';
import {addTodolistTC, setTodo} from "../store/todolist-reducer";
import {Header} from "../components/Todolist/Header";
import {Todolists} from "../components/Todolist/TodoLists";
import {useDispatch} from "react-redux";
import Snackbars from "../components/appForTodo/Snackbar";


const App = React.memo(() => {
    const dispatch = useDispatch<any>()

    const dispatchAddTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodo())
    }, [])

    return (
        <div>
            <Header/>

            <Snackbars/>

            <Container fixed>

                <AddItemForm dispatch={dispatchAddTodolist}/>

                <Todolists/>

            </Container>
        </div>
    );
})

export default App;



