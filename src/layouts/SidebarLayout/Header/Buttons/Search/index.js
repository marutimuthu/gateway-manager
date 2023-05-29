import { forwardRef, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';

import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { server_url } from 'src/api/app.js';

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);

function HeaderSearch() {


  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [zones, setZones] = useState([]);

  const navigate = useNavigate();

  // In future we have to store userId in redux
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    axios
      .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        `${server_url}/api/device/${userInfo.id}`
      )
      .then((response) => {
        // console.log('DEBUG zone response', response);
        // console.log(userInfo.id);
        // console.log(response.data);
        setZones(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    zones.filter((data) => {
      return data.name.match(searchValue);
    });

    zones.filter((data) => {
      return data.mac_id.match(searchValue);
    });

    if (event.target.value) {
      if (!openSearchResults) {
        setOpenSearchResults(true);
      }
    } else {
      setOpenSearchResults(false);
    }
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
          <Typography color="secondary" variant="subtitle1" gutterBottom>
            Search Device
          </Typography>
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Search terms here..."
            fullWidth
            label="Search"
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Search results for{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {searchValue}
                </Typography>
              </Typography>
              <Link href="#" variant="body2" underline="hover">
                Advanced search
              </Link>
            </Box>
            <Divider sx={{ my: 1 }} />

            {zones
              .filter((item) => {
                const searchTerm = searchValue.toLowerCase();
                const fullName = item.name.toLowerCase();
                const fullName1 = item.mac_id.toLowerCase();

                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm ||
                  fullName1.startsWith(searchTerm) &&
                  fullName1 !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                // <div
                //   onClick={() => onSearch(item.name)}
                //   // className="dropdown-row"
                //   key={item.name}
                // >
                //   {item.name}
                // </div>
                <List disablePadding>
                  <ListItem button onClick={() => {
                    navigate("/app/devices/" + item.mac_id)
                    window.location.reload(false)
                  }
                  }
                  >
                    <Hidden smDown>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            background: (theme: Theme) =>
                              theme.palette.secondary.main
                          }}
                        >
                          <FindInPageTwoToneIcon />
                        </Avatar>
                      </ListItemAvatar>
                    </Hidden>
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                          {item.name}
                        </Link>
                      </Box>
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: (theme: Theme) =>
                            lighten(theme.palette.secondary.main, 0.5)
                        }}
                      >
                        {item.mac_id}
                      </Typography>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItem>
                  <Divider sx={{ my: 1 }} component="li" />
                </List>
              ))}

            {/* <Divider sx={{ my: 1 }} component="li" />
              <ListItem button>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPageTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                      Example Projects Application
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    This is yet another search result pointing to a app page.
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItem>
              <Divider sx={{ my: 1 }} component="li" />
              <ListItem button>
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPageTwoToneIcon />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link href="#" underline="hover" sx={{ fontWeight: 'bold' }} variant="body2">
                      Search Results Page
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    Choose if you would like to show or not this typography section here...
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItem> */}


            {/* <Divider sx={{ mt: 1, mb: 2 }} />
            <Box sx={{ textAlign: 'center' }}>
              <Button color="primary">View all search results</Button>
            </Box> */}
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
