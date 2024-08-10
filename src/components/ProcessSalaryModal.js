import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

export default function ProcessSalaryModal({ open, handleClose, onSubmit, basicSalary, salaryAllowances }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="process-modal-title"
            aria-describedby="process-modal-description"
        >
            <Box sx={style}>
                <h2 id="process-modal-title">Process Employee</h2>
                <TextField
                    fullWidth
                    label="Basic Salary"
                    margin="normal"
                    value={basicSalary}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    fullWidth
                    label="Salary Allowances"
                    margin="normal"
                    value={salaryAllowances}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <Button variant="contained" color="primary" onClick={onSubmit} sx={{ mt: 2 }}>
                    Submit
                </Button>
            </Box>
        </Modal>
    );
}
