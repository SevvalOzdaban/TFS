import { TextField } from "@mui/material";
import * as React from 'react';

export default function Desc(props) {
    const item = props.item;

    const handleChange = (event) => {
        props.onChange(event.target.value)
    }

    return (
        <TextField
            id="txt-name"
            key={"name" + item.id}
            defaultValue={item.desc}
            name={item.id.toString()}
            label="Açıklama"
            disabled={!props.editable}
            onChange={handleChange}
            multiline 
            maxRows={4}
        />
    )
}