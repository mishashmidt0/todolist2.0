import React, {useCallback, useEffect, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import Button from "@material-ui/core/Button";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskTC, setTaskTC, tasksStateType,} from "../../store/tasks-reducer";
import {removeTodolistTC, updateTodolistTC} from "../../store/todolist-reducer";
import {Tasks} from "./Tasks";
import {FilterButton} from "./FilterButton";
import {storeType} from "../../store/redux";


export type isActiveType = 'all' | 'active' | 'completed';
type todolistTypeProps = {
    todolistId: string
    title: string
}


export const Todo = React.memo(({todolistId, title}: todolistTypeProps) => {
    const dispatch = useDispatch<any>()

    useEffect(() => {
        dispatch(setTaskTC(todolistId))
    }, [])


    const todolistTasks = useSelector<storeType, tasksStateType>(store => store.taskReducer)

    const [isActive, setActive] = useState<isActiveType>('all')

    const dispatchUpdateTodolist = useCallback((todolistId: string, taskId: string, {title}: { title: string }) => {
        dispatch(updateTodolistTC(todolistId, title))
    }, [dispatch])

    const dispatchAddTask = useCallback((titleTask: string) => {
        dispatch(addTaskTC(titleTask, todolistId))
    }, [dispatch, todolistId])

    const dispatchRemoveTodolist = useCallback(() => {
        dispatch(removeTodolistTC(todolistId))
    }, [dispatch, todolistId])

    return (<div>
        <h3>
            <EditebleSpan todolistId={todolistId} title={title}
                          dispatch={dispatchUpdateTodolist}/>

            <Button onClick={() => {
                dispatchRemoveTodolist()
            }}>
                <DeleteOutline/>
            </Button>
        </h3>

        <AddItemForm dispatch={dispatchAddTask}/>

        <ul>
            <Tasks todolistId={todolistId} tasks={todolistTasks} filter={isActive}/>
        </ul>

        <FilterButton filter={isActive} setFilter={setActive}/>
    </div>)
})

