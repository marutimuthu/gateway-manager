import {
    alpha,
    Badge,
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    Popover,
    Tooltip,
    Typography
} from '@mui/material';
import { useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';

function ThemeButton() {

    const handleOpen = () => {
        if (curThemeName == 'PureLightTheme') {
            localStorage.setItem('appTheme', "NebulaFighterTheme");
        } else localStorage.setItem('appTheme', "PureLightTheme");
        window.location.reload(false)
    };
    
    function loadIcon() {
        if (curThemeName == 'PureLightTheme') {
            return <DarkModeIcon />
        } else return <LightModeIcon />
        
    }

    return (
        <>
            <Tooltip arrow title="Theme">
                <IconButton color="primary" onClick={handleOpen}>
                    {/* <LightModeIcon /> */}
                    {loadIcon()}
                </IconButton>
            </Tooltip>

        </>
    );
}

export default ThemeButton;
