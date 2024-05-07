import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useEffect } from "react";
import * as React from 'react';
import userData from '../dummyDatas/users.json';
import userAction from '../redux/actions/users';
import { useDispatch, useSelector } from "react-redux";

export default function Name(props) {
    const item = props.item;
    const myState = useSelector(state => state);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        props.onChange(event.target.value)
    }
    useEffect(() => {
        if (myState.userReducer.users.length == 0)
            dispatch(userAction.getUserList(userData));
    }, [])
    return (

        <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Kişi</InputLabel>
            <Select
                id="select-user"
                key={"user" + item.id}
                label="Kişi"
                autoWidth
                disabled={!props.editable}
                defaultValue={item.user}
                value={item.user ?? ""}
                name={item.id.toString()}
                onChange={handleChange}
                input={<OutlinedInput label="Kişi" />}
            >
                {myState.userReducer.users.map(option => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}