import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import {  CardContent, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import TaskItem from "../components/Tasks/TaskItem";
import AddTaskModal from "../components/Tasks/AddTaskModal";


export default function SprintItem(props) {
    const item = props.item;
    const myState = useSelector(state => state);
    return (
        <>
            <Card sx={{ minWidth: 400, boxShadow: 5 }}>
                <CardContent sx={{ minWidth: 400 }}>
                    <Typography>{item.name}</Typography>
                </CardContent>
                <CardActions >
                    <AddTaskModal id={item.id} />
                </CardActions>
                {
                    myState.taskReducer.tasks.filter(task => task.sprintId == item.id).map(elem => {
                        return <TaskItem key={elem.id} item={elem} />;
                    })
                }
            </Card>
            <br />
            <br />
        </>
    )

}
