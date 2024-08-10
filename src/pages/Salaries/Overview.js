import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ProcessSalaryModal from '../../components/ProcessSalaryModal';
import DataTable from '../../components/DataTable';
import EmployeesService from '../../services/EmployeesService';

export default function Overview() {
    const employeesService = new EmployeesService();

    // Get employees and add total_salary and process column data
    const employees = employeesService.getAllEmployees().map(employee => ({
        ...employee,
        full_name: employee.first_name + ' ' + employee.last_name,
        total_salary: Number(employee.basic_salary) + Number(employee.salary_allowances),
        process: (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(employee)}
            >
                Process
            </Button>
        ),
    }));

    const [openModal, setOpenModal] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEmployee(null);
    };

    const handleSubmit = () => {
        // Handle submit logic here
        console.log('Processing...', selectedEmployee);
        setOpenModal(false);
    };

    const columns = [
        { id: 'staff_id', label: 'Staff Id', minWidth: 100 },
        { id: 'full_name', label: 'Full Name', minWidth: 100 },
        { id: 'basic_salary', label: 'Basic Salary', minWidth: 100 },
        { id: 'salary_allowances', label: 'Salary Allowances', minWidth: 100 },
        { id: 'total_salary', label: 'Total Salary', minWidth: 100 },
        { id: 'process', label: 'Process', minWidth: 100 }
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <DataTable
                        rows={employees}
                        columns={columns}
                    />
                </Paper>
            </Grid>

            {selectedEmployee && (
                <ProcessSalaryModal
                    open={openModal}
                    handleClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    basicSalary={selectedEmployee.basic_salary}
                    salaryAllowances={selectedEmployee.salary_allowances}
                />
            )}
        </Grid>
    );
}
