import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import Snackbar from '@mui/material/Snackbar';

const defaultTheme = createTheme();

export default function SignIn() {
    const authService = new AuthService();
    const navigate = useNavigate();

    const [snackbarState, setSnackbarState] = useState({
        open: false,
        message: '',
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
    });

    const handleSnackbarClose = () => {
        setSnackbarState((prev) => ({ ...prev, open: false }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const email = data.get('email');
        const password = data.get('password');
        console.log({ email, password });

        if (!authService.loginUser(email, password)) {
            setSnackbarState({
                open: true,
                message: 'Invalid username/password.',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
            });
        } else {
            navigate('/home');
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="#" variant="body2" onClick={() => navigate('/signup')}>
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Snackbar
                    anchorOrigin={snackbarState.anchorOrigin}
                    open={snackbarState.open}
                    onClose={handleSnackbarClose}
                    message={snackbarState.message}
                    key={snackbarState.anchorOrigin.vertical + snackbarState.anchorOrigin.horizontal}
                />
            </Container>
        </ThemeProvider>
    );
}
