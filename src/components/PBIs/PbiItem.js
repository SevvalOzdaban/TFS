import * as React from 'react';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Effort from '../../commons/Effort';
import EditPbi from './EditPbi';
import Name from '../../commons/Name';
import Desc from '../../commons/Desc';
import { Box, Card, CardActions, Collapse, Grid } from '@mui/material';
import DeletePBI from './DeletePBI';
import AddTaskModal from '../Tasks/AddTaskModal';
import { useSelector } from 'react-redux';
import TaskItem from '../Tasks/TaskItem';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export default function PbiItem(props) {
    const myState = useSelector(state => state);
    const item = props.item;
    console.log(myState)
    const [editable, setEditable] = useState(false);
    const [state, setState] = useState({
        id: item.id,
        name: item.name,
        desc: item.desc,
        effort: item.effort
    });

    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleEditable = () => {
        setEditable(true);
    }
    const handleNonEditable = () => {
        setEditable(false);
    }
    const handleChangeName = (newName) => {
        setState({ ...state, name: newName })
    }
    const handleChangeDesc = (newDesc) => {
        setState({ ...state, desc: newDesc })
    }
    const handleChangeEffort = (newEffort) => {
        setState({ ...state, effort: newEffort })
    }

    return (
        <Grid item xs={4}>
            <Card sx={{ maxWidth: 500, boxShadow: 5}}>
                <CardContent>
                    {
                        editable === true ?
                            <Name onChange={handleChangeName} item={item} editable={editable} />
                            : <Button variant="text" name={item.id.toString()} onClick={handleEditable}>{item.name}</Button>
                    }
                    <br /><br />
                    <Desc onChange={handleChangeDesc} item={item} editable={editable} /> <br /><br />
                    <Effort onChange={handleChangeEffort} item={item} editable={editable} />
                </CardContent>
                <CardActions>
                    <EditPbi btnName={"EDIT"} handleEditable={handleEditable} handleNonEditable={handleNonEditable} state={state} />
                    <DeletePBI id={item.id} />
                    <AddTaskModal id={item.id} />
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <Grid container>
                        {
                            myState.taskReducer.tasks.filter(task => task.sprintId == item.id).map(elem => {
                                return <TaskItem key={elem.id} item={elem} />;
                            })
                        }
                    </Grid>
                </Collapse>
            </Card>
            <br /><br />
        </Grid>
    )
}