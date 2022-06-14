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
        let [error, setError] = useState<string>("");

        const activateEditMode = () => {
            if (disable) {
                return
            }
            setEditMode(true)
        }

        const handleModeError = () => {
            if (newTitle.length > 100) {
                setError("Error, title is too long")
            } else if (newTitle.length === 0) {
                setError("Error, title empty")
            } else {
                setError("")
                setEditMode(false)
            }
        }
        const activateViewMode = () => {
            dispatch(todolistId, taskId, {title: newTitle})
            handleModeError()
        }
        const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value);
        }
        const onkeypress = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter') {
                dispatch(todolistId, taskId, {title: newTitle})
                handleModeError()
            }
        }

        return (
            editMode ? <TextField
                    value={newTitle}
                    onBlur={activateViewMode}
                    autoFocus
                    onChange={onChangeTitleHandler}
                    onKeyPress={onkeypress}
                    label={error}
                    error={!!error}
                />

                : <span onDoubleClick={activateEditMode}>{newTitle}</span>
        )
    }
)
