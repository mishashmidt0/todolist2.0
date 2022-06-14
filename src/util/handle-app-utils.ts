import {changeLoading, changeStatus} from "../store/app-reducer";
import {addTaskAC, ThunkDispatchType} from "../store/tasks-reducer";

export const handleNetworkAppError = (err: any, dispatch: ThunkDispatchType) => {
    dispatch(changeStatus({status: "ready", message: err.message, cover: "error"}))
    dispatch(changeLoading("ready"))
}

export const handleServerAppError = (res: any, dispatch: ThunkDispatchType) => {
    if (res.data.resultCode === 1) {
        dispatch(changeStatus({status: "ready", message: res.data.messages[0], cover: "error"}))
    } else {
        dispatch(changeStatus({status: "ready", message: "Error added task", cover: "error"}))
    }
}