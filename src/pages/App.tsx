import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "../components/Todolist/AddItemForm";
import {Container} from '@material-ui/core';
import {v1} from "uuid";
import {addTodolistAC} from "../store/todolist-reducer";
import {Header} from "../components/Todolist/Header";
import {Wrapper} from "../components/Todolist/Wrapper";
import {useDispatch} from "react-redux";


const App = React.memo(() => {
    const dispatch = useDispatch()
    console.log('App')

    const dispatchAddTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(v1(), title))
    }, [dispatch])


    return (
        <div>
            <Header/>

            <Container fixed>

                <AddItemForm dispatch={dispatchAddTodolist}/>

                <Wrapper/>

            </Container>
        </div>
    );
})

export default App;



