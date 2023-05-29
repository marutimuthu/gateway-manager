import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  // console.log(userInfo)

  const user =
  {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{ mr: 2, width: theme.spacing(8), height: theme.spacing(8) }}
          variant="rounded"
          alt={userInfo.email}
          src={user.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Welcome, {userInfo.username}!
        </Typography>
        <Typography variant="subtitle2">
          Manage your Industrial IoT network with ease
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
