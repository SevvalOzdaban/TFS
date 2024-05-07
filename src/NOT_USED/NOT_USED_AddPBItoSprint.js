import { useDispatch } from "react-redux";
import pbiAction from '../redux/actions/pbis';
import taskAction from '../redux/actions/tasks';
import { Add, Remove } from "@mui/icons-material";
import { Button } from "@mui/material";

export default function AddPBItoSprint(props) {
    const dispatch = useDispatch();
    const item = props.item;

    const addPbiToSprint = (event) => {
        var data = {
            id: Number(event.target.name),
            statu: 2
        }
        dispatch(pbiAction.changePbiStatu(data))
    }

    const deletePbiFromSprint = (event) => {
        var statuData = {
            id: Number(event.target.name),
            statu: 1
        }
        var deletePbiData = {
            sprintId: event.target.name,
        }
        dispatch(pbiAction.changePbiStatu(statuData))
        dispatch(taskAction.deleteTask(deletePbiData))
    }
    return (
        <>
            {item.statu == 1 ?
                (<Button
                    name={item.id}
                    size="medium"
                    color="error"
                    endIcon={<Add />}
                    onClick={addPbiToSprint}>
                    ADD TO SPRINT
                </Button>)
                : <Button
                    name={item.id}
                    size="medium"
                    color="error"
                    endIcon={<Remove />}
                    onClick={deletePbiFromSprint}>
                    DELETE TO SPRINT
                </Button>
            }
        </>
    )
}