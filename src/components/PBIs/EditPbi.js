import { Alert, CardActions, Snackbar } from "@mui/material";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import pbiAction from '../../redux/actions/pbis';
import { Save } from "@mui/icons-material";
import { useState } from "react";

export default function EditPbi(props) {
    const dispatch = useDispatch();
    const item = props.state;
    const [warning, setWarning] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    function saveClick() {
        props.handleEditable();
        var data = {
            id: item.id,
            name: item.name,
            desc: item.desc,
            effort: item.effort
        }
        
        if (item.name === "" || item.desc === "" || item.effort === "") {
            setOpen(true);
            setWarning(true);
        }
        else {
            dispatch(pbiAction.editPbi(data));
            props.handleNonEditable();
        }
    }

    return (
        <CardActions >
            <Button
                name={item.id}
                key={item.id + "save"}
                variant="contained"
                endIcon={<Save />}
                size="small"
                onClick={saveClick}>
                {props.btnName}
            </Button>

            {warning === true ?
                    <Snackbar
                        open={open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right"
                        }}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            Lütfen tüm alanları doldurunuz..
                        </Alert>
                    </Snackbar>
                :
                <></>
            }
        </CardActions>
    )
}