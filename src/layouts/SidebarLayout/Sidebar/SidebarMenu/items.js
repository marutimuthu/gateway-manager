
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import InfoIcon from '@mui/icons-material/Info';
import RouterIcon from '@mui/icons-material/Router';

const menuItems = [
  {
    heading: 'Gateway Manager',
    items: [
      {
        name: 'Overview',
        link: '/app/overview',
        icon: VerifiedUserTwoToneIcon
      },
      {
        name: 'My Devices',
        link: '/app/devices',
        icon: RouterIcon
      },
      
      // ** In development
      // {
      //   name: 'My Dashboards',
      //   link: '/app/dashboards',
      //   icon: AutoGraphIcon
      // },
      // ** In development

      // {
      //   name: 'Configurations',
      //   link: '/app/storage',
      //   icon: SettingsSuggestIcon
      // },
      // {
      //   name: 'Calendar',
      //   link: '/app/calendar',
      //   icon: CalendarTodayIcon
      // },
      // {
      //   name: 'Blogs',
      //   link: '/app/blogs',
      //   icon: RssFeedIcon
      // },
      {
        name: 'User Guide',
        link: '/app/docs',
        icon: InfoIcon
      }
    ]
  },
  // {
  //   heading: 'User',
  //   items: [
  //     {
  //       name: 'Profile',
  //       link: '/user/profile',
  //       icon: AccountCircleIcon
  //     },
  //     {
  //       name: 'Settings',
  //       link: '/user/settings',
  //       icon: ManageAccountsIcon
  //     },
  //   ]
  // },
];

export default menuItems;
