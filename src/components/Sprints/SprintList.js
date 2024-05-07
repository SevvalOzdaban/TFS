import React, { useEffect } from "react";
import { Divider, Grid, ListItem, ListItemText, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { List } from "reactstrap";
import sprintAction from '../../redux/actions/sprints';
import sprintData from '../../dummyDatas/sprints.json'
import AddSprint from "./AddSprint";
import dayjs from 'dayjs';

function SprintList() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    
    useEffect(() => {
        if(myState.sprintReducer.sprints.length === 0)
        dispatch(sprintAction.getSprintList(sprintData));
    }, [])

    return (
        <Grid item xs={2} >
            <AddSprint/>
            {
                myState.sprintReducer.sprints.map(elem => {
                    return (
                        <List key={elem.id} sx={{ width: '100%', maxWidth: 160, bgcolor: 'background.paper' }}>
                            <ListItem key={elem.id} alignItems="flex-start">
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
                                                ZK
                                            </Typography>
                                            <br />
                                            -StartDate: {dayjs(elem.startDate).format('DD/MM/YYYY')}
                                            <br />
                                            -EndDate: {dayjs(elem.endDate).format('DD/MM/YYYY')}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="fullWidth" />
                        </List>
                    )
                })
            }
        </Grid>
    );
}

export default SprintList;