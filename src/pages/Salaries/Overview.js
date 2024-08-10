import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button'; // Import Button component
import Item from '../../components/Item';
import DataTable from '../../components/DataTable';
import EmployeesService from '../../services/EmployeesService';

export default function Overview() {
    const employeesService = new EmployeesService();

    // Get employees and add total_salary and process column data
    const employees = employeesService.getAllEmployees().map(employee => ({
        ...employee,
        full_name: employee.first_name + ' ' +  employee.last_name, // Convert to numbers before adding
        total_salary: Number(employee.basic_salary) + Number(employee.salary_allowances), // Convert to numbers before adding
        process: (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleProcess(employee.staff_id)}
            >
                Process
            </Button>
        ),
    }));

    const columns = [
        { id: 'staff_id', label: 'Staff Id', minWidth: 100 },
        { id: 'full_name', label: 'Full Name', minWidth: 100 },
        { id: 'basic_salary', label: 'Basic Salary', minWidth: 100 },
        { id: 'salary_allowances', label: 'Salary Allowances', minWidth: 100 },
        { id: 'total_salary', label: 'Total Salary', minWidth: 100 }, // Add Total Salary column
        { id: 'process', label: 'Process', minWidth: 100 } // Add Process column
    ];

    const handleProcess = (staffId) => {
        // Handle process action here
        console.log(`Processing employee with staff ID: ${staffId}`);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Item>
                    <Typography variant="h3">{employees.length}</Typography>
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
