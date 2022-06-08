import {addTodolist, removeTodolist, todolistReducer} from "../todolist-reducer";
import {PropsStyleForTask, taskReducer} from "../tasks-reducer";
import {v1} from "uuid";
import {TodolistType} from "../../components/Todolist/Wrapper";

type TaskObjType = { [key: string]: PropsStyleForTask[] }

test('ids shold be equals', () => {
    const startTasksState: TaskObjType = {};
    const startTodolistState: Array<TodolistType> = [];

    const action = addTodolist('123', 'new todolist');

    const andTasksState = taskReducer(startTasksState, action)
    const endTodolistState = todolistReducer(startTodolistState, action)

    const keys = Object.keys(andTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})


test('ids shold be remove ', () => {
    const startTasksState: TaskObjType = {
        ['todolistId1']: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'TypeScrypt', isDone: false},
            {id: v1(), title: 'JavaScrypt', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: true},
        ],
        ['todolistId2']: [
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Angular', isDone: false},
            {id: v1(), title: 'Vue', isDone: false},
        ],

    };

    const action = removeTodolist('todolistId2');

    const andTasksState = taskReducer(startTasksState, action)

    const keys = Object.keys(andTasksState)

    expect(keys.length).toBe(1)
    expect(andTasksState['todolistId2']).toBeUndefined()
})
