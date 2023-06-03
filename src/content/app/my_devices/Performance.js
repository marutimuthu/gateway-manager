import {
  Card,
  Box,
  CardContent,
  CardHeader,
  Typography,
  Avatar,
  LinearProgress
} from '@mui/material';

import { styled } from '@mui/material/styles';
import AssignmentTurnedInTwoToneIcon from '@mui/icons-material/AssignmentTurnedInTwoTone';
import CancelPresentationTwoToneIcon from '@mui/icons-material/CancelPresentationTwoTone';
import { useNavigate } from 'react-router';

const RootWrapper = styled(Card)(
  ({ theme }) => `
    // background: ${theme.colors.gradients.green1};
    // color: ${theme.colors.alpha.white[100]};
    &:hover,
    &:focus {
      box-shadow: ${theme.colors.shadows.success};
      cursor: pointer;
    }

    .MuiCardHeader-title {
      // color: ${theme.colors.alpha.white[100]};
    }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.palette.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.success};
`
);

const AvatarError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.main};
      color: ${theme.palette.error.contrastText};
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      box-shadow: ${theme.colors.shadows.error};
`
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
      // color: ${theme.colors.alpha.white[70]};
`
);

function Performance(props) {
  const { ...headingProps } = props;

  const navigate = useNavigate();

  function handleDevices() {
    navigate('/app/devices');
  }

  return (
    <RootWrapper sx={{ p: 1 }} onClick={handleDevices}>
      {/* <CardHeader title="xStatus" titleTypographyProps={{ variant: 'h3' }} /> */}
      <CardContent>
        <Box display="flex" sx={{ px: 2, pt: 2 }} alignItems="center">
          <AvatarSuccess sx={{ mr: 2 }} variant="rounded">
            <AssignmentTurnedInTwoToneIcon fontSize="large" />
          </AvatarSuccess>
          <Box>
            <Typography variant="h1">{headingProps.active}</Typography>
            <TypographySecondary variant="subtitle2" noWrap>
              Active Device(s)
            </TypographySecondary>
          </Box>
        </Box>
        <Box display="flex" sx={{ px: 2, pt: 2 }} alignItems="center">
          <AvatarError sx={{ mr: 2 }} variant="rounded">
            <CancelPresentationTwoToneIcon fontSize="large" />
          </AvatarError>
          <Box>
            <Typography variant="h1">{headingProps.inactive}</Typography>
            <TypographySecondary variant="subtitle2" noWrap>
              Inactive Device(s)
            </TypographySecondary>
          </Box>
        </Box>
        {/* <Box pt={3}>
          <LinearProgressWrapper
            value={73}
            color="primary"
            variant="determinate"
          />
        </Box> */}
      </CardContent>
    </RootWrapper>
  );
}

export default Performance;
