import React, {useCallback} from "react";
import {PropsStyleForTask, tasksStateType} from "../../store/tasks-reducer";

import {isActiveType} from "./Todolist";
import {Task} from "./Task";


type TaskPropsType = {
    todolistId: string
    tasks: tasksStateType
    filter: isActiveType
}


export const Tasks = React.memo(({todolistId, tasks, filter}: TaskPropsType) => {

    let taskForTodolist = tasks[todolistId]

    if (filter === 'active') {
        taskForTodolist = tasks[todolistId].filter((t: PropsStyleForTask) => !t.isDone)
    }
    if (filter === 'completed') {
        taskForTodolist = tasks[todolistId].filter((t: PropsStyleForTask) => t.isDone)
    }

    const renderTasks = useCallback(() => taskForTodolist.map((task: PropsStyleForTask) => <Task
            key={task.id}
            task={task}
            todolistId={todolistId}/>)
        , [taskForTodolist])

    return (<ul>
            {renderTasks()}
        </ul>
    )
})

