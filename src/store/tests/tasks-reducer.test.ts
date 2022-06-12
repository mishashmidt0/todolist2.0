import {addTodolist, removeTodolist, todolistReducer, TodolistType} from "../todolist-reducer";
import {changeTaskStatus, setTasks, taskReducer, tasksStateType} from "../tasks-reducer";
import {v1} from "uuid";
import {TaskDBType} from "../../api/tasks-api";


let startTasksState: tasksStateType
let todolistId: string;
let taskId: string;

beforeEach(() => {
    taskId = "123";
    todolistId = "1112222333";
    startTasksState = {
        [todolistId]: [
            {
                id: taskId,
                description: "werwerwe",
                title: 'HTML&CSS',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: "",
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                editableStatus: "idle"
            },

            {
                id: v1(),
                description: "qqqqqqqqqqqqqw",
                title: 'JS',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: "",
                todoListId: 'todolistId1',
                addedDate: '',
                order: 0,
                editableStatus: "idle"
            },

        ],
        ['todolistId2']: [
            {
                id: v1(),
                description: "EFSDFSFXCV",
                title: 'React',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: "",
                todoListId: 'todolistId2',
                addedDate: '',
                order: 0,
                editableStatus: "idle"
            },
            {
                id: v1(),
                description: "sdfsdfsdfcvbcvbcv",
                title: 'Vue',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: "",
                todoListId: 'todolistId2',
                addedDate: '',
                order: 0,
                editableStatus: "idle"
            },
        ],

    };
})


test('ids should be equals', () => {

    const startTasksState: tasksStateType = {};
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

test('ids should be remove ', () => {


    const action = removeTodolist('todolistId2');

    const andTasksState = taskReducer(startTasksState, action)

    const keys = Object.keys(andTasksState)

    expect(keys.length).toBe(1)
    expect(andTasksState['todolistId2']).toBeUndefined()
})

test('must set tasks ', () => {

    const state: TaskDBType[] = [
        {
            id: v1(),
            description: "werwerwe",
            title: 'HTML&CSS',
            completed: false,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: "",
            todoListId: 'todolistId2',
            addedDate: '',
            order: 0,
        },
        {
            id: v1(),
            description: "werwerwe",
            title: 'React',
            completed: false,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: "",
            todoListId: 'todolistId2',
            addedDate: '',
            order: 0,
        },
    ]

    const startTasksState: tasksStateType = {}
    const action = setTasks('todolistId2', state);
    const andTasksState = taskReducer(startTasksState, action)

    const keys = Object.keys(andTasksState)

    expect(keys.length).toBe(1)

    expect(andTasksState['todolistId2'].length).toBe(2)
})


test('should be change status task', () => {

    const andTasksState = taskReducer(startTasksState, changeTaskStatus(todolistId, taskId, "loading"))

    expect(andTasksState[todolistId][0].editableStatus).toBe("loading")
})