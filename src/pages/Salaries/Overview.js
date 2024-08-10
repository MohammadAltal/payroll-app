import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ProcessSalaryModal from '../../components/ProcessSalaryModal';
import DataTable from '../../components/DataTable';
import EmployeesService from '../../services/EmployeesService'
import SalariesService from '../../services/SalariesService';
import Snackbar from "@mui/material/Snackbar"

export default function Overview() {
    const employeesService = new EmployeesService();
    const salariesService = new SalariesService();

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        anchorOrigin: { vertical: 'top', horizontal: 'center' },
        autoHideDuration: 5000
    });

    const handleCloseSnackbar = () => {
        setSnackbarState({
            ...snackbarState,
            open: false
        });
    };

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

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [formData, setFormData] = React.useState({
        additions: '',
        deductions: '',
        notes: '',
        month: months[new Date().getMonth()],
        year: new Date().getFullYear()
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const [openModal, setOpenModal] = React.useState(false);
    const [selectedEmployee, setSelectedEmployee] = React.useState(null);

    const handleOpenModal = (employee) => {
        setSelectedEmployee(employee);
        setFormData({
            additions: '',
            deductions: '',
            notes: '',
            month: months[new Date().getMonth()],
            year: new Date().getFullYear()
        });
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedEmployee(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Calculate total salary based on form data
        const total = Number(selectedEmployee.basic_salary) + Number(selectedEmployee.salary_allowances) + Number(formData.additions) - Number(formData.deductions);

        // Create a new payment object
        const newPayment = {
            staff_id: selectedEmployee.staff_id,
            full_name: selectedEmployee.first_name + ' ' + selectedEmployee.last_name,
            basic_salary: selectedEmployee.basic_salary,
            salary_allowances: selectedEmployee.salary_allowances,
            additions: formData.additions,
            deductions: formData.deductions,
            total: total.toFixed(2),
            notes: formData.notes,
            month: formData.month,
            year: formData.year
        };

        // Use SalariesService to handle the submission
        const result = salariesService.savePayment(newPayment);

        setSnackbarState({
            ...snackbarState,
            open: true,
            message: result.message
        });

        if (result.success){
            // Optionally close the modal
            setOpenModal(false);
            setSelectedEmployee(null);
        }

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
                    employee={selectedEmployee}
                    onInputChange={handleInputChange}
                    formData={formData}
                />
            )}

            <Snackbar
                anchorOrigin={snackbarState.anchorOrigin}
                open={snackbarState.open}
                message={snackbarState.message}
                key={snackbarState.anchorOrigin.vertical + snackbarState.anchorOrigin.horizontal}
                autoHideDuration={snackbarState.autoHideDuration}
                onClose={handleCloseSnackbar}
            />
        </Grid>
    );
}
