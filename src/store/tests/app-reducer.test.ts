import {appReducer, appStateType, getStatusTodolist} from "../app-reducer";


let startState: appStateType

beforeEach(() => {
    startState = {
        todolist: {
            status: "inq",
            message: "",
            cover: "success"
        },
        task: {
            status: "inq",
            message: "",
            cover: "success"
        }
    }
})


test('correct status should be change', () => {

    const endState = appReducer(startState, getStatusTodolist("loading"))

    const keys = Object.keys(endState)

    expect(endState.todolist.status).toBe("loading");
    expect(keys.length).toBe(2)
})

test('correct status should be change', () => {

    const endState = appReducer(startState, getStatusTodolist("error"))

    const keys = Object.keys(endState)

    expect(endState.todolist.status).toBe("error");
    expect(keys.length).toBe(2);

})
