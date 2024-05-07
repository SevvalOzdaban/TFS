import { Alert, Box, FormControl, IconButton, InputLabel, MenuItem, Modal, OutlinedInput, Select, Stack, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import userAction from '../../redux/actions/users'


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 7,
};


export default function AddUser() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [controlRequiredField, setControlRequiredField] = useState(false);
    const role = ["Developer", "Analyst"];

    const [state, setState] = useState({
        name: "",
        role,
        totalHour: ""
    })
    const handleChangeName = (e) => {
        setState({ ...state, name: e.target.value })
    }

    const handleChangeTotalHour = (e) => {
        setState({ ...state, totalHour: e.target.value })
    }

    const handleChangeRole = (e) => {
        setState({ ...state, role: e.target.value })
    }

    const addUser = () => {
        var userId = myState.userReducer.users.length;
        var data = {
            id: userId,
            name: state.name,
            role: state.role,
            totalHour: state.totalHour
        }
        if (state.name === "" || state.role === "" || state.totalHour === "") {
            setControlRequiredField(true)
        }
        else {
            dispatch(userAction.addUser(data))
            handleClose();
            setState({ name: "", role: "", effort: "", totalHour: "" })
        }
    }

    const handleOpen = (e) => {
        setOpen(true);
        setControlRequiredField(false)
    }

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" style={{marginLeft:"50px"}} endIcon={<Add />} onClick={e => handleOpen(e)}>
                Add User
            </Button>
            <br />
            <br />
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>Add User</Typography>
                    <br />
                    <TextField
                        id="txt-name"
                        value={state.name}
                        label="Name"
                        onChange={e => handleChangeName(e)}
                        multiline
                        maxRows={4}
                    />
                    <br />
                    <br />
                    <TextField
                        id="txt-totalHour"
                        value={state.totalHour}
                        label="Total Hour"
                        onChange={e => handleChangeTotalHour(e)}
                        type="number"
                    />
                    <br />
                    <br />                    
                    <FormControl size="small" sx={{ minWidth: 225 }}>
                        <InputLabel>Role</InputLabel>
                        <Select
                            id="select-role"
                            label="Role"
                            autoWidth
                            value={state.role}
                            onChange={e => (handleChangeRole(e))}
                            input={<OutlinedInput label="Role" />}
                        >
                            {role.map(option => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <br />
                    <br />
                    <IconButton aria-label="ekle" color="primary" style={{ float: "right" }} onClick={addUser} >
                        <Edit />
                    </IconButton>
                    {controlRequiredField &&
                        <Stack sx={{ width: '65%' }} spacing={2}>
                            <Alert severity="error">Lütfen tüm bilgileri doldurunuz.</Alert>
                        </Stack>
                    }
                </Box>
            </Modal>
        </div>
    );
}