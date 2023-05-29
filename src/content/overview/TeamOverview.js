import {
  Card,
  Box,
  Grid,
  Typography,
  Avatar,
  Badge,
  Tooltip,
  useTheme,
  LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { formatDistance, subDays, subMinutes, subHours } from 'date-fns';
import Text from 'src/components/Text';

const DotLegend = styled('span')(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
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

function TeamOverview() {

  const theme = useTheme();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ p: 2.5 }}>
          <Box display="flex" alignItems="center" pb={3}>
            <Badge
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              overlap="circular"
              badgeContent={
                <Tooltip
                  arrow
                  placement="top"
                  title={
                    'Offline since ' + formatDistance(subDays(new Date(), 14), new Date(), {
                      addSuffix: true
                    })
                  }
                >
                  <DotLegend
                    style={{ background: `${theme.colors.error.main}` }}
                  />
                </Tooltip>
              }
            >
              <AvatarWrapper
                alt="Remy Sharp"
                src="/static/images/avatars/4.jpg"
              />
            </Badge>
            <Box sx={{ ml: 1.5 }}>
              <Typography variant="h4" noWrap gutterBottom>
                Hanna Siphron
              </Typography>
              <Typography variant="subtitle2" noWrap>
                Web Dev Support Team
              </Typography>
            </Box>
          </Box>

          <Typography variant="subtitle2" gutterBottom>
            <Text color="black">4</Text> out of{' '}
            <Text color="black">6</Text> tasks completed
          </Typography>
          <LinearProgressWrapper
            value={65}
            color="primary"
            variant="determinate"
          />
        </Card>
      </Grid>
      
    </Grid>
  );
}

export default TeamOverview;
