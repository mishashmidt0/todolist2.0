import {v1} from "uuid";
import {AddTodolist, RemoveTodolist, setAllTodo} from "./todolist-reducer";
import {Dispatch} from "react";
import taskAPI, {TaskType} from "../api/tasks-api";
import {storeType} from "./redux";

const initialState: tasksStateType = {}
export const taskReducer = (task: tasksStateType = initialState, action: taskReducerAT): tasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {...task, [action?.todolistId]: task[action.todolistId].filter((e) => e.id !== action.taskId)}
        case 'ADD-TASK':
            return {
                ...task,
                [action.task.todoListId]: [action.task, ...task[action.task.todoListId]]
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
            return {...task, [action.idTodolist]: [...action.tasks]}
        default:
            return task
    }
}
// action
export const removeTaskAC = (todolistId: string, taskId: string) => ({type: "REMOVE-TASK", todolistId, taskId} as const)
export const addTaskAC = (task: TaskType) => ({type: 'ADD-TASK', task} as const)
export const changeTaskTitleAC = (idTodolist: string, id: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    idTodolist,
    id,
    title
} as const)
export const updateTask = (todolistId: string, taskId: string, task: TaskDomainType) => ({
    type: 'UPDATE-TASK',
    todolistId,
    taskId,
    task
} as const)
export const setTasks = (idTodolist: string, tasks: TaskType[]) => ({type: 'SET-TASKS', idTodolist, tasks} as const)


// thunk
export const setTaskTC = (todolistId: string) => {
    return (dispatch: Dispatch<taskReducerAT>) => {
        taskAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasks(todolistId, res.data.items))
            })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch<taskReducerAT>) => {
        taskAPI.addTask(title, todolistId)
            .then(res => {
                const task = res.data.data.item
                dispatch(addTaskAC(task))
            })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<taskReducerAT>) => {
        taskAPI.deleteTask(todolistId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todolistId, taskId))
            })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, model: TaskDomainType) => {
    return (dispatch: Dispatch<taskReducerAT>, getState: () => storeType) => {
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
                console.log(res)
                dispatch(updateTask(todolistId, taskId, res.data.data.item))
            })
    }
}
// type
export type TaskDomainType = {
    description?: string,
    title?: string,
    status?: number,
    priority?: number,
    startDate?: string,
    deadline?: string,
}
export type tasksStateType = { [key: string]: TaskType[] };
export type filterTypeTask = {
    type: 'FILTER-TASK'
    filter: 'all' | 'active' | 'completed'
    todolistId: string
}
export type taskReducerAT =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof setTasks>
    | AddTodolist
    | RemoveTodolist
    | filterTypeTask


