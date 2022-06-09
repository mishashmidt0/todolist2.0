import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist, setAllTodo,
    todolistReducer, TodolistType
} from "../todolist-reducer";
import {v1} from "uuid";


test('correct todolist should be removed', () => {
    let todolistId1: string = v1();
    let todolistId2: string = v1();
    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "What to by", filter: 'all', order: 0, addedDate: "02.02.2002"}
    ];
    const endState = todolistReducer(startState, removeTodolist(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should add items', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "What to by", filter: 'all', order: 0, addedDate: "02.02.2002"}
    ];

    let newTextTitle = 'New text'
    const endState = todolistReducer(startState, addTodolist('123', newTextTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTextTitle);
    expect(endState[2].filter).toBe('all');

})

test('correct todolist should change it is name', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "What to by", filter: 'all', order: 0, addedDate: "02.02.2002"}
    ];

    let newTextTitle = 'New text'
    const endState = todolistReducer(startState, changeTodolistTitle(todolistId1, newTextTitle))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTextTitle);
    expect(endState[1].title).toBe("What to by");
    expect(endState[0].filter).toBe('all');

})

test('correct todolist should change filter', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "What to by", filter: 'all', order: 0, addedDate: "02.02.2002"}
    ];

    const endState = todolistReducer(startState, changeTodolistFilter(todolistId1, 'active'))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');

})

test('must set Todos', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const state: Array<TodolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "What to by", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "Tests", filter: 'all', order: 0, addedDate: "02.02.2002"}
    ];

    const startState: Array<TodolistType> = []

    const endState = todolistReducer(startState, setAllTodo(state))

    expect(endState.length).toBe(3);
})
