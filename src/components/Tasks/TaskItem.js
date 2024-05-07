import { Delete } from "@mui/icons-material";
import { Avatar, Button, CardContent, Grid, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import taskAction from '../../redux/actions/tasks';
import { Card, CardActions } from '@mui/material';
import EditTask from "./EditTask";


function TaskItem(props) {
    const myState = useSelector(state => state);
    const dispatch = useDispatch()
    const elem = props.item;
    const deleteTask = (e) => {
        var data = {
            id: e.target.name
        }
        dispatch(taskAction.deleteTask(data))
    }
    console.log("task item props",elem)
    return (
        <Grid item xs={6}>
            <Card sx={{  boxShadow: 10, m:1 }}>
                <CardContent >
                    <Avatar alt="User" sx={{ float: "left" }} />
                    <Typography
                        style={{ paddingLeft: "50px", paddingTop: "10px" }}
                        component="div"
                        variant="body2"
                        color="text.primary"
                    >
                        {myState.userReducer.users.filter(user => user.id == elem.user)[0].name}
                    </Typography>
                    <br />
                    <Typography gutterBottom variant="body2" component="div" >Name: {elem.name}</Typography>
                    <Typography gutterBottom variant="body2" component="div" >Desc: {elem.desc}</Typography>
                    <Typography gutterBottom variant="body2" component="div">Effort: {elem.effort}</Typography>
                    <br />
                    <EditTask item={elem} />
                    <Button
                        name={elem.id}
                        key={"delete" + elem.id}
                        variant="contained"
                        endIcon={<Delete />}
                        size="small"
                        onClick={e => deleteTask(e)}>
                        DELETE
                    </Button>
                    <br />
                </CardContent>
            </Card>
            <br />
        </Grid>
    )
}

export default TaskItem;