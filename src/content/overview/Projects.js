import {
  Button,
  Card,
  Box,
  CardContent,
  CardHeader,
  CardActions,
  Grid,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
  AvatarGroup,
  LinearProgress,
  Badge
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Link as RouterLink } from 'react-router-dom';
import Text from 'src/components/Text';
import CalendarTodayTwoToneIcon from '@mui/icons-material/CalendarTodayTwoTone';
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import StarTwoToneIcon from '@mui/icons-material/StarTwoTone';

import { useNavigate } from 'react-router';

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
`
);

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.8)};
    height: ${theme.spacing(1.8)};
    display: inline-block;
    border: 2px solid ${theme.colors.alpha.white[100]};
    margin-right: ${theme.spacing(0.5)};
`
);

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
        flex-grow: 1;
        height: 10px;
        
        &.MuiLinearProgress-root {
          background-color: ${theme.colors.alpha.black[10]};
        }
        
        .MuiLinearProgress-bar {
          border-radius: ${theme.general.borderRadiusXl};
        }
`
);

function Projects() {

  const navigate = useNavigate();
  
  function handleDevices() {
    navigate('/app/devices');
  }

  const theme = useTheme();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pb: 3 }}
      >
        <Typography variant="h3">Projects</Typography>
        <Box>
          <Button size="small" variant="outlined" onClick={handleDevices}>
            View all devices
          </Button>
        </Box>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader
              avatar={
                <AvatarWrapperSuccess>
                  <CheckTwoToneIcon fontSize="medium" />
                </AvatarWrapperSuccess>
              }
              action={
                <IconButton size="small" color="primary">
                  <MoreVertTwoToneIcon />
                </IconButton>
              }
              title="Machine Shop"
              titleTypographyProps={{
                variant: 'h5',
                color: 'textPrimary'
              }}
            />
            <CardContent sx={{ pt: 0, pb: 1 }}>
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Active Devices:{' '}
                  <Text color="black">
                    <b>25</b>
                  </Text>
                  <b> /100</b>
                </Typography>
                <LinearProgressWrapper
                  value={25}
                  color="primary"
                  variant="determinate"
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Tooltip
                  arrow
                  title="View project calendar"
                  placement="top"
                >
                  <IconButton size="small" color="secondary" sx={{ ml: 0.5 }}>
                    <CalendarTodayTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  arrow
                  title="Mark project as favourite"
                  placement="top"
                >
                  <IconButton
                    size="small"
                    sx={{ color: `${theme.colors.warning.main}`, ml: 0.5 }}
                  >
                    <StarTwoToneIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box >
            </CardActions >
          </Card >
        </Grid >
      </Grid >
    </>
  );
}

export default Projects;
