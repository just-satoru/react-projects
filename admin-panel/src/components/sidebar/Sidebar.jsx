import React, { useContext } from 'react';
import './sidebar.scss';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import BarChartIcon from '@mui/icons-material/BarChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import PsychologyIcon from '@mui/icons-material/Psychology';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../context/darkModeContext';

const Sidebar = () => {

    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className='sidebar'>
            <div className='top'>
                <Link to='/' style={{ textDecoration: 'none' }}>
                    <span className='logo'>Egor Leonidov</span>
                </Link>
            </div>
            <hr />
            <div className='center'>
                <ul>
                    <p className="title">MAIN</p>
                    <Link to='/' style={{ textDecoration: 'none' }}>
                    <li>
                        <DashboardIcon className='icon' />
                        <span>Dashboard</span>
                    </li>
                    </Link>
                    <p className="title">LISTS</p>

                    <Link to='/users' style={{ textDecoration: 'none' }}>
                        <li>
                            <PersonOutlineOutlinedIcon className='icon' />
                            <span>Users</span>
                        </li>
                    </Link>
                    <Link to='/products' style={{ textDecoration: 'none' }}>
                        <li>
                            <StoreMallDirectoryIcon className='icon' />
                            <span>Products</span>
                        </li>
                    </Link>
                    <Link to='/orders' style={{ textDecoration: 'none' }}>
                    <li>
                        <CreditCardIcon className='icon' />
                        <span>Orders</span>
                    </li>
                    </Link>
                    <Link to='/orders' style={{ textDecoration: 'none' }}>
                    </Link>
                    <p className="title">USER</p>
                    <Link to='/profile' style={{ textDecoration: 'none' }}>
                    <li>
                        <AccountCircleIcon className='icon' />
                        <span>Profile</span>
                    </li>
                    </Link>
                    <Link to='/login' style={{ textDecoration: 'none' }}>
                    <li onClick={() => localStorage.clear()}>
                        <LogoutIcon className='icon' />
                        <span>Logout</span>
                    </li>
                    </Link>
                </ul>
            </div>
            <div className='bottom'>
                <div className="colorOption" onClick={() => dispatch({ type: 'LIGHT' })}></div>
                <div className="colorOption" onClick={() => dispatch({ type: 'DARK' })}></div>
            </div>
        </div>
    );
};

export default Sidebar;