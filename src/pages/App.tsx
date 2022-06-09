import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "../components/Todolist/AddItemForm";
import {Container} from '@material-ui/core';
import {v1} from "uuid";
import {addTodolist, setTodo} from "../store/todolist-reducer";
import {Header} from "../components/Todolist/Header";
import {Todolists} from "../components/Todolist/TodoLists";
import {useDispatch} from "react-redux";


const App = React.memo(() => {


    const dispatch = useDispatch<any>()
    console.log('App')

    const dispatchAddTodolist = useCallback((title: string) => {
        dispatch(addTodolist(v1(), title))
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodo())
    }, [])

    return (
        <div>
            <Header/>

            <Container fixed>

                <AddItemForm dispatch={dispatchAddTodolist}/>

                <Todolists/>

            </Container>
        </div>
    );
})

export default App;



