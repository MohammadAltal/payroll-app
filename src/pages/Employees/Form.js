import * as React from 'react';
import Item from '../../components/Item';
import Grid from '@mui/material/Grid';
import EmployeeForm from '../../components/Employee/Form';
import dayjs from 'dayjs';
import EmployeesService from '../../services/EmployeesService';
import { useNavigate, useParams } from "react-router-dom";

export default function Form() {
    const { id } = useParams();
    const employeesService = new EmployeesService();
    const navigate = useNavigate();

    const initialFormData = {
        first_name: '',
        last_name: '',
        staff_id: '',
        basic_salary: '',
        salary_allowances: '',
        joining_date: dayjs(),
    };

    const [formData, setFormData] = React.useState(initialFormData);

    const isEditing = Boolean(id && id !== 'create');
    const action = isEditing ? 'Edit' : 'Add';

    React.useEffect(() => {
        if (isEditing) {
            const employee = employeesService.getEmployeeById(id);
            if (employee) {
                setFormData({
                    ...employee,
                    joining_date: dayjs(employee.joining_date),
                });
            }
        } else {
            setFormData(initialFormData); // Reset formData to initial state
        }
    }, [id, isEditing]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (newDate) => {
        setFormData(prevData => ({ ...prevData, joining_date: newDate }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const formattedJoiningDate = formData.joining_date.format('YYYY/MM/DD');

        if (isEditing){
            employeesService.updateEmployeeById(id,{ ...formData, joining_date: formattedJoiningDate });
        } else {
            employeesService.saveEmployee({ ...formData, joining_date: formattedJoiningDate });
        }

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
                        action={action}
                    />
                </Item>
            </Grid>
        </Grid>
    );
}
