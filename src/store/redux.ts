import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";


const reducers = combineReducers({
    taskReducer,
    todolistReducer,
    app:appReducer,
})


export const store = createStore(reducers, applyMiddleware(thunk))

export type storeType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
