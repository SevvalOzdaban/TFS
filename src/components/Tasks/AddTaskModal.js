import { Alert, Box, CardActions, IconButton, Modal, Stack, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import { Add, Edit } from "@mui/icons-material";
import { useState } from "react";
import Name from "../../commons/Name";
import Desc from "../../commons/Desc";
import Effort from "../../commons/Effort";
import User from "../../commons/User";
import taskAction from '../../redux/actions/tasks'
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

export default function AddTaskModal(props) {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [controlRequiredField, setControlRequiredField] = useState(false);
    const [sprintIdAddedToTask, setSprintIdAddedToTask] = useState("");
    const [state, setState] = useState({
        id: "",
        name: "",
        desc: "",
        effort: "",
        user: ""
    });
    const handleOpen = (e) => {
        setOpen(true);
        setControlRequiredField(false)
        console.log("add task button",e.target.value)
        setSprintIdAddedToTask(e.target.value)
    }

    const handleClose = () => setOpen(false);

    const handleChangeName = (newName) => {
        setState({ ...state, name: newName })
    }

    const handleChangeDesc = (newDesc) => {
        setState({ ...state, desc: newDesc })
    }

    const handleChangeEffort = (newEffort) => {
        setState({ ...state, effort: newEffort })
    }

    const handleChangeUser = (newUser) => {
        setState({ ...state, user: newUser })
    }

    const addTask = () => {
        var id = myState.taskReducer.tasks?.length;
        var data = {
            taskId: id + 1,
            name: state.name,
            desc: state.desc,
            effort: state.effort,
            user: state.user,
            sprintId: sprintIdAddedToTask
        }
        if (state.name === "" || state.desc === "" || state.effort === "" || state.user === "") {
            setControlRequiredField(true)
        }
        else {
            dispatch(taskAction.addTask(data))
            dispatch(userAction.updateUserRemainingHour(data));
            handleClose();
            setState({ id: "", name: "", desc: "", effort: "", user: "" })
            id++;
        }
    }
    return (
        <CardActions>
            <Button
                variant="contained"
                size="small" 
                key={props.id}
                value={props.id}
                endIcon={<Add />}
                onClick={e => handleOpen(e)}>
                ADD TASK
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
                    <Typography variant="h6" gutterBottom>Yeni Task</Typography>
                    <br />
                    <Name editable={true} onChange={handleChangeName} item={state} />
                    <br />
                    <br />
                    <Desc editable={true} onChange={handleChangeDesc} item={state} />
                    <br />
                    <br />
                    <Effort editable={true} onChange={handleChangeEffort} item={state} />
                    <br />
                    <br />
                    <User editable={true} onChange={handleChangeUser} item={state} />
                    <br />
                    <br />
                    <IconButton aria-label="ekle" color="primary" style={{ float: "right" }} onClick={addTask} >
                        <Edit />
                    </IconButton>
                    {controlRequiredField &&
                        <Stack sx={{ width: '65%' }} spacing={2}>
                            <Alert severity="error">Lütfen tüm bilgileri doldurunuz.</Alert>
                        </Stack>
                    }
                </Box>
            </Modal>
        </CardActions>
    );
}