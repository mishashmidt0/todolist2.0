import React, {ChangeEvent, KeyboardEvent, useState} from "react";

import {TextField} from "@material-ui/core";

export type EditebleSpanPropsType = {
    todolistId: string
    taskId?: string
    title: string
    dispatch: any
    disable?: boolean
}

export const EditebleSpan = React.memo(({todolistId, taskId, title, dispatch, disable = false}: EditebleSpanPropsType) => {

        let [editMode, setEditMode] = useState<boolean>(false);
        let [newTitle, setTitle] = useState(title);

        const activateEditMode = () => {
            if (disable) {
                return
            }
            setEditMode(true)
        }
        const activateViewMode = () => {
            dispatch(todolistId, taskId, {title: newTitle})
            setEditMode(false)
        }
        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
        }
        const onkeypress = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                dispatch(todolistId, taskId, {title: newTitle})
                setEditMode(false)
            }
        }

        return (
            editMode ? <TextField
                    value={newTitle}
                    onBlur={activateViewMode}
                    autoFocus
                    onChange={onChangeTitleHandler}
                    onKeyPress={onkeypress}
                />

                : <span onDoubleClick={activateEditMode}>{newTitle}</span>
        )
    }
)
