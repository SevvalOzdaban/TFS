import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import pbiAction from '../../redux/actions/pbis';
import pbiData from '../../dummyDatas/pbis.json'
import PbiItem from './PbiItem';
import AddPbi from './AddPbi';
import { Grid, Typography } from '@mui/material';
import SelectSprint from '../Sprints/SelectSprint';

export default function PBIs() {
    const myState = useSelector(state => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (myState.pbiReducer.pbis.length == 0)
            dispatch(pbiAction.loadPbiList(pbiData));
    }, [])
    return (

        <Grid container spacing={2} paddingLeft={7}>
            <Grid item xs={8}>
                <SelectSprint />
            </Grid>
            <Grid item xs={4}>
                <AddPbi />
            </Grid>
            
                {
                    myState.pbiReducer.pbis.filter(elem => elem.sprintId == myState.sprintReducer.selectedSpring).map((item, key) => {
                        return (
                            <PbiItem key={item.id} item={item} />
                        );
                    })
                }
         
        </Grid >
    );
}

