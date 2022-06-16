import {changeLoading, changeStatus} from "../store/app-reducer";
import {ThunkDispatchType} from "../store/tasks-reducer";

export const handleNetworkAppError = (err: any, dispatch: ThunkDispatchType) => {
    dispatch(changeStatus({status: "ready", message: err.message, cover: "warning"}))
    dispatch(changeLoading("ready"))
}

export const handleServerAppError = (res: any, dispatch: ThunkDispatchType) => {
    if (res.data.resultCode === 1) {
        dispatch(changeStatus({status: "ready", message: res.data.messages[0], cover: "warning"}))
    } else {
        dispatch(changeStatus({status: "ready", message: "Error added task", cover: "warning"}))
    }
}