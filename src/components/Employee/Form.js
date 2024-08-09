import React from 'react';
import FormLabel from "@mui/material/FormLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import {styled} from "@mui/system";

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function Form(props) {
    return (
        <Grid container spacing={3}>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    First Name
                </FormLabel>
                <OutlinedInput
                    id="first-name"
                    name="first-name"
                    type="first-name"
                    placeholder="John"
                    autoComplete="first-name"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name" required>
                    Last Name
                </FormLabel>
                <OutlinedInput
                    id="last-name"
                    name="last-name"
                    type="last-name"
                    placeholder="Snow"
                    autoComplete="last-name"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="staff-id" required>
                    Staff Id
                </FormLabel>
                <OutlinedInput
                    id="staff-id"
                    name="staff-id"
                    type="staff-id"
                    placeholder="Ex: 2365"
                    autoComplete="staff id"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name" required>
                    Joining Date
                </FormLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                        <DatePicker  />
                    </DemoContainer>
                </LocalizationProvider>
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="basic-salary" required>
                    Basic Salary
                </FormLabel>
                <OutlinedInput
                    id="basic-salary"
                    name="basic-salary"
                    type="basic-salary"
                    placeholder=""
                    autoComplete="basic salary"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="salary-allowances" required>
                    Salary Allowances
                </FormLabel>
                <OutlinedInput
                    id="salary-allowances"
                    name="salary-allowances"
                    type="salary-allowances"
                    placeholder=""
                    autoComplete="salary allowances"
                    required
                />
            </FormGrid>
            <FormGrid item xs={12} md={12}>
                <Grid>
                    <Button variant="contained" size="medium" sx={{  pr: 5, pl: 5 }}>Save</Button>
                </Grid>
            </FormGrid>
        </Grid>
    );
}

export default Form;

