import React, {useState} from "react";
import taskAPI from "../api/tasks-api";


export default {
    title: "Task Api test"
}

export const getTasks = () => {
    const [todo, setTodo] = useState<any>(null)
    const [id, setId] = useState<any>(null)

    const getTasks = () => {
        taskAPI.getTasks(id)
            .then(res => {
                setTodo(res.data)
            })
            .catch(err => {
                setTodo(err)
            })
    }
    return <div>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder={"todolistId"}/>
        <button onClick={getTasks}>get tasks</button>
        <hr/>
        {JSON.stringify(todo)} </div>
}

export const postTask = () => {
    const [todo, setTodo] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [text, setText] = useState<any>(null)


    const createTask = () => {
        taskAPI.addTask(text, todolistId).then(res=>{
            setTodo(res.data)
        })
    }

    return <div>
        <input type="text" value={todolistId} onChange={(e) => setTodolistId(e.target.value)}
               placeholder={"todolistId"}/>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={"task"}/>
        <button onClick={createTask}>create task</button>
        <hr/>
        {JSON.stringify(todo)} </div>
}

export const deleteTask = () => {
    const [todo, setTodo] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTaskById = () => {
        taskAPI.deleteTask(todolistId, taskId).then(res => {
            setTodo(res.data)
        })
    }
    return <div>
        <input type="text" value={todolistId} onChange={(e) => setTodolistId(e.target.value)}
               placeholder={"todolistId"}/>
        <input type="text" value={taskId} onChange={(e) => setTaskId(e.target.value)}
               placeholder={"todolistId"}/>
        <button onClick={deleteTaskById}>delete task</button>
        <hr/>
        {JSON.stringify(todo)} </div>
}

export const updateTodolist = () => {

    const [todo, setTodo] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [text, setText] = useState<any>(null)

    const updateTask = () => {
        taskAPI.updateTask(todolistId, taskId, text).then(res => {
            setTodo(res.data)
        })
    }
    return <div>
        <input type="text" value={todolistId} onChange={(e) => setTodolistId(e.target.value)}
               placeholder={"todolistId"}/>
        <input type="text" value={taskId} onChange={(e) => setTaskId(e.target.value)}
               placeholder={"todolistId"}/>

        <input type="text" value={text} onChange={(e) => setText(e.target.value)}
               placeholder={"new title"}/>
        <button onClick={updateTask}>update task</button>
        <hr/>
        {JSON.stringify(todo)} </div>
}