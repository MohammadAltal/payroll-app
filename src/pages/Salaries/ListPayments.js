import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import DataTable from '../../components/DataTable';
import SalariesService from '../../services/SalariesService';

export default function ListPayments() {
    const salariesService = new SalariesService();


    // Get employees and add total_salary and process column data
    const payments = salariesService.getPayments().map(payment => ({
        ...payment,
        date: payment.month + ' ' + payment.year,
    }));

    const columns = [
        { id: 'staff_id', label: 'Staff Id', minWidth: 100 },
        { id: 'full_name', label: 'Full Name', minWidth: 100 },
        { id: 'basic_salary', label: 'Basic Salary', minWidth: 100 },
        { id: 'salary_allowances', label: 'Salary Allowances', minWidth: 100 },
        { id: 'additions', label: 'Additions', minWidth: 100 },
        { id: 'deductions', label: 'Deductions', minWidth: 100 },
        { id: 'total', label: 'Total', minWidth: 100 },
        { id: 'date', label: 'Date', minWidth: 100 },
        { id: 'notes', label: 'Notes', minWidth: 100 },
    ];

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Item>
                    <Typography variant="h3">{ payments.length }</Typography>
                    <Typography variant="subtitle2">Payments Log</Typography>
                </Item>
            </Grid>

            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <DataTable
                        rows={payments}
                        columns={columns}
                    />
                </Paper>
            </Grid>
        </Grid>
    );
}

