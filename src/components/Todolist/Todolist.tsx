import React, {useCallback, useState} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditebleSpan} from "./EditebleSpan";
import Button from "@material-ui/core/Button";
import {DeleteOutline} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, tasksStateType,} from "../../store/tasks-reducer";
import {changeTodolistTitle, removeTodolist} from "../../store/todolist-reducer";
import {Tasks} from "./Tasks";
import {FilterButton} from "./FilterButton";
import {storeType} from "../../store/redux";


export type isActiveType = 'all' | 'active' | 'completed';
type todolistTypeProps = {
    todolistId: string
    title: string
}


export const Todolist = React.memo(({todolistId, title}: todolistTypeProps) => {

    console.log('Todolist11')

    const dispatch = useDispatch()
    const todolistTasks = useSelector<storeType, tasksStateType>(store => store.taskReducer)

    const [isActive, setActive] = useState<isActiveType>('all')

    const dispatchChangeTodolistTitle = useCallback((id:string, title:string) => {
        dispatch(changeTodolistTitle(id, title))
    }, [dispatch])
    const dispatchAddTask = useCallback((titleTask:string) => {
        dispatch(addTaskAC(todolistId, titleTask))
    }, [dispatch, todolistId])
    const dispatchRemoveTodolist = useCallback(() => {
        dispatch(removeTodolist(todolistId))
    }, [dispatch, todolistId])

    return (<div>
        <h3>
            <EditebleSpan id={todolistId} title={title}
                          dispatch={dispatchChangeTodolistTitle}/>

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

