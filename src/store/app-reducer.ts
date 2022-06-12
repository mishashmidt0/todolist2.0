const initialState: appStateType = {
    status: "inq",
    message: "",
    cover: "success",
    loading: "ready"
}

export const appReducer = (app: appStateType = initialState, action: appReducer): appStateType => {

    switch (action.type) {
        case "STATUS-CHANGE":
            return {...app, ...action.model}
        case "LOADING-CHANGE":
            return {...app, loading: action.loading}
        default:
            return app
    }
}
// action
export const changeStatus = (model: appStateModelType) => ({type: "STATUS-CHANGE", model} as const)
export const changeLoading = (loading: "ready" | "loading") => ({type: "LOADING-CHANGE", loading} as const)


// type
export type statusType = "inq" | "loading" | "ready" | "error"
export type coverType = "success" | "warning" | "info" | "error"
export type appStateType = {
    status: statusType,
    message: string,
    cover: coverType
    loading: "ready" | "loading"
}
export type appStateModelType = {
    status: statusType,
    message?: string,
    cover?: coverType,
    loading?: "ready" | "loading"
}
export type changeStatusType = ReturnType<typeof changeStatus>
export type changeLoadingType = ReturnType<typeof changeLoading>
export type appReducer =
    | changeStatusType
    | changeLoadingType




