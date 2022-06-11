const initialState: appStateType = {
    todolist: {
        status: "inq",
        message: "Todolist added",
        cover: "success"
    },
    task: {
        status: "inq",
        message: "Task added",
        cover: "success"
    }
}

export const appReducer = (app: appStateType = initialState, action: appReducer): appStateType => {

    switch (action.type) {
        case "STATUS-TODOLIST":
            return {...app, todolist: {...app.todolist, status: action.status}}
        case "STATUS-TASK":
            return {...app, todolist: {...app.task, status: action.status}}
        default:
            return app
    }
}
// action
export const getStatusTodolist = (status: statusType) => ({type: "STATUS-TODOLIST", status} as const)
export const getStatusTask = (status: statusType) => ({type: "STATUS-TASK", status} as const)

// type
export type statusType = "inq" | "loading" | "ready" | "error"
export type coverType = "success" | "warning" | "info" | "error"
export type appStateType = {
    todolist: {
        status: statusType,
        message: string,
        cover: coverType
    },
    task: {
        status: statusType,
        message: string,
        cover: coverType
    }
}
export type appStateModelType = {
    todolist?: {
        status: statusType,
        message: string,
        cover?: coverType
    },
    task?: {
        status: statusType,
        message: string,
        cover?: coverType
    }
}

export type appReducer =
    | ReturnType<typeof getStatusTodolist>
    | ReturnType<typeof getStatusTask>



