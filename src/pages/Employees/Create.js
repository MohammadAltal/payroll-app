import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Item from '../../components/Item';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

export default function CreateEmployee() {
    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Item>
                    <Typography variant="h4">Employees</Typography>
                    <Typography variant="subtitle2">Management</Typography>
                </Item>
            </Grid>

            <Grid item xs={12}>
                <Grid container spacing={3}>
                    <FormGrid item xs={12} md={6}>
                        <FormLabel htmlFor="first-name" required>
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
                        <FormLabel htmlFor="name" required>
                            Name
                        </FormLabel>
                        <OutlinedInput
                            id="name"
                            name="name"
                            type="name"
                            placeholder="John"
                            autoComplete="name"
                            required
                        />
                    </FormGrid>


                </Grid>
            </Grid>
        </Grid>
    );
}

