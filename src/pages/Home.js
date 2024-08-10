import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Item from '../components/Item';
import EmployeesService from '../services/EmployeesService';
import SalariesService from '../services/SalariesService';

export default function Home() {
    const employeesService = new EmployeesService();
    const salariesService = new SalariesService();

    const employees = employeesService.getAllEmployees();
    const payments  = salariesService.getPayments();

    return (
        <Grid container spacing={2}>
            <Grid item xs={6} sx={{ textAlign: 'center'}}>
                <Item>
                    <Typography variant="h2">{employees.length}</Typography>
                    <Typography variant="subtitle3">Employees</Typography>
                </Item>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'center'}}>
                <Item>
                    <Typography variant="h2">{payments.length}</Typography>
                    <Typography variant="subtitle3">Payments Log</Typography>
                </Item>
            </Grid>
        </Grid>
    );
}
