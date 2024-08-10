import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import DataTable from '../../components/DataTable';

import EmployeesService from '../../services/EmployeesService';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

export default function ListEmployees() {
    const employeesService = new EmployeesService();
    const [employees, setEmployees] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        autoHideDuration: 5000
    });

    React.useEffect(() => {
        const fetchEmployees = () => {
            const employeesList = employeesService.getAllEmployees().map(employee => ({
                ...employee,
                action: createDeleteButton(employee.id),
            }));
            setEmployees(employeesList);
        };
        fetchEmployees();
    }, []);

    const createDeleteButton = (id) => (
        <Button
            variant="outlined"
            color="error"
            onClick={() => handleDelete(id)}
        >
            Delete
        </Button>
    );

    const handleDelete = (id) => {
        employeesService.deleteEmployee(id);
        setEmployees(prevEmployees => {
            return employeesService.getAllEmployees().map(employee => ({
                ...employee,
                action: createDeleteButton(employee.id),
            }));
        });
        setSnackbar({
            open: true,
            message: 'Employee deleted successfully',
            autoHideDuration: 5000
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const columns = [
        { id: 'staff_id', label: 'Staff Id', minWidth: 100 },
        { id: 'first_name', label: 'First Name', minWidth: 100 },
        { id: 'last_name', label: 'Last Name', minWidth: 100 },
        { id: 'basic_salary', label: 'Basic Salary', minWidth: 100 },
        { id: 'salary_allowances', label: 'Salary Allowances', minWidth: 100 },
        { id: 'joining_date', label: 'Joining Date', minWidth: 100 },
        { id: 'action', label: 'Action', minWidth: 100 }
    ];

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

            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                autoHideDuration={snackbar.autoHideDuration}
                onClose={handleCloseSnackbar}
            />
        </Grid>
    );
}
