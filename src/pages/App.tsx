import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "../components/Todolist/AddItemForm";
import {Container} from '@material-ui/core';
import {addTodolistTC} from "../store/todolist-reducer";
import {Header} from "../components/Todolist/Header";
import {Todolists} from "../components/Todolist/TodoLists";
import {useDispatch, useSelector} from "react-redux";
import {Snackbars} from "../components/appForTodo/Snackbar";
import LinearIndeterminate from "../components/appForTodo/LinarLoading";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Login} from "../components/login/login";
import {storeType} from "../store/redux";
import {initializeAppTC} from "../store/app-reducer";
import {Preloader} from "../components/Todolist/Preloader";


const App = React.memo(() => {
    const inInitialized = useSelector<storeType>(state => state.app.initialized)
    const dispatch = useDispatch<any>()

    const dispatchAddTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])


    if (!inInitialized) {
        return <Preloader/>
    }

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



