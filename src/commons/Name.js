import { TextField } from "@mui/material";
import * as React from 'react';

export default function Name(props) {
    const item = props.item;
    const handleChange = (event) => {
        props.onChange(event.target.value)
    }

    return (
        <TextField
            id="txt-name"
            key={"name" + item.id}
            defaultValue={item.name}
            name={item.id.toString()}
            label="İsim"
            disabled={!props.editable}
            onChange={handleChange}
            multiline
            maxRows={4}
        />
    )
}