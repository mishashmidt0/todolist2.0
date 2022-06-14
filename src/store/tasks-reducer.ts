import {AddTodolist, RemoveTodolist} from "./todolist-reducer";
import {Dispatch} from "react";
import taskAPI, {TaskDBType} from "../api/tasks-api";
import {storeType} from "./redux";
import {changeLoading, changeLoadingType, changeStatus, changeStatusType} from "./app-reducer";
import {handleNetworkAppError, handleServerAppError} from "../util/handle-app-utils";

const initialState: tasksStateType = {}
export const taskReducer = (task: tasksStateType = initialState, action: taskReducerAT): tasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {...task, [action?.todolistId]: task[action.todolistId].filter((e) => e.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...task,
                [action.task.todoListId]: [{...action.task, editableStatus: "idle"}, ...task[action.task.todoListId]]
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...task,
                [action.idTodolist]: task[action.idTodolist].map(t => t.id === action.id ? {
                        ...t,
                        title: action.title
                    } : t
                )
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...task,
                [action.todolistId]: task[action.todolistId].map(t => t.id === action.taskId ? {
                        ...t,
                        editableStatus: action.status
                    } : t
                )
            }
        case 'UPDATE-TASK':
            return {
                ...task,
                [action.todolistId]: task[action.todolistId].map(t => t.id === action.taskId
                    ? {...t, ...action.task} : t
                )
            }
        case 'ADD-TODOLIST':
            return {
                ...task,
                [action.id]: []
            }
        case "REMOVE-TODOLIST": {
            const stateCope = {...task}
            delete stateCope[action.id]
            return {
                ...stateCope
            }
        }
        case 'SET-TASKS':
            return {
                ...task, [action.idTodolist]: action.tasks.map(task => ({...task, editableStatus: "idle"}))
            }
        default:
            return task
    }
}
// action
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId} as const)
export const addTaskAC = (task: TaskDBType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskTitleAC = (idTodolist: string, id: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    idTodolist,
    id,
    title
} as const)
export const changeTaskStatus = (todolistId: string, taskId: string, status: TaskStatus) => ({
    type: 'CHANGE-TASK-STATUS',
    todolistId,
    taskId,
    status
} as const)
export const updateTask = (todolistId: string, taskId: string, task: TaskDomainType) => ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    task
} as const)
export const setTasks = (idTodolist: string, tasks: TaskDBType[]) => ({type: 'SET-TASKS', idTodolist, tasks} as const)


// thunk
export const setTaskTC = (todolistId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(changeLoading("loading"))
        taskAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasks(todolistId, res.data.items))
                dispatch(changeLoading("ready"))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(changeLoading("loading"))
        taskAPI.addTask(title, todolistId)
            .then(res => {
                if (res.data.resultCode === 0) {
                    const task = res.data.data.item
                    dispatch(addTaskAC(task))
                    dispatch(changeStatus({status: "ready", message: "Task added", cover: "success"}))
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

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: ThunkDispatchType) => {
        dispatch(changeTaskStatus(todolistId, taskId, "loading"))
        dispatch(changeLoading("loading"))
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
                dispatch(changeStatus({status: "ready", message: "Task deleted", cover: "info"}))
                dispatch(changeLoading("ready"))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: TaskDomainType) => {
    return (dispatch: ThunkDispatchType, getState: () => storeType) => {
        const task = getState().taskReducer[todolistId].filter(t => t.id === taskId)[0]
        const newTask = {
            description: task.description,
            title: task.title,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...model
        }
        taskAPI.updateTask(todolistId, taskId, newTask)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTask(todolistId, taskId, res.data.data.item))
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
export type ThunkDispatchType = Dispatch<taskReducerAT | changeStatusType | changeLoadingType>
export type TaskDomainType = {
    description?: string,
    title?: string,
    status?: number,
    priority?: number,
    startDate?: string,
    deadline?: string,
}
type TaskStatus = "idle" | "loading"
export type TaskType = TaskDBType & { editableStatus: TaskStatus }
export type tasksStateType = { [key: string]: TaskType[] };
export type filterTypeTask = {
    type: 'FILTER-TASK'
    filter: 'all' | 'active' | 'completed'
    todolistId: string
}
export type  changeTaskStatusType = ReturnType<typeof changeTaskStatus>
export type taskReducerAT =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>
    | AddTodolist
    | RemoveTodolist
    | filterTypeTask
    | changeTaskStatusType


