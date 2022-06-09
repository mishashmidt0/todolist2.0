import {
    addTodolist,
    changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist, setAllTodo,
    todolistReducer, TodolistType
} from "../todolist-reducer";
import {v1} from "uuid";


let todolistId1: string
let todolistId2: string
let startState: Array<TodolistType> = []

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: 'all', order: 0, addedDate: "02.02.2002"},
        {id: todolistId2, title: "What to by", filter: 'all', order: 0, addedDate: "02.02.2002"}
    ];
})


test('correct todolist should be removed', () => {

    const endState = todolistReducer(startState, removeTodolist(todolistId1))
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should add items', () => {

    const endState = todolistReducer(startState, addTodolist('123', 'New text'))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe('New text');
})

test('correct todolist should change it is name', () => {

    let newTextTitle = 'New text'
    const endState = todolistReducer(startState, changeTodolistTitle(todolistId1, newTextTitle))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTextTitle);
    expect(endState[1].title).toBe("What to by");
    expect(endState[0].filter).toBe('all');

})

test('correct todolist should change filter', () => {

    const endState = todolistReducer(startState, changeTodolistFilter(todolistId1, 'active'))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');

})

test('must set Todolist', () => {

    const stateEmpty: Array<TodolistType> = []
    const endState = todolistReducer(stateEmpty, setAllTodo(startState))

    expect(endState.length).toBe(2);
})
