import * as React from 'react';
import Item from '../../components/Item';
import Grid from '@mui/material/Grid';
import EmployeeForm from '../../components/Employee/Form';
import dayjs from 'dayjs';

export default function CreateEmployee() {
    const [formData, setFormData] = React.useState({
        first_name: '',
        last_name: '',
        staff_id: '',
        basic_salary: '',
        salary_allowances: '',
        joining_date: dayjs(),  // Default to today's date
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDateChange = (newDate) => {
        setFormData((prevData) => ({
            ...prevData,
            joining_date: newDate,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedJoiningDate = formData.joining_date ? dayjs(formData.joining_date).format('YYYY/MM/DD') : '';

        console.log({
            ...formData,
            joining_date: formattedJoiningDate,  // Format the date here
        });
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Item>
                    <EmployeeForm
                        formData={formData}
                        onInputChange={handleInputChange}
                        onDateChange={handleDateChange}
                        onSubmit={handleSubmit}
                    />
                </Item>
            </Grid>
        </Grid>
    );
}
