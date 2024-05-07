import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import pbiAction from '../redux/actions/pbis'
import pbiData from '../dummyDatas/pbis.json'
import SprintItem from "./NOT_USED_SprintItem";
import SelectSprint from "../components/Sprints/SelectSprint";

export default function Sprints() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    const selectedSprintId =  myState.sprintReducer.selectedSpring;

    useEffect(() => {
        if (myState.pbiReducer.pbis.length == 0)
            dispatch(pbiAction.loadPbiList(pbiData));
    }, [])

    return (
        <>
        <SelectSprint/>
        <Typography>Sprint List</Typography><br />
            {
                myState.pbiReducer.pbis.filter(pbi => pbi.statu == 2 && pbi.sprintId == selectedSprintId).map(item => {
                    return (
                       <SprintItem key={item.id} item = {item}/>
                    )
                })
            }
        </>
    )
}