import {v1} from "uuid";
import {AddTodolist, RemoveTodolist, setAllTodo} from "./todolist-reducer";
import {Dispatch} from "react";
import taskAPI, {TaskType} from "../api/tasks-api";

const initialState: tasksStateType = {}
export const taskReducer = (task: tasksStateType = initialState, action: taskReducerAT): tasksStateType => {

    switch (action.type) {
        case "REMOVE-TASK":
            return {...task, [action?.idTodolist]: task[action.idTodolist].filter((e) => e.id !== action.id)}
        case 'ADD-TASK':
            return {
                ...task,
                [action.idTodolist]: [{
                    id: v1(),
                    description: '',
                    title: action.title,
                    completed: false,
                    status: 0,
                    priority: 0,
                    startDate: '',
                    deadline: "",
                    todoListId: action.idTodolist,
                    addedDate: '',
                    order: 0,
                }, ...task[action.idTodolist]]
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
        case 'CHANGE-TASK-FILTER':
            return {
                ...task,
                [action.idTodolist]: task[action.idTodolist].map(t => t.id === action.id ? {
                        ...t,
                        isDone: action.isDone
                    } : t
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
export const removeTaskAC = (id: string, idTodolist: string) => ({type: "REMOVE-TASK", id, idTodolist} as const)
export const addTaskAC = (idTodolist: string, title: string) => ({type: 'ADD-TASK', idTodolist, title} as const)
export const changeTaskTitleAC = (idTodolist: string, id: string, title: string) => ({
    type: 'CHANGE-TASK-TITLE',
    idTodolist,
    id,
    title
} as const)
export const changeTaskStatusAC = (idTodolist: string, id: string, isDone: boolean) => ({
    type: 'CHANGE-TASK-FILTER',
    idTodolist,
    id,
    isDone
} as const)
export const setTasks = (idTodolist: string, tasks: TaskType[]) => ({type: 'SET-TASKS', idTodolist, tasks} as const)


// thunk
export const setTaskCT = (todolistId: string) => {
    return (dispatch: Dispatch<taskReducerAT>) => {
        taskAPI.getTasks(todolistId)
            .then(res => {
                dispatch(setTasks(todolistId, res.data.items))
            })
    }
}

// type

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
    | ReturnType<typeof changeTaskStatusAC>
    | ReturnType<typeof setTasks>
    | AddTodolist
    | RemoveTodolist
    | filterTypeTask


