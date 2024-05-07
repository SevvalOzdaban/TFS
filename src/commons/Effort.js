import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';

export default function Effort(props) {
    const efforts = ["1", "2", "3", "5", "8"];
    const item = props.item;
    const handleChange = (event) => {
        props.onChange(event.target.value)
    }

    return (
        <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Efor</InputLabel>
            <Select
                id="select-effort"
                key={"effort" + item.id}
                label="Efor"
                autoWidth
                disabled={!props.editable}
                defaultValue={item.effort ?? ""}
                value={item.effort ?? ""}
                name={item.id.toString()}
                onChange={handleChange}
                input={<OutlinedInput label="Efor" />}
            >
                {efforts.map(option => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}