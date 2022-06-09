import todoAPI from "../api/todolists-api";
import {Dispatch} from "redux";
import {setTaskCT, setTasks, taskReducerAT} from "./tasks-reducer";

const initialState: Array<TodolistType> = []
export const todolistReducer = (todolist: Array<TodolistType> = initialState, action: todolistType): Array<TodolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolist.filter((e) => e.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all', addedDate: `${new Date()}`, order: 0}, ...todolist]
        case 'CHANGE-TODOLIST-TITLE':
            return [...todolist.map((e) => e.id === action.id ? {...e, title: action.title as string} : e)]
        case 'CHANGE-TODOLIST-FILTER':
            return todolist.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'SET-TODOLISTS':
            return action.state.map((tl) => ({...tl, filter: 'all'}))
        default:
            return todolist
    }
}

// action
export const removeTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolist = (id: string, title: string) => ({type: 'ADD-TODOLIST', title, id} as const)
export const changeTodolistTitle = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilter = (id: string, filter: 'all' | 'active' | 'completed') => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setAllTodo = (state: Array<TodolistType>) => ({type: "SET-TODOLISTS", state} as const)

// thunk
export const setTodo = () => {
    return (dispatch: Dispatch<any>) => {
        todoAPI.getTodo()
            .then(res => {
                dispatch(setAllTodo(res.data))
            })
    }
}

// type
export type TodolistType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
    filter: 'all' | 'active' | 'completed';
}
export type AddTodolist = ReturnType<typeof addTodolist>
export type RemoveTodolist = ReturnType<typeof removeTodolist>
export type setAllTodo = ReturnType<typeof setAllTodo>

export type todolistType =
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistTitle>
    | setAllTodo
    | AddTodolist
    | RemoveTodolist;
