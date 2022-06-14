import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from "../components/Todolist/AddItemForm";
import {Container} from '@material-ui/core';
import {addTodolistTC, setTodo} from "../store/todolist-reducer";
import {Header} from "../components/Todolist/Header";
import {Todolists} from "../components/Todolist/TodoLists";
import {useDispatch} from "react-redux";
import {Snackbars} from "../components/appForTodo/Snackbar";
import LinearIndeterminate from "../components/appForTodo/LinarLoading";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../components/login/login";


const App = React.memo(() => {
    const dispatch = useDispatch<any>()

    const dispatchAddTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(setTodo())
    }, [])

    return (
        <BrowserRouter>
            <div>
                <Header/>
                <LinearIndeterminate/>
                <Container fixed>
                    <Routes>
                        <Route path={"/"} element={<><AddItemForm dispatch={dispatchAddTodolist}/><Todolists/></>}/>
                        <Route path={"/login"} element={<Login/>}/>
                    </Routes>
                </Container>
                <Snackbars/>
            </div>
        </BrowserRouter>
    );
})

export default App;



