import axios from "axios";
import {TaskDomainType} from "../store/tasks-reducer";


export type TaskType = {
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
export type GetTaskResponse = {
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

    addTask(title: string, todolistId: string) {
        return this.instance.post(`todo-lists/${todolistId}/tasks`, {title: title})
    }

    deleteTask(todolistId: string, taskId: string) {
        return this.instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }

    updateTask(todolistId: string, taskId: string, task: TaskDomainType) {
        return this.instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, task)
    }

}

const taskAPI = new TaskAPI()
export default taskAPI