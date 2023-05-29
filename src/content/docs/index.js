import {
    Box,
    Typography,
    Container,
    Divider,
    IconButton,
    Tooltip
  } from '@mui/material';
  import { Helmet } from 'react-helmet-async';
  import Logo from 'src/components/LogoSign';
  import { styled } from '@mui/material/styles';
  import FacebookIcon from '@mui/icons-material/Facebook';
  import TwitterIcon from '@mui/icons-material/Twitter';
  import InstagramIcon from '@mui/icons-material/Instagram';
  import { useRef, useEffect, useState } from 'react';

  const MainContent = styled(Box)(
    () => `
      height: 100%;
      display: flex;
      flex: 1;
      overflow: auto;
      flex-direction: column;
      align-items: center;
      justify-content: center;
  `
  );
  
  function StatusMaintenance() {
    // element: https://marutimuthu.gitbook.io/4gw-series-docs/

    const [timeLeft, setTimeLeft] = useState(3);
    const interval = useRef();
    useEffect(() => {
      interval.current = setInterval(() => {
        // Decrease "timeLeft" by 1 every second
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval.current);
    }, []);
    useEffect(() => {
      // Open the link in a new tab when the countdown ends
      if (timeLeft === 0) {
        clearInterval(interval.current);
        // 👇 Open link in new tab programmatically
        window.open('https://marutimuthu.gitbook.io/4gw-series-docs/', '_blank', 'noreferrer');
      }
    }, [timeLeft]);
    
    return (
      <>
        <Helmet>
          <title>User Guide | Gateway Manager</title>
        </Helmet>
        <MainContent>
          <Container maxWidth="md">
            <Logo />
            <Box textAlign="center">
              <Container maxWidth="xs">
                <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
                  Redirecting you to user guide page..
                </Typography>
                <Typography
                  variant="h3"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{ mb: 4 }}
                >
                  Opening in {timeLeft} second(s)
                </Typography>
              </Container>
              <img
                alt="Maintenance"
                height={250}
                src="/static/images/status/maintenance.svg"
              />
            </Box>
            <Divider sx={{ my: 4 }} />
          </Container>
        </MainContent>
      </>
    );
  }
  
  export default StatusMaintenance;
  