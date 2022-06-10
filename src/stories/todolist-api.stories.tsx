import React, {useEffect, useState} from "react";
import todoAPI from "../api/todolists-api";


export default {
    title: "Api test"
}


export const getTodolist = () => {

    const [arrTodo, setArrTodo] = useState<any>(null)

    useEffect(() => {
        // todoAPI.getTodo(setArrTodo)
    }, [])

    return <div> {arrTodo && arrTodo.map((el: any, index: number) => {
        return (
            <div key={el.id}>
                <h2>Task №{index}</h2>
                <h3>Title: {el.title}</h3>
                <span>ID: {el.id}</span>
                <hr/>
            </div>
        )
    })} </div>
}

export const postTodolist = () => {
    const [todo, setTodo] = useState<any>(null)
    const [text, setText] = useState<any>(null)


    const creatPost = () => {
        todoAPI.addTodolist(text)
    }

    return <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={creatPost}>add</button>
        <hr/>
        {JSON.stringify(todo)} </div>
}

export const deleteTodolistAll = () => {
    const [todo, setTodo] = useState<any>(null)
    useEffect(() => {
        todoAPI.deleteAllTodo(setTodo)

    }, [])
    return <div> {JSON.stringify(todo)} </div>
}

export const deleteTodolist = () => {
    const [todo, setTodo] = useState<any>(null)
    const [text, setText] = useState<string>('')

    const deleteTodo = () => {
        todoAPI.deleteTodolistById(text).then(res => {
            setTodo(res.data)
        })

    }
    return <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
        <button onClick={deleteTodo}>delete</button>
        {JSON.stringify(todo)}
    </div>
}

export const updateTodolist = () => {
    const [todo, setTodo] = useState<any>(null)
    const [text, setText] = useState<any>(null)
    const [id, setId] = useState<any>(null)

    const update = () => {
        todoAPI.updateTodo(id, text)
    }
    return <div>
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder={'new text'}/>
        <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder={'title id'}/>
        <button onClick={update}>update</button>
        <hr/>
        {JSON.stringify(todo)} </div>
}