import React, {useCallback} from "react";
import {Grid, Paper} from "@material-ui/core";
import {Todolist} from "./Todolist";
import {useSelector} from "react-redux";
import {storeType} from "../../store/redux";
import {TidolistType} from "../../types/PropsStyle";

export const Wrapper = React.memo(() => {
    const todolists = useSelector<storeType, Array<TidolistType>>((store) => store.todolistReducer)
    console.log('Wrapper')

    return <Todolists todolists={todolists}/>
});

type todolistsPropsType = {
    todolists: Array<TidolistType>
}


const Todolists = React.memo(({todolists}: todolistsPropsType) => {
    console.log('Todolists')

    const renderTodolists = useCallback(() => {
        debugger
        return todolists.map((todolist) => {

            return (
                <Grid item key={todolist.id}>
                    <Paper style={{padding: '10px'}}>
                        <Todolist todolistId={todolist.id} title={todolist.title}/>
                    </Paper>
                </Grid>)
        })
    }, [todolists])

    return (
        <Grid container spacing={5}>
            {renderTodolists()}
        </Grid>
    )
})
