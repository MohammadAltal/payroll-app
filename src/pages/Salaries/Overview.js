import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ProcessSalaryModal from '../../components/ProcessSalaryModal';
import DataTable from '../../components/DataTable';
import EmployeesService from '../../services/EmployeesService';
import SalariesService from '../../services/SalariesService';
import Snackbar from '@mui/material/Snackbar';

export default function Overview() {
    const employeesService = new EmployeesService();
    const salariesService = new SalariesService();

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        autoHideDuration: 5000
    });

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const [modal, setModal] = useState({
        open: false,
        employee: null,
        formData: {
            additions: '',
            deductions: '',
            notes: '',
            month: months[new Date().getMonth()],
            year: new Date().getFullYear()
        }
    });

    const employees = employeesService.getAllEmployees().map(employee => ({
        ...employee,
        full_name: `${employee.first_name} ${employee.last_name}`,
        total_salary: Number(employee.basic_salary) + Number(employee.salary_allowances),
        action: (
            <Button
                variant="contained"
                color="primary"
                onClick={() => handleOpenModal(employee)}
            >
                Process
            </Button>
        ),
    }));

    const handleOpenModal = (employee) => {
        setModal({
            open: true,
            employee,
            formData: {
                additions: '',
                deductions: '',
                notes: '',
                month:  months[new Date().getMonth()],
                year: new Date().getFullYear()
            }
        });
    };

    const handleCloseModal = () => {
        setModal(prev => ({
            ...prev,
            open: false,
            employee: null
        }));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModal(prev => ({
            ...prev,
            formData: {
                ...prev.formData,
                [name]: value
            }
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const { employee, formData } = modal;
        const total = Number(employee.basic_salary) + Number(employee.salary_allowances) + Number(formData.additions) - Number(formData.deductions);

        const newPayment = {
            staff_id: employee.staff_id,
            full_name: `${employee.first_name} ${employee.last_name}`,
            basic_salary: employee.basic_salary,
            salary_allowances: employee.salary_allowances,
            additions: formData.additions,
            deductions: formData.deductions,
            total: total.toFixed(2),
            notes: formData.notes,
            month: formData.month,
            year: formData.year
        };

        const result = salariesService.savePayment(newPayment);

        setSnackbar({
            open: true,
            message: result.message,
            autoHideDuration: 5000
        });

        if (result.success) {
            handleCloseModal();
        }
    };

    const columns = [
        { id: 'staff_id', label: 'Staff Id', minWidth: 100 },
        { id: 'full_name', label: 'Full Name', minWidth: 100 },
        { id: 'basic_salary', label: 'Basic Salary', minWidth: 100 },
        { id: 'salary_allowances', label: 'Salary Allowances', minWidth: 100 },
        { id: 'total_salary', label: 'Total Salary', minWidth: 100 },
        { id: 'action', label: 'Action', minWidth: 100 }
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

            {modal.open && (
                <ProcessSalaryModal
                    open={modal.open}
                    handleClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    employee={modal.employee}
                    onInputChange={handleInputChange}
                    formData={modal.formData}
                />
            )}

            <Snackbar
                open={snackbar.open}
                message={snackbar.message}
                autoHideDuration={snackbar.autoHideDuration}
                onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            />
        </Grid>
    );
}
