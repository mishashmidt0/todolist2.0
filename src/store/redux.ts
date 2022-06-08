import {combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";


const reducers = combineReducers({
    taskReducer,
    todolistReducer,
})


export const store = createStore(reducers)

export type storeType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
