import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import Grid from '@mui/material/Grid';
import EmployeeForm  from '../../components/Employee/Form'

export default function CreateEmployee() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Item>
                    <EmployeeForm />
                </Item>
            </Grid>
        </Grid>
    );
}

