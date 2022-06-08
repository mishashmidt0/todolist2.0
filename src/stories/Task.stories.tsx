import {Task} from "../components/Todolist/Task";
// import {action} from "@storybook/addon-actions";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../store/redux";

export default {
    title: "Task Component",
    component: Task
}

// const changeTitle = action("Title changed")

export const TaskBaseExample = () => {
    return <Provider store={store}>
        <Task
            task={{id: '1234', title: "Vue", isDone: false}}
            todolistId={"todolist2"}
        />

        <Task
            task={{id: '123', title: "React", isDone: true}}
            todolistId={"todolist1"}/>
    </Provider>
}