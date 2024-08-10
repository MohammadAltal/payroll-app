import * as React from 'react';
import Item from '../../components/Item';
import Grid from '@mui/material/Grid';
import EmployeeForm from '../../components/Employee/Form';
import dayjs from 'dayjs';
import EmployeesService from '../../services/EmployeesService';
import {useNavigate} from "react-router-dom"; // Adjust the path as necessary

export default function Form() {
    const employeesService = new EmployeesService();
    const navigate = useNavigate();

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

        // Prepare the employee data
        const employeeData = {
            ...formData,
            joining_date: formattedJoiningDate,
        };

        // Save the employee data using the EmployeesService
        employeesService.saveEmployee(employeeData);

        navigate('/employees');
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
