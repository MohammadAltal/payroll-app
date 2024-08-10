import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import DataTable from '../../components/DataTable';

import EmployeesService from '../../services/EmployeesService';

export default function ListEmployees() {
    const employeesService = new EmployeesService();

    const employees = employeesService.getAllEmployees();
    const columns = [
        { id: 'staff_id', label: 'Staff Id', minWidth: 100 },
        { id: 'first_name', label: 'First Name', minWidth: 100 },
        { id: 'last_name', label: 'Last Name', minWidth: 100 },
        { id: 'basic_salary', label: 'Basic Salary', minWidth: 100 },
        { id: 'salary_allowances', label: 'Salary Allowances', minWidth: 100 },
        { id: 'joining_date', label: 'Joining Date', minWidth: 100 },
    ];

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
                    <DataTable
                        rows={employees}
                        columns={columns}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

