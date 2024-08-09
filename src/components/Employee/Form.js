import React from 'react';
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function Form({ formData, onInputChange, onDateChange, onSubmit }) {
    return (
        <Grid container spacing={3} component="form" onSubmit={onSubmit}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first_name" required>
                    First Name
                </FormLabel>
                <OutlinedInput
                    id="first_name"
                    name="first_name"
                    type="text"
                    placeholder="John"
                    autoComplete="first_name"
                    required
                    value={formData.first_name}
                    onChange={onInputChange}
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last_name" required>
                    Last Name
                </FormLabel>
                <OutlinedInput
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Snow"
                    autoComplete="last_name"
                    required
                    value={formData.last_name}
                    onChange={onInputChange}
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="staff_id" required>
                    Staff Id
                </FormLabel>
                <OutlinedInput
                    id="staff_id"
                    name="staff_id"
                    type="text"
                    placeholder="Ex: 2365"
                    autoComplete="staff id"
                    required
                    value={formData.staff_id}
                    onChange={onInputChange}
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="joining_date" required>
                    Joining Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker
                            value={formData.joining_date}
                            onChange={onDateChange} // Use the passed handler
                            renderInput={(params) => <OutlinedInput {...params} />}
                        />
                    </DemoContainer>
                </LocalizationProvider>
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="basic_salary" required>
                    Basic Salary
                </FormLabel>
                <OutlinedInput
                    id="basic_salary"
                    name="basic_salary"
                    type="text"
                    placeholder=""
                    autoComplete="basic salary"
                    required
                    value={formData.basic_salary}
                    onChange={onInputChange}
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="salary_allowances" required>
                    Salary Allowances
                </FormLabel>
                <OutlinedInput
                    id="salary_allowances"
                    name="salary_allowances"
                    type="text"
                    placeholder=""
                    autoComplete="salary allowances"
                    required
                    value={formData.salary_allowances}
                    onChange={onInputChange}
                />
            </FormGrid>
            <FormGrid item xs={12} md={12}>
                <Grid>
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{ pr: 5, pl: 5 }}
                        type="submit"
                    >
                        Save
                    </Button>
                </Grid>
            </FormGrid>
        </Grid>
    );
}

export default Form;
