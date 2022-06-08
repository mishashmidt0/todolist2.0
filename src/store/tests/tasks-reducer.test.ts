import {v1} from "uuid";

import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    PropsStyleForTask,
    removeTaskAC,
    taskReducer
} from "../tasks-reducer";


let startState: { [key: string]: PropsStyleForTask[] }
let todolistId1: string
let todolistId2: string


beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = {
        [todolistId1]: [
            {id: '1', title: 'HTML&CSS', isDone: true},
            {id: '2', title: 'TypeScrypt', isDone: false},
            {id: '3', title: 'JavaScrypt', isDone: true},
            {id: '4', title: 'React', isDone: false},
            {id: '5', title: 'Redux', isDone: true},
        ],
        [todolistId2]: [
            {id: '2', title: 'React', isDone: true},
            {id: '3', title: 'Angular', isDone: false},
            {id: '4', title: 'Vue', isDone: false},
        ]
    }
})


test('correct tasks should be removed', () => {


    const endState = taskReducer(startState, removeTaskAC('2', todolistId1))

    expect(endState[todolistId1].length).toBe(4);
    expect(endState[todolistId2].length).toBe(3);
    expect((endState[todolistId1]).every(t => t.id != '2')).toBeTruthy();

})

test('correct task should add item', () => {


    let newTextTitle = 'New text'
    const endState = taskReducer(startState, addTaskAC(todolistId1, newTextTitle))

    expect(endState[todolistId1].length).toBe(6);
    expect(endState[todolistId2].length).toBe(3);

    expect(endState[todolistId1][0].title).toBe(newTextTitle);
    expect(endState[todolistId1][0].id).toBeDefined();
    expect(endState[todolistId1][0].isDone).toBe(false);
})

test('correct task should change title', () => {
    let newTextTitle = 'New text'
    const endState = taskReducer(startState, changeTaskTitleAC(todolistId1, '1', newTextTitle))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId2].length).toBe(3);

    expect(endState[todolistId1][0].title).toBe(newTextTitle);
    expect(endState[todolistId2][0].title).toBe('React');
    expect(endState[todolistId1][0].isDone).toBe(true);
})

test('correct todolist should change isDone', () => {


    const endState = taskReducer(startState, changeTaskStatusAC(todolistId1, '1', false))

    expect(endState[todolistId1].length).toBe(5);
    expect(endState[todolistId2].length).toBe(3);

    expect(endState[todolistId1][0].isDone).toBe(false);
    expect(endState[todolistId2][0].isDone).toBe(true);
})
