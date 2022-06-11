import {appReducer, appStateType, getStatusTodolist} from "../app-reducer";


let startState: appStateType

beforeEach(() => {
    startState = {
        getTodolist: "ready",
        addTodolist: "ready",
        getTasks: "ready",
        addTask: "ready",
    }
})


test('correct status should be change', () => {

    const endState = appReducer(startState, getStatusTodolist({getTodolist: "loading"}))

    const keys = Object.keys(endState)

    expect(endState.getTodolist).toBe("loading");
    expect(keys.length).toBe(4);

})

