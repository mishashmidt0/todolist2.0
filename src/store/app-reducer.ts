import {Dispatch} from "react";


const initialState: appStateType = {
    getTodolist: "ready",
    addTodolist: "ready",
    getTasks: "ready",
    addTask: "ready",
}

export const appReducer = (app: appStateType = initialState, action: appReducer): appStateType => {

    switch (action.type) {
        case "STATUS-TODOLIST":
            return {...app, ...action.model}
        case "STATUS-TASK":
            return {...app, ...action.model}
        default:
            return app
    }
}
// action
export const getStatusTodolist = (model: appStateModelType) => ({type: "STATUS-TODOLIST", model} as const)
export const getStatusTask = (model: appStateModelType) => ({type: "STATUS-TASK", model} as const)

// thunk
export const setTaskTC = (todolistId: string) => {
    return (dispatch: any) => {
        // taskAPI.getTasks(todolistId)
        //     .then(res => {
        //         dispatch(setTasks(todolistId, res.data.items))
        //     })
    }
}

// type
type statusType = "inq" | "loading" | "ready" | "error"
export type appStateType = {
    getTodolist: statusType,
    addTodolist: statusType,
    getTasks: statusType,
    addTask: statusType,
}
export type appStateModelType = {
    getTodolist?: statusType,
    addTodolist?: statusType,
    getTasks?: statusType,
    addTask?: statusType,
}

export type appReducer =
    | ReturnType<typeof getStatusTodolist>
    | ReturnType<typeof getStatusTask>



