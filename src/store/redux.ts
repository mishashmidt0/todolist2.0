import {applyMiddleware, combineReducers, createStore} from "redux";
import {taskReducer} from "./tasks-reducer";
import {todolistReducer} from "./todolist-reducer";
import thunk from "redux-thunk";


const reducers = combineReducers({
    taskReducer,
    todolistReducer,
})


export const store = createStore(reducers, applyMiddleware(thunk))

export type storeType = ReturnType<typeof reducers>

// @ts-ignore
window.store = store
