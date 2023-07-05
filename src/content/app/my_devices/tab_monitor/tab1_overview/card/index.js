import { Grid, Card, Box, Badge, Typography, Avatar } from '@mui/material';
// import SimpleMap from '../SimpleMap';

// import styles from "./index.scss";
function StatisticsCard({
  gateway_type,
  label,
  icon,
  heading1_key,
  heading1_value,
  heading2_key,
  heading2_value,
  heading3_key,
  heading3_value,
  heading4_key,
  heading4_value,
  heading5_key,
  heading5_value,
  heading6_key,
  heading6_value,
  heading7_key,
  heading7_value,
  heading8_key,
  heading8_value,
  heading9_key,
  heading9_value,
  heading10_key,
  heading10_value,
  heading11_key,
  heading11_value,
  heading12_key,
  heading12_value
}) {
  const gateway = {
    GWD: '/static/images/avatars/4GWD.png',
    GWE: '/static/images/avatars/4GWE.png'
  };
  return (
    <Grid item xs={12} sm={6} md={6} lg={6}>
      <Card sx={{ p: 2 }}>
        <Box display="flex" alignItems="center">
          <Box sx={{ ml: 1 }}>
            <Typography variant="h4" noWrap gutterBottom>
              <Badge sx={{ mr: 1 }}>{icon}</Badge>
              {label}
            </Typography>
              {label == 'Device' ? (
                <Grid container spacing={2} columns={16} marginY={1}>
                  {
                    gateway_type == 0 ? (
                    <Avatar
                    sx={{
                      mx: 'auto',
                      // backgroundColor: 'grey',
                      width: '30%',
                      height: '30%'
                    }}
                    variant="rounded"
                    alt="4GWE"
                    src={gateway.GWE}
                  />)
                  :
                  (<Avatar
                  sx={{
                    mx: 'auto',
                    // backgroundColor: 'grey',
                    width: '30%',
                    height: '30%'
                  }}
                  variant="rounded"
                  alt="4GWD"
                  src={gateway.GWD}
                />)
                  }
                </Grid>
              ) : (
                false
              )}

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading1_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading1_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading2_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading2_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading3_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading3_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading4_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading4_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading5_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading5_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading6_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading6_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading7_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }} sx={{ wordBreak: "break-word" }}>
                  {heading7_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading8_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading8_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading9_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body" sx={{ wordBreak: "break-word" }}>
                  {heading9_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading10_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading10_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading11_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body" sx={{ wordBreak: "break-word" }}>
                  {heading11_value}
                </Typography>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item md={6}>
                <Typography variant="h5">{heading12_key}</Typography>
              </Grid>
              <Grid item md={6}>
                <Typography variant="body"  sx={{ wordBreak: "break-word" }}>
                  {heading12_value}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Card>
    </Grid>
  );
}
export default StatisticsCard;
