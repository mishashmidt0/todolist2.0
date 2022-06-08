import {v1} from "uuid";
import {AddTodolist, RemoveTodolist} from "./todolist-reducer";

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
                    title: action.title as string,
                    isDone: false
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
        case "REMOVE-TODOLIST":
            const stateCope = {...task}
            delete stateCope[action.id]
            return {
                ...stateCope
            }
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

// type
export type PropsStyleForTask = {
    id: string,
    title: string,
    isDone: boolean
}
export type tasksStateType = { [key: string]: PropsStyleForTask[] };
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
    | AddTodolist
    | RemoveTodolist
    | filterTypeTask;
