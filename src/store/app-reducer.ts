import {Dispatch} from "redux";
import authApi from "../api/auth-api";
import {setIsLoggedIn} from "../components/login/auth-reducer";
import {handleNetworkAppError, handleServerAppError} from "../util/handle-app-utils";

const initialState: appStateType = {
    status: "inq",
    message: "",
    cover: "success",
    loading: "ready",
    initialized: false
}

export const appReducer = (app: appStateType = initialState, action: appReducer): appStateType => {

    switch (action.type) {
        case "STATUS-CHANGE":
            return {...app, ...action.model}
        case "LOADING-CHANGE":
            return {...app, loading: action.loading}
        case "APP/SET-INITIALIZED":
            return {...app, initialized: action.value}
        default:
            return app
    }
}
// action
export const changeStatus = (model: appStateModelType) => ({type: "STATUS-CHANGE", model} as const)
export const changeLoading = (loading: "ready" | "loading") => ({type: "LOADING-CHANGE", loading} as const)
export const setAppInitialized = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)

// thunk

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn(true))
        } else {
            handleServerAppError(res, dispatch)
        }
        dispatch(setAppInitialized(true))
    }).catch(err => {
        handleNetworkAppError(err, dispatch)
    })
}

// type
export type statusType = "inq" | "loading" | "ready" | "error"
export type coverType = "success" | "warning" | "info" | "error"
export type appStateType = {
    status: statusType,
    message: string,
    cover: coverType
    loading: "ready" | "loading"
    initialized: boolean
}
export type appStateModelType = {
    status: statusType,
    message?: string,
    cover?: coverType,
    loading?: "ready" | "loading"
}
export type changeStatusType = ReturnType<typeof changeStatus>
export type changeLoadingType = ReturnType<typeof changeLoading>
export type setAppInitializedType = ReturnType<typeof setAppInitialized>
export type appReducer =
    | changeStatusType
    | changeLoadingType
    | setAppInitializedType




