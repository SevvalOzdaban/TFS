import { Alert, Box, Button, IconButton, Modal, Stack, Typography } from "@mui/material";
import Name from "../../commons/Name";
import Desc from "../../commons/Desc";
import Effort from "../../commons/Effort";
import { Add, Edit } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import taskAction from '../../redux/actions/tasks';
import userAction from '../../redux/actions/users';
import User from "../../commons/User";

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

export default function EditTask(props) {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    const item = props.item;
    const [open, setOpen] = useState(false);
    const [controlRequiredField, setControlRequiredField] = useState(false);
    const [state, setState] = useState({
        id: item.id,
        name: item.name,
        desc: item.desc,
        effort: item.effort,
        user: item.user
    });
    console.log("props2",item)
    const handleOpen = () => {
        setOpen(true);
        setControlRequiredField(false)
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

    const editTask = () => {
        var id = myState.taskReducer.tasks.length;
        var data = {
            id: id,
            name: state.name,
            desc: state.desc,
            effort: state.effort,
            sprintId: myState.sprintReducer?.selectedSpring,
            user: state.user
        }
        if (state.name === "" || state.desc === "" || state.effort === "" || state.user === "") {
            setControlRequiredField(true)
        }
        else {
            handleClose();
            dispatch(taskAction.editTask(data));
            var effortData = { effort: 0,user: state.user}
            if (item.effort > state.effort){
                effortData.effort = (-1) * (Number(item.effort) - Number(state.effort))
            }
            else{
                effortData.effort =  (Number(item.effort) - Number(state.effort))
            }
            dispatch(userAction.updateUserRemainingHour(effortData));
        }

    }
    return (
        <>
            <Button
                variant="contained"
                endIcon={<Edit />}
                size="small"
                style={{ margin: 5 }}
                onClick={handleOpen}>
                EDIT
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h6" gutterBottom>Güncel Task</Typography>
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
                    <IconButton aria-label="ekle" color="primary" style={{ float: "right" }} onClick={editTask} >
                        <Add />
                    </IconButton>
                    <br />
                    <br />
                    {controlRequiredField ?
                        (<Stack sx={{ width: '65%' }} spacing={2}>
                            <Alert severity="error">Lütfen tüm bilgileri doldurunuz.</Alert>
                        </Stack>) : <></>
                    }
                </Box>
            </Modal>
        </>
    )
}