import {TaskDomainType} from "../store/tasks-reducer";
import {myApi} from "./auth-api";


export type TaskDBType = {
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

class TaskAPI extends myApi {

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