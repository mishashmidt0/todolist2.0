import {Task} from "../components/Todolist/Task";
// import {action} from "@storybook/addon-actions";
import React from "react";
import {Provider} from "react-redux";
import {store} from "../store/redux";
import {v1} from "uuid";

export default {
    title: "Task Component",
    component: Task
}

// const changeTitle = action("Title changed")

export const TaskBaseExample = () => {
    return <Provider store={store}>
        <Task
            task={{
                id: v1(),
                description: "werwerwe",
                title: 'React',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: "",
                todoListId: 'todolistId2',
                addedDate: '',
                order: 0,
            }}
            todolistId={"todolist2"}
        />

        <Task
            task={{
                id: v1(),
                description: "werwerwe",
                title: 'React',
                completed: false,
                status: 0,
                priority: 0,
                startDate: '',
                deadline: "",
                todoListId: 'todolistId2',
                addedDate: '',
                order: 0,
            }}
            todolistId={"todolist1"}/>
    </Provider>
}