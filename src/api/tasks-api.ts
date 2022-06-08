import axios from "axios";


type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string,
}
type GetTaskResponse = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}

class TaskAPI {
    instance = axios.create({
        baseURL: 'https://social-network.samuraijs.com/api/1.1/',
        withCredentials: true,
        headers: {
            "API-KEY": "918ec3c9-ea92-470f-ae86-9d6bbf63b653"
        }
    })

    getTasks(todolistId: string) {
        return this.instance.get<any>(`todo-lists/${todolistId}/tasks`)
    }

    postTask(title: string, todolistId: string, setTodo: (el: Object[]) => void) {
        this.instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
            .then(res => {
                setTodo(res.data)
            })
    }

    deleteTask(todolistId: string, taskId: string) {
        return this.instance.get(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }

    updateTask(todolistId: string, taskId: string, title: string) {
        return this.instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }

}

const taskAPI = new TaskAPI()
export default taskAPI