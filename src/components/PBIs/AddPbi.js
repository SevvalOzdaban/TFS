import { Alert, Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from "react-redux";
import pbiAction from '../../redux/actions/pbis';
import { Add } from "@mui/icons-material";
import { useState } from "react";
import Name from "../../commons/Name";
import Desc from "../../commons/Desc";
import Effort from "../../commons/Effort";


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

export default function AddPbi() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();
    
    const [open, setOpen] = useState(false);
    const [controlRequiredField, setControlRequiredField] = useState(false);
    const [pbiState, setPbiState] = useState({
        id: "",
        name: "",
        desc: "",
        effort: "",
        sprintId: ""
    });
    const handleOpen = () => {
        setOpen(true);
        setControlRequiredField(false)
    }

    const handleClose = () => setOpen(false);

    const handleChangeName = (newName) => {
        setPbiState({ ...pbiState, name: newName, sprintId: myState.sprintReducer?.selectedSpring})
    }

    const handleChangeDesc = (newDesc) => {
        setPbiState({ ...pbiState, desc: newDesc, sprintId: myState.sprintReducer?.selectedSpring })
    }

    const handleChangeEffort = (newEffort) => {
        setPbiState({ ...pbiState, effort: newEffort, sprintId: myState.sprintReducer?.selectedSpring })
    }

    const addPBI = () => {
        if (pbiState.name === "" && pbiState.desc === "" && pbiState.effort === "")
            setControlRequiredField(true)

        else {
            setControlRequiredField(false)
            dispatch(pbiAction.addPbi(pbiState));
            setPbiState({ id: "", name: "", desc: "", effort: "" })
            handleClose();
        }
    }

    return (
        <div>
            <Button variant="contained" style={{ marginLeft: "50px" }} endIcon={<Add />} onClick={handleOpen}>
                ADD PBI
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
                    <Typography variant="h6" gutterBottom>Yeni PBI</Typography>
                    <br />
                    <Name editable={true} onChange={handleChangeName} item={pbiState} />
                    <br />
                    <br />
                    <Desc editable={true} onChange={handleChangeDesc} item={pbiState} />
                    <br />
                    <br />
                    <Effort editable={true} onChange={handleChangeEffort} item={pbiState} />
                    <br />
                    <br />

                    <IconButton aria-label="ekle" color="primary" style={{ float: "right" }} onClick={addPBI} >
                        <Add />
                    </IconButton>

                    <br />
                    <br />
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