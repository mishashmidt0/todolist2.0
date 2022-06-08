import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import {isActiveType} from "./Todolist";

type FilterButtonPropsType = {
    filter: isActiveType
    setFilter: (title: isActiveType) => void
}
export const FilterButton = React.memo(({filter, setFilter}: FilterButtonPropsType) => {
    return (
        <div>
            <ButtonGroup color="primary" aria-label="outlined primary button group">

                <Button variant={filter === 'all' ? 'contained' : 'text'}
                        onClick={() => setFilter('all')}>All</Button>

                <Button variant={filter === 'active' ? 'contained' : 'text'}
                        onClick={() => setFilter('active')}>Active</Button>

                <Button variant={filter === 'completed' ? 'contained' : 'text'}
                        onClick={() => setFilter('completed')}>Completed</Button>
            </ButtonGroup>
        </div>
    )
})
