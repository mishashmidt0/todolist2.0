import React, {useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {changeTaskStatusAC, removeTaskAC} from "../../store/tasks-reducer";
import s from "./styleTodoList.module.css";
import {EditebleSpan} from "./EditebleSpan";
import {changeTodolistTitle} from "../../store/todolist-reducer";
import Button from "@material-ui/core/Button";
import {HighlightOff} from "@material-ui/icons";
import {useDispatch} from "react-redux";
import style from './styleTodoList.module.css';
import {TaskType} from "../../api/tasks-api";


type taskPropsType = {
    todolistId: string
    task: TaskType
}

enum TaskStatus {
    "new",
    "Completed",
}

export const Task = React.memo(({todolistId, task}: taskPropsType) => {
    const dispatch = useDispatch()

    const dispatchRemoveTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])
    const dispatchChangeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitle(todolistId, title))
    }, [dispatch])
    const dispatchChangeTaskStatus = useCallback((todolistId: string, taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, status))
    }, [dispatch])

    console.log('Task')
    return (
        <li key={task.id} className={style.li}>
            <Checkbox
                checked={TaskStatus[task.status] !== "new"}
                readOnly={true}
                onChange={(e) => dispatchChangeTaskStatus(todolistId, task.id, e.currentTarget.checked)}
                className={task.status ? s.completeTask : ''}
            />
            <EditebleSpan id={task.id} title={task.title} dispatch={dispatchChangeTodolistTitle}/>

            <Button onClick={() => dispatchRemoveTask(task.id, todolistId)}>
                <HighlightOff color={"primary"}/>
            </Button>
        </li>
    )
})
