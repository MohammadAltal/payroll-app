import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

const Routes = [
    {
        title: 'Home',
        icon: <DashboardIcon />,
        path: '/home',
        subItems: []
    },
    {
        title: 'Employees',
        icon: <PeopleIcon />,
        path: '/employees',
        subItems: [
            { text: 'Overview', path: '/employees' },
            { text: 'Create', path: '/employees/create' }
        ]
    },
    {
        title: 'Salaries',
        icon: <BarChartIcon />,
        path: '/salaries',
        subItems: [
            { text: 'Overview', path: '/salaries' },
            { text: 'Payment History', path: '/salaries/payments' }
        ]
    }
];

export default Routes;
