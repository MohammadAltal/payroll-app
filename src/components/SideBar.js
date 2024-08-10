import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate, useLocation } from 'react-router-dom';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';

const NavigationItem = ({ icon, primary, onClick, endIcon, selected }) => (
    <ListItemButton onClick={onClick} selected={selected}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={primary} />
        {endIcon}
    </ListItemButton>
);

const CollapsibleList = ({ title, items, isOpen, onToggle, navigate, location, icon, path }) => {
    const handleClick = () => {
        if (items.length === 0) {
            // Navigate to the path if no subItems
            navigate(path);
        } else {
            onToggle(); // Toggle collapse if subItems are present
        }
    };

    return (
        <>
            <NavigationItem
                icon={icon}
                primary={title}
                onClick={handleClick}
                endIcon={items.length > 0 ? (isOpen ? <ExpandLess /> : <ExpandMore />) : null}
                selected={items.length > 0 ? false : location.pathname.startsWith(path)}
            />
            {items.length > 0 && (
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {items.map((item, index) => (
                            <NavigationItem
                                key={index}
                                sx={{ pl: 4 }}
                                primary={item.text}
                                onClick={() => navigate(item.path)}
                                selected={location.pathname === item.path}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    );
};

export default function SideBar({ routes }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [openSections, setOpenSections] = React.useState({});

    // Determine which sections should be open based on the URL path
    React.useEffect(() => {
        const path = location.pathname;
        const updatedSections = {};

        routes.forEach(section => {
            if (path.startsWith(section.path)) {
                updatedSections[section.title] = true;
            }
        });

        setOpenSections(updatedSections);
    }, [location.pathname]);

    const handleToggle = (title) => {
        setOpenSections(prev => ({
            ...prev,
            [title]: !prev[title]
        }));
    };

    return (
        <>
            {routes.map(section => (
                <CollapsibleList
                    key={section.title}
                    title={section.title}
                    items={section.subItems}
                    isOpen={!!openSections[section.title]}
                    onToggle={() => handleToggle(section.title)}
                    navigate={navigate}
                    location={location}
                    icon={section.icon}
                    path={section.path} // Pass the path directly
                />
            ))}
        </>
    );
}
