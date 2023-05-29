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
import { useContext } from 'react';

import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { SidebarContext } from 'src/contexts/SidebarContext';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import Sidebar from 'src/layouts/SidebarLayout/Sidebar';

const curThemeName = localStorage.getItem('appTheme') || 'PureLightTheme';

function SidebarToggle() {
    const { sidebarToggle, toggleSidebar } = useContext(SidebarContext);

    return (

        <>
            <Tooltip arrow title="Toggle Sidebar">
                <IconButton color="primary" onClick={toggleSidebar}>
                    {!sidebarToggle ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
                </IconButton>
            </Tooltip>

        </>
    );
}

export default SidebarToggle;
