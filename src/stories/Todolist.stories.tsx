// import {action} from "@storybook/addon-actions";
import React from "react";
import {Todolist} from "../components/Todolist/Todolist";
import ReduxStoreProviderDecorator from "./ReduxStoreProviderDecorator";


export default {
    title: "Todolist Component",
    component: Todolist,
    decorators: [ReduxStoreProviderDecorator]
}

// const changeTodolist = action("Todolist changed")

export const TodolistBaseExample = () => {
    return <Todolist todolistId={"todolist1"} title={"Test Todolist"}/>
}