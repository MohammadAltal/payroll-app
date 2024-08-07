import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import {useNavigate} from "react-router-dom";

export default function MainListItems() {
    const navigate = useNavigate();
    return (
        <React.Fragment>
            <ListItemButton onClick={() => { navigate('/dashboard'); }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/employees'); }}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Employees" />
            </ListItemButton>
            <ListItemButton onClick={() => { navigate('/salaries'); }}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Salaries" />
            </ListItemButton>
        </React.Fragment>
    );
}
