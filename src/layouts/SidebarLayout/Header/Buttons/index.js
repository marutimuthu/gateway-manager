import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import ThemeButton from './Theme';
import SidebarToggle from './SidebarToggle';

function HeaderButtons() {
  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: .5 }} component="span">
        {/* <SidebarToggle /> */}
        <ThemeButton />
        <HeaderNotifications />
      </Box>
      <HeaderSearch />
    </Box>
  );
}

export default HeaderButtons;
