import {appReducer, appStateType, changeLoading, changeStatus} from "../app-reducer";


let startState: appStateType

beforeEach(() => {
    startState = {
        status: "inq",
        message: "",
        cover: "success",
        loading: "ready"
    }
})


test('correct status should be change', () => {

    const endState = appReducer(startState, changeStatus({status: "loading"}))

    const keys = Object.keys(endState)

    expect(endState.status).toBe("loading");
    expect(keys.length).toBe(4)
})

test('correct status should be error', () => {

    const endState = appReducer(startState, changeStatus({status: "error", cover: "error", message: "Task to mush long"}))


    const keys = Object.keys(endState)

    expect(endState.status).toBe("error");
    expect(endState.message).toBe("Task to mush long");
    expect(endState.cover).toBe("error");
    expect(keys.length).toBe(4);

})

test('correct loading should be change', () => {

    const endState = appReducer(startState, changeLoading("loading"))

    const keys = Object.keys(endState)

    expect(endState.loading).toBe("loading");
})