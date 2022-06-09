import React, {useCallback} from "react";
import {tasksStateType} from "../../store/tasks-reducer";

import {isActiveType} from "./Todo";
import {Task} from "./Task";
import {TaskType} from "../../api/tasks-api";


type TaskPropsType = {
    todolistId: string
    tasks: tasksStateType
    filter: isActiveType
}


export const Tasks = React.memo(({todolistId, tasks, filter}: TaskPropsType) => {

    let taskForTodolist = tasks[todolistId]

    if (filter === 'active') {
        taskForTodolist = tasks[todolistId].filter((t: TaskType) => !t.status)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks[todolistId].filter((t: TaskType) => t.status)
    }


    const renderTasks = useCallback(() => taskForTodolist.map((task: TaskType) => <Task
            key={task.id}
            task={task}
            todolistId={task.todoListId}/>)
        , [taskForTodolist])

    return (<ul>
            {taskForTodolist && renderTasks()}
        </ul>
    )
})

