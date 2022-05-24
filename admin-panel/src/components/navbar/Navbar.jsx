import React, { useContext } from 'react';
import './navbar.scss';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import avatar from './avatar.jpg';
import { DarkModeContext } from '../../context/darkModeContext';

const Navbar = () => {

    const { dispatch } = useContext(DarkModeContext);

    return (
        <div className='Adnavbar'>
            <div className="wrapper">
                <div className="search">
                    <input type="text" placeholder='Search...' />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        <DarkModeOutlinedIcon
                            className='icon'
                            onClick={() => dispatch({ type: 'TOGGLE' })}
                        />
                    </div>

                    <div className="item">
                        <img src={avatar} alt='' className='avatar' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;