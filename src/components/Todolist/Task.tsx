import React, {useCallback} from "react";
import {Checkbox} from "@material-ui/core";
import {deleteTaskTC, TaskDomainType, TaskType, updateTaskTC} from "../../store/tasks-reducer";
import s from "./styleTodoList.module.css";
import style from "./styleTodoList.module.css";
import {EditebleSpan} from "./EditebleSpan";
import Button from "@material-ui/core/Button";
import {HighlightOff} from "@material-ui/icons";
import {useDispatch} from "react-redux";


type taskPropsType = {
    todolistId: string
    task: TaskType
}

enum TaskStatus {
    "new",
    "Completed",
}

export const Task = React.memo(({todolistId, task}: taskPropsType) => {
    const dispatch = useDispatch<any>()

    const dispatchDeleteTask = useCallback((id: string, todolistId: string) => {
        dispatch(deleteTaskTC(todolistId, id))
    }, [dispatch])

    const dispatchUpdateTask = useCallback((todolistId: string, taskId: string, modal: TaskDomainType) => {
        dispatch(updateTaskTC(todolistId, taskId, modal))
    }, [dispatch])

    return (
        <li key={task.id} className={style.li}>
            <Checkbox
                checked={TaskStatus[task.status] !== "new"}
                readOnly={true}
                onChange={(e) => dispatchUpdateTask(todolistId, task.id, {status: e.currentTarget.checked ? 1 : 0})}
                className={task.status ? s.completeTask : ''}
                disabled={task.editableStatus === "loading"}
            />
            <EditebleSpan todolistId={todolistId} taskId={task.id} title={task.title} dispatch={dispatchUpdateTask}
                          disable={task.editableStatus === "loading"}/>

            <Button onClick={() => dispatchDeleteTask(task.id, todolistId)} disabled={task.editableStatus === "loading"}>
                <HighlightOff color={task.editableStatus === "loading" ? "disabled" : "primary"}/>
            </Button>
        </li>
    )
})
