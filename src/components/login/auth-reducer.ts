import {changeLoading, changeStatus} from "../../store/app-reducer";
import authAPI, {LoginParamsType} from "../../api/auth-api";
import {handleNetworkAppError, handleServerAppError} from "../../util/handle-app-utils";
import {Dispatch} from "redux";

const initialState: loginStateType = {
    isLoggedIn: false,
}

export const authReducer = (state: loginStateType = initialState, action: LoginReducer): loginStateType => {

    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}

        default:
            return state
    }
}
// action
export const setIsLoggedIn = (value: boolean) => ({type: "login/SET-IS-LOGGED-IN", value} as const)

// thunk

export const loginTC = (data: LoginParamsType) => {
    return (dispatch: Dispatch<any>) => {
        dispatch(changeLoading("loading"))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(true))
                    dispatch(changeStatus({status: "ready", message: "Account Login!", cover: "success"}))
                } else {
                    handleServerAppError(res, dispatch)
                }
                dispatch(changeLoading("ready"))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}

export const logoutTC = () => {
    return (dispatch: Dispatch<any>) => {
        dispatch(changeLoading("loading"))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedIn(false))
                    dispatch(changeStatus({status: "ready", message: "Account Login!", cover: "success"}))
                } else {
                    handleServerAppError(res, dispatch)
                }
                dispatch(changeLoading("ready"))
            })
            .catch(err => {
                handleNetworkAppError(err, dispatch)
            })
    }
}
// type

export type loginStateType = {
    isLoggedIn: boolean

}

export type setIsLoggedInType = ReturnType<typeof setIsLoggedIn>
export type LoginReducer =
    | setIsLoggedInType





