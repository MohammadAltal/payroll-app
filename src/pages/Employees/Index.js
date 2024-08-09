import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import ListEmployees from '../../components/Employee/List';
import EmployeesService from '../../services/EmployeesService';

export default function IndexEmployees() {
    const employeesService = new EmployeesService();

    const employees = employeesService.getAllEmployees();

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Item>
                    <Typography variant="h3">{ employees.length }</Typography>
                    <Typography variant="subtitle2">Employees</Typography>
                </Item>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <ListEmployees
                        rows={employees}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

