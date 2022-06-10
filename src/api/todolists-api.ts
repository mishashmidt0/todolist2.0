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

    addTodolist(title: string) {
        return this.instance.post("todo-lists", {title: title})
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

    deleteTodolistById(id: string) {
        return this.instance.delete(`todo-lists/${id}`)
    }

    updateTodo(id: string, title: string) {
       return this.instance.put(`todo-lists/${id}`, {title: title})
    }

}

const todoAPI = new TodoAPI()
export default todoAPI