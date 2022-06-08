export type changeTitle = {
    type: "CHANGE-TITLE"
    title: string
}

export type todolistReducerAT = changeTitle;

export type itemReducerType = {
    title: string
}
const initialState: itemReducerType = {
    title: ''
}


export const itemReducer = (item: itemReducerType = initialState, action: changeTitle): itemReducerType => {
    switch (action.type) {
        case "CHANGE-TITLE":
            return {...item, title: action.title}

        default:
            return item
    }
}

export const changeTitle = (title: string): changeTitle => {
    return {type: "CHANGE-TITLE", title}
}

