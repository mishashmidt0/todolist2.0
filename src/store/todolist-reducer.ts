import {PropsTypeForFilter, TidolistType} from "../types/PropsStyle";
import {todolistId1, todolistId2} from "./tasks-reducer";


export type RemoveTodolistAT = {
    type: "REMOVE-TODOLIST"
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: PropsTypeForFilter
}
export type todolistReducerAT = ChangeTodolistFilterAT | ChangeTodolistTitleAT | AddTodolistAT | RemoveTodolistAT;

const initialState: Array<TidolistType> = [
    {id: todolistId1, title: 'My skills', filter: 'all'},
    {id: todolistId2, title: 'My skills in programm framwork', filter: 'all'},
]
export const todolistReducer = (todolist: Array<TidolistType> = initialState, action: todolistReducerAT): Array<TidolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolist.filter((e) => e.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all'}, ...todolist]

        case 'CHANGE-TODOLIST-TITLE':
            return [...todolist.map((e) => e.id === action.id ? {...e, title: action.title as string} : e)]
        case 'CHANGE-TODOLIST-FILTER':
            return todolist.map((e) => e.id === action.id ? {
                ...e,
                filter: action.filter as PropsTypeForFilter
            } : e)
        default:
            return todolist
    }
}

export const removeTodolistAC = (id: string): RemoveTodolistAT => {
    return {type: "REMOVE-TODOLIST", id}
}

export const addTodolistAC = (id: string, title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title, id}
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleAT => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}

export const changeTodolistFilterAC = (id: string, filter: PropsTypeForFilter): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
