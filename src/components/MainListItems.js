import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import {useNavigate} from "react-router-dom";
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import List from '@mui/material/List';

export default function MainListItems() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <ListItemButton onClick={() => { navigate('/dashboard'); }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Employees" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}  onClick={() => { navigate('/employees'); }}>
                        <ListItemText  sx={{ paddingLeft: "40px" }} primary="List" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => { navigate('/employees/create'); }}>
                        <ListItemText  sx={{ paddingLeft: "40px" }} primary="Create" />
                    </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton onClick={() => { navigate('/salaries'); }}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Salaries" />
            </ListItemButton>
        </React.Fragment>
    );
}
