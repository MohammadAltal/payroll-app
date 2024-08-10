import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import DataTable from '../../components/DataTable';
import EmployeesService from '../../services/EmployeesService';
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ListEmployees() {
    const employeesService = new EmployeesService();
    const [employees, setEmployees] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        autoHideDuration: 5000
    });
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [employeeToDelete, setEmployeeToDelete] = React.useState(null);

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
            onClick={() => openConfirmDialog(id)}
        >
            Delete
        </Button>
    );

    const openConfirmDialog = (id) => {
        setEmployeeToDelete(id);
        setDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (employeeToDelete) {
            employeesService.deleteEmployee(employeeToDelete);
            setEmployees(prevEmployees => {
                const updatedEmployees = employeesService.getAllEmployees().map(employee => ({
                    ...employee,
                    action: createDeleteButton(employee.id),
                }));
                return updatedEmployees;
            });
            setSnackbar({
                open: true,
                message: 'Employee deleted successfully',
                autoHideDuration: 5000
            });
            setEmployeeToDelete(null);
        }
        setDialogOpen(false);
    };

    const handleCancelDelete = () => {
        setEmployeeToDelete(null);
        setDialogOpen(false);
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

            <Dialog
                open={dialogOpen}
                onClose={handleCancelDelete}
            >
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this employee?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDelete} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Grid>
    );
}
