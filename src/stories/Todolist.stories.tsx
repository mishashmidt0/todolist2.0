// import {action} from "@storybook/addon-actions";
import React from "react";
import {Todo} from "../components/Todolist/Todo";
import ReduxStoreProviderDecorator from "./ReduxStoreProviderDecorator";


export default {
    title: "Todo Component",
    component: Todo,
    decorators: [ReduxStoreProviderDecorator]
}

// const changeTodolist = action("Todo changed")

export const TodolistBaseExample = () => {
    return <Todo todolistId={"todolist1"} title={"Test Todo"} disable={false}/>
}