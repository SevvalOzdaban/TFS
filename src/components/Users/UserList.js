import React, { useEffect } from "react";
import { Avatar, Divider, Grid, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepOrange } from "@mui/material/colors";
import { List } from "reactstrap";
import userAction from '../../redux/actions/users';
import userData from '../../dummyDatas/users.json'
import AddUser from "./AddUser";

function Users() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (myState.userReducer.users.length === 0)
            dispatch(userAction.getUserList(userData));
    }, [])
    return (
        <Grid item xs={2} >
            <AddUser />
            {
                myState.userReducer.users.filter(item => item.name !== "Unassigned").map(elem => {
                    return (
                        <List key={elem.id} sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <ListItem key={elem.id} alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{elem.name[0]}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={elem.name}
                                    key={elem.id}
                                    secondary={
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {elem.role}
                                            </Typography>
                                            <br />
                                            -Total Hour: {elem.totalHour}
                                            <br />
                                            -Remaining Hour: {elem.remainingHour}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" />
                        </List>
                    )
                })
            }
        </Grid>
    );
}

export default Users;