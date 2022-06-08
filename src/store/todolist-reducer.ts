import {TodolistType} from "../components/Todolist/Wrapper";

const initialState: Array<TodolistType> = []
export const todolistReducer = (todolist: Array<TodolistType> = initialState, action: todolistReducerAT): Array<TodolistType> => {

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolist.filter((e) => e.id !== action.id)
        case 'ADD-TODOLIST':
            return [{id: action.id, title: action.title, filter: 'all'}, ...todolist]
        case 'CHANGE-TODOLIST-TITLE':
            return [...todolist.map((e) => e.id === action.id ? {...e, title: action.title as string} : e)]
        case 'CHANGE-TODOLIST-FILTER':
            return todolist.map((tl) => tl.id === action.id ? {...tl, filter: action.filter} : tl)
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

// type
export type AddTodolist = ReturnType<typeof addTodolist>
export type RemoveTodolist = ReturnType<typeof removeTodolist>

export type todolistReducerAT =
    | ReturnType<typeof changeTodolistFilter>
    | ReturnType<typeof changeTodolistTitle>
    | AddTodolist
    | RemoveTodolist;
