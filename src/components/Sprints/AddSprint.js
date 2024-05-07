import * as React from 'react';
import { Alert, Box, IconButton, Modal, Stack, TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import sprintAction from '../../redux/actions/sprints'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 10,
    p: 7,
};

export default function AddSprint() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [controlRequiredField, setControlRequiredField] = useState(false);
    const [controlSprintName, setControlSprintName] = useState(false);

    const [state, setState] = useState({
        name: "",
        startDate: dayjs(new Date()),
        endDate: dayjs(new Date())
    })

    const handleChangeName = (e) => {
        setState({ ...state, name: e.target.value })
    }

    const handleChangeStartDate = (newValue) => {
        setState({ ...state, startDate: newValue })
    }

    const handleChangeEndDate = (newValue) => {
        setState({ ...state, endDate: newValue })
    }

    const addSprint = () => {
        var sprintLen = myState.sprintReducer.sprints.length;
        var data = {
            id: sprintLen,
            name: state.name,
            startDate: state.startDate,
            endDate: state.endDate
        }
        var controlSprint = myState.sprintReducer.sprints.filter(item => item.name == state.name);

        if (state.name == "" || state.startDate == "" || state.endDate == "") {
            setControlRequiredField(true)
        }
        else if (controlSprint.length > 0) {
            if (controlSprint[0].name == state.name)
                setControlSprintName(true);
        }
        else {
            dispatch(sprintAction.addSprint(data))
            handleClose();
            setState({ name: "", startDate: "", endDate: "" })
        }
    }

    const handleOpen = (e) => {
        setOpen(true);
        setControlRequiredField(false)
    }

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button variant="contained" style={{ marginLeft: "50px" }} endIcon={<Add />} onClick={e => handleOpen(e)}>
                Add Sprint
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
                    <Typography variant="h6" gutterBottom>Add Sprint</Typography>
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
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker
                                label="Start Date"
                                format="DD/MM/YYYY"
                                defaultValue={dayjs(new Date())}
                                minDate={dayjs(new Date())}
                                value={state.startDate}
                                onChange={newValue => handleChangeStartDate(newValue)}
                            />
                            <DatePicker
                                label="End Date"
                                format="DD/MM/YYYY"
                                defaultValue={dayjs(new Date())}
                                minDate={state.startDate}
                                value={state.endDate}
                                onChange={newValue => handleChangeEndDate(newValue)}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                    <br />
                    <br />
                    <IconButton aria-label="ekle" color="primary" style={{ float: "right" }} onClick={addSprint} >
                        <Edit />
                    </IconButton>
                    {controlRequiredField &&
                        <Stack sx={{ width: '65%' }} spacing={2}>
                            <Alert severity="error">Please fill in all information.</Alert>
                        </Stack>
                    }
                    {controlSprintName &&
                        <Stack sx={{ width: '65%' }} spacing={2}>
                            <Alert severity="error">You can't add sprints with the same name.</Alert>
                        </Stack>
                    }
                </Box>
            </Modal>
        </div>
    );
}