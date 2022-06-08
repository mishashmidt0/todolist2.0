import {PropsStyleForTask} from "../types/PropsStyle";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolist-reducer";

const removeTask = "REMOVE-TASK"
const removeTodolist = "REMOVE-TODOLIST"
const addTask = 'ADD-TASK'
const addTodolist = 'ADD-TODOLIST'
const changeTitleTask = 'CHANGE-TASK-TITLE'
const changeStatus = 'CHANGE-TASK-FILTER'

export type RemoveTaskAT = {
    type: "REMOVE-TASK"
    id: string
    idTodolist: string
}
export type AddTaskAT = {
    type: 'ADD-TASK'
    idTodolist: string
    title: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    idTodolist: string
    id: string
    title: string
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-FILTER'
    idTodolist: string
    id: string
    isDone: boolean
}
export type tasksStateType = { [key: string]: PropsStyleForTask[] };
export type filterTypeTask = {
    type: 'FILTER-TASK'
    filter: 'all' | 'active' | 'completed'
    todolistId: string
}
export type taskReducerAT =
    RemoveTaskAT
    | AddTaskAT
    | ChangeTaskTitleAT
    | ChangeTaskStatusAT
    | AddTodolistAT
    | RemoveTodolistAT
    | filterTypeTask;

export const todolistId1 = v1();
export const todolistId2 = v1();
const initialState: tasksStateType = {
    [todolistId1]: [
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'TypeScrypt', isDone: false},
        {id: v1(), title: 'JavaScrypt', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: true},
    ],
    [todolistId2]: [
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Angular', isDone: false},
        {id: v1(), title: 'Vue', isDone: false},
    ],

}
export const taskReducer = (task: tasksStateType = initialState, action: taskReducerAT): tasksStateType => {
    switch (action.type) {
        case removeTask:
            return {...task, [action.idTodolist]: task[action.idTodolist].filter((e) => e.id !== action.id)}
        case addTask:
            return {
                ...task,
                [action.idTodolist]: [{
                    id: v1(),
                    title: action.title as string,
                    isDone: false
                }, ...task[action.idTodolist]]
            }
        case changeTitleTask:
            return {
                ...task,
                [action.idTodolist]: task[action.idTodolist].map(t => t.id === action.id ? {
                        ...t,
                        title: action.title
                    } : t
                )
            }
        case changeStatus:
            return {
                ...task,
                [action.idTodolist]: task[action.idTodolist].map(t => t.id === action.id ? {
                        ...t,
                        isDone: action.isDone
                    } : t
                )
            }
        case addTodolist:
            return {
                ...task,
                [action.id]: []
            }
        case removeTodolist:
            const stateCope = {...task}
            delete stateCope[action.id]
            return {
                ...stateCope
            }
        default:
            return task
    }
}

export const removeTaskAC = (id: string, idTodolist: string): RemoveTaskAT => {
    return {type: removeTask, id, idTodolist}
}
export const addTaskAC = (idTodolist: string, title: string): AddTaskAT => {
    return {type: addTask, idTodolist, title}
}
export const changeTaskTitleAC = (idTodolist: string, id: string, title: string): ChangeTaskTitleAT => {
    return {type: changeTitleTask, idTodolist, id, title}
}
export const changeTaskStatusAC = (idTodolist: string, id: string, isDone: boolean): ChangeTaskStatusAT => {
    return {type: changeStatus, idTodolist, id, isDone}
}

