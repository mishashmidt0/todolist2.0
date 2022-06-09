import axios from "axios";


class TodoAPI {
    instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            "API-KEY": "918ec3c9-ea92-470f-ae86-9d6bbf63b653"
        }
    })

    getTodo() {
        return this.instance.get("todo-lists")
    }

    postTodo(title: string, setTodo: (item: any) => void) {
        this.instance.post("todo-lists", {title: title}).then(res => {
            setTodo(res.data)
        })
    }

    deleteAllTodo(setTodo: (data: Array<{}>) => void) {
        this.instance.get("todo-lists").then(res => {
                res.data.forEach((item: any) => {
                    this.instance.delete(`todo-lists/${item.id}`).then(res => {
                            setTodo(res.data)
                        }
                    )
                })

            }
        )
    }

    deleteTodolistById(id: string, setTodo: (data: Array<{}>) => void) {
        this.instance.delete(`todo-lists/${id}`)
            .then(res => {
                setTodo(res.data)
            })
            .catch(err => {
                setTodo(err.response.data.message)
            })
    }

    updateTodo(id: string, title: string, setTodo: (data: Array<{}>) => void) {
        this.instance.put(`todo-lists/${id}`, {title: title})
            .then(res => {
                setTodo(res.data)
            })
            .catch(err => {
                setTodo(err.response.data.message)
            })
    }

}

const todoAPI = new TodoAPI()
export default todoAPI