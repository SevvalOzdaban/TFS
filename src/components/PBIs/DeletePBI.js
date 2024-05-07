import { Delete } from "@mui/icons-material";
import { Button, CardActions } from "@mui/material";
import pbiAction from '../../redux/actions/pbis';
import { useDispatch } from "react-redux";

export default function DeletePBI(props) {
    const dispatch = useDispatch();
    const deletePbi = () => {
        dispatch(pbiAction.deletePbi(props.id))
    }
    return (
        <CardActions>
            <Button
                variant="contained"
                size="small"
                endIcon={<Delete />}
                onClick={deletePbi}>
                DELETE
            </Button>
        </CardActions>
    )
}