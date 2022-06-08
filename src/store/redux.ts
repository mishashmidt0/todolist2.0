import {combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import {itemReducer} from "./change-reducer";


const reducers = combineReducers({
    taskReducer,
    todolistReducer,
    itemReducer,
})


export const store = createStore(reducers)

export type storeType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
