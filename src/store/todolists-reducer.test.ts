import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistReducer
} from "./todolist-reducer";
import {v1} from "uuid";
import {TidolistType} from "../types/PropsStyle";


test('correct todolist should be removed', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();


    const startState: Array<TidolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to by", filter: 'all'}
    ];

    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

})

test('correct todolist should add items', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TidolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to by", filter: 'all'}
    ];

    let newTextTitle = 'New text'
    const endState = todolistReducer(startState, addTodolistAC('123', newTextTitle))

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTextTitle);
    expect(endState[2].filter).toBe('all');

})

test('correct todolist should change it is name', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TidolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to by", filter: 'all'}
    ];

    let newTextTitle = 'New text'
    const endState = todolistReducer(startState, changeTodolistTitleAC(todolistId1, newTextTitle))

    expect(endState.length).toBe(2);
    expect(endState[0].title).toBe(newTextTitle);
    expect(endState[1].title).toBe("What to by");
    expect(endState[0].filter).toBe('all');

})

test('correct todolist should change filter', () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TidolistType> = [
        {id: todolistId1, title: "What to learn", filter: 'all'},
        {id: todolistId2, title: "What to by", filter: 'all'}
    ];

    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1, 'active'))

    expect(endState.length).toBe(2);
    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');

})
