import { FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
import { useEffect, useState } from 'react';
import sprintData from '../../dummyDatas/sprints.json'
import { useDispatch, useSelector } from 'react-redux';
import sprintAction from '../../redux/actions/sprints';

export default function SelectSprint() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    const sprints = myState.sprintReducer.sprints.map(item => item.name);
    const [sprintName, setSprintName] = useState("");

    useEffect(() => {
        if(myState.sprintReducer.sprints.length === 0)
        dispatch(sprintAction.getSprintList(sprintData));
    }, [])

    const handleChange = (event) => {
        setSprintName(event.target.value);
        var selectedSprintItem = myState.sprintReducer.sprints.filter(item => item.name == event.target.value);
        if (selectedSprintItem.length > 0) {
            var selectedSprintId = selectedSprintItem[0].id;
            dispatch(sprintAction.setSelectedSpring(selectedSprintId));
        }
    }

    return (
        <Grid  >
            <FormControl variant="standard" sx={{ m: 1, minWidth: 250 }}>
                <InputLabel id="demo-simple-select-standard-label">SELECT SPRING</InputLabel>
                <Select
                    id="select-sprint"
                    key={"sprint" + sprintName}
                    label="Select Sprint"
                    autoWidth={true}
                    value={sprintName ?? ""}
                    onChange={handleChange}
                >
                    {sprints.map(option => (
                        <MenuItem key={option.id} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <br />
            <br />
        </Grid>
    )
}

