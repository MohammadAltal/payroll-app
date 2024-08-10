import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Divider from '@mui/material/Divider';
import { styled } from "@mui/system";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3, // Reduced padding
};

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function ProcessSalaryModal({ open, handleClose, onSubmit, onInputChange, employee, formData }) {
    const currentYear = new Date().getFullYear();
    const years = Array.from(new Array(10), (val, index) => currentYear - index);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const calculateSummary = () => {
        const basicSalary = Number(employee.basic_salary) || 0;
        const salaryAllowances = Number(employee.salary_allowances) || 0;
        const additionsAmount = parseFloat(formData.additions) || 0;
        const deductionsAmount = parseFloat(formData.deductions) || 0;

        return (basicSalary + salaryAllowances + additionsAmount - deductionsAmount).toFixed(2);
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="process-modal-title"
            aria-describedby="process-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                    Process Salary [ Employee #{employee.staff_id} ]
                </Typography>
                <Grid container spacing={2}  component="form" onSubmit={onSubmit}> {/* Reduced spacing */}
                    <FormGrid item xs={12} md={6} sx={{ marginBottom: '-25px'}}>
                        <TextField
                            fullWidth
                            label="Basic Salary"
                            margin="normal"
                            name="basic_salary"
                            value={employee.basic_salary}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormGrid>
                    <FormGrid item xs={12} md={6} sx={{ marginBottom: '-25px'}}>
                        <TextField
                            fullWidth
                            label="Salary Allowances"
                            name="salary_allowances"
                            margin="normal"
                            value={employee.salary_allowances}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </FormGrid>
                    <FormGrid item xs={12} md={6} sx={{ marginBottom: '-25px'}}>
                        <TextField
                            fullWidth
                            label="Additions"
                            name="additions"
                            margin="normal"
                            value={formData.additions}
                            onChange={onInputChange}
                        />
                    </FormGrid>
                    <FormGrid item xs={12} md={6} sx={{ marginBottom: '-25px'}}>
                        <TextField
                            fullWidth
                            label="Deductions"
                            name="deductions"
                            margin="normal"
                            value={formData.deductions}
                            onChange={onInputChange}
                        />
                    </FormGrid>
                    <FormGrid item xs={12} md={6} sx={{ marginBottom: '-25px'}}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Year</InputLabel>
                            <Select
                                label="Year"
                                name="year"
                                value={formData.year}
                                onChange={onInputChange}
                            >
                                {years.map(year => (
                                    <MenuItem key={year} value={year}>
                                        {year}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGrid>
                    <FormGrid item xs={12} md={6} sx={{ marginBottom: '-25px'}}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel>Month</InputLabel>
                            <Select
                                label="Month"
                                name="month"
                                value={formData.month}
                                onChange={onInputChange}
                            >
                                {months.map((month, index) => (
                                    <MenuItem key={index} value={month}>
                                        {month}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </FormGrid>
                    <FormGrid item xs={12} sx={{ marginBottom: '-20px'}}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Notes"
                            margin="normal"
                            name="notes"
                            value={formData.notes}
                            onChange={onInputChange}
                        />
                    </FormGrid>
                    <FormGrid item xs={12}  sx={{ marginBottom: '-20px'}}>
                        <Divider sx={{ my: 2 }} />
                    </FormGrid>
                    <FormGrid item xs={12}>
                        <Typography variant="h6">
                            Total Salary: {calculateSummary()}
                        </Typography>
                    </FormGrid>

                    <FormGrid item xs={12}  md={12}>
                        <Grid>
                            <Button
                                variant="contained"
                                size="medium"
                                color="primary"
                                onClick={onSubmit}
                                sx={{ pr: 5, pl: 5 }}
                                type="submit"
                            >
                                Process
                            </Button>
                        </Grid>
                    </FormGrid>
                </Grid>
            </Box>
        </Modal>
    );
}
