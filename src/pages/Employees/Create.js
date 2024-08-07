import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';

export default function CreateEmployee() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Item>
                    <Typography variant="h4">Employees</Typography>
                    <Typography variant="subtitle2">Management</Typography>
                </Item>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    Employee
                </Paper>
            </Grid>
        </Grid>
    );
}

