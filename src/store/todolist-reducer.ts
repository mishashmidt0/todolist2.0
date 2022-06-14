import todoAPI from "../api/todolists-api";
import {Dispatch} from "redux";
import {changeLoading, changeStatus} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../util/handle-app-utils";

const initialState: Array<TodolistType> = []
export const todolistReducer = (todolist: Array<TodolistType> = initialState, action: todolistType): Array<TodolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolist.filter((e) => e.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all', editableStatus: "idle", addedDate: `${new Date()}`, order: 0}, ...todolist]

        case 'UPDATE-TODOLIST':
            return todolist.map((e) => e.id === action.todolistId ? {...e, title: action.title, filter: "all"} : e)

        case 'CHANGE-TODOLIST-FILTER':
            return todolist.map((tl: TodolistType) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-STATUS':
            return todolist.map((tl: TodolistType) => tl.id === action.todolistId ? {...tl, editableStatus: action.status} : tl)

        case 'SET-TODOLISTS':
            return action.state.map((tl) => ({...tl, filter: 'all', editableStatus: "idle"}))
        default:
            return todolist
    }
}

// action
export const removeTodolist = (id: string) => ({type: "REMOVE-TODOLIST", id} as const)
export const addTodolist = (id: string, title: string) => ({type: 'ADD-TODOLIST', title, id} as const)
export const updateTodolist = (todolistId: string, title: string) => ({type: 'UPDATE-TODOLIST', todolistId, title} as const)
export const changeTodolistFilter = (id: string, filter: 'all' | 'active' | 'completed') => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const changeTodolistStatus = (todolistId: string, status: "idle" | "loading") => ({
    type: 'CHANGE-TODOLIST-STATUS',
    todolistId,
    status
} as const)
export const setAllTodo = (state: Array<TodolistType>) => ({type: "SET-TODOLISTS", state} as const)

// thunk
export const setTodo = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(changeLoading("loading"))
        todoAPI.getTodo()
            .then(res => {
                dispatch(setAllTodo(res.data))
                dispatch(changeLoading("ready"))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(changeLoading("loading"))
        dispatch(changeTodolistStatus(todolistId, "loading"))
        todoAPI.deleteTodolistById(todolistId)
            .then(res => {
                dispatch(removeTodolist(todolistId))
                dispatch(changeLoading("ready"))
                dispatch(changeStatus({status: "ready", message: "Todolist deleted", cover: "info"}))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(changeLoading("loading"))
        todoAPI.addTodolist(title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(addTodolist(res.data.data.item.id, res.data.data.item.title))
                    dispatch(changeLoading("ready"))
                    dispatch(changeStatus({status: "ready", message: "Todolist added", cover: "success"}))
                } else {
                    handleServerAppError(res, dispatch)
                }
                dispatch(changeLoading("ready"))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

export const updateTodolistTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<any>) => {
        todoAPI.updateTodo(todolistId, title)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTodolist(todolistId, title))
                } else {
                    handleServerAppError(res, dispatch)
                }

            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

// type
export type TodolistType = TodolistFilterType & todolistDomainType;
type TodolistFilterType = {
    filter: 'all' | 'active' | 'completed';
    editableStatus: "idle" | "loading";
}
type todolistDomainType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}
export type AddTodolist = ReturnType<typeof addTodolist>
export type RemoveTodolist = ReturnType<typeof removeTodolist>
export type setAllTodo = ReturnType<typeof setAllTodo>
export type changeTodolistStatusType = ReturnType<typeof changeTodolistStatus>

export type todolistType =
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof updateTodolist>
    | changeTodolistStatusType
    | setAllTodo
    | AddTodolist
    | RemoveTodolist;
