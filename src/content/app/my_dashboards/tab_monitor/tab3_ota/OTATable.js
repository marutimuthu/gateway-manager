import { useState, useEffect } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Button,
  Grid
} from '@mui/material';

import axios from 'axios';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import UploadIcon from '@mui/icons-material/Upload';
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import { server_url } from 'src/api/app.js';

import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const applyFilters = (cryptoOrders, filters) => {
  return cryptoOrders.filter((cryptoOrder) => {
    let matches = true;

    if (filters.status && cryptoOrder.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (cryptoOrders, page, limit) => {
  return cryptoOrders.slice(page * limit, page * limit + limit);
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const RecentOrdersTable = ({ cryptoOrders }) => {

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(0);
  const [severity, setSeverity] = useState(0);
  const vertical = 'bottom'
  const horizontal = 'right'
  const openSnackbar = (message, severity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
    // console.log(message,severity)
  };
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [filters, setFilters] = useState({
    status: null
  });

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(cryptoOrders, filters);
  const paginatedCryptoOrders = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedCryptoOrders.length > 0 &&
    selectedCryptoOrders.length < cryptoOrders.length;
  const selectedAllCryptoOrders =
    selectedCryptoOrders.length === cryptoOrders.length;
  const theme = useTheme();

  // Code for file upload
  const [selectedFile, setSelectedFile] = useState(null);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  const initiateOTA = (data) => {
    console.log(data)
    openSnackbar("Please wait", "info");

    axios
    .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        `${server_url}/api/device/find/${mac_id[3]}`
    )
    .then((response) => {
        // Seconds

        var post_by
        if (response.data[0].wifi_status == 1 || response.data[0].eth_status == 1) {
            post_by = "wifi"
        } else {
            post_by = "lte"
        }

        // if (() - ) < (defaults.http_refresh_interval_mins*60)) {
        if (((parseInt(Math.floor(Date.now() / 1000)) - parseInt(moment.utc(response.data[0].updatedAt).local() / 1000)) < (response.data[0].http_refresh_interval_mins * 60)) == 1) {
            axios({
                method: "post",
                url: `${server_url}/api/device/ota`,
                data: data,
                headers: { "Content-Type": "application/json" },
            }).then(res => {
                // alert(`${res.data.message}`)
                console.log(res.data)
                console.log(message, severity)
                // openSnackbar("error", JSON.stringify(res.data.message));
                openSnackbar(res.data.message, "success");
               
                // openSnackbar("error", res.data.message);
            }).catch((error) => {
                openSnackbar("Something went wrong..", "error");
                console.log(error);
            });
        } else {
            openSnackbar("Gateway is offline!", "warning");
        }
    })
    .catch((error) => {
        openSnackbar("Something went wrong..", "warning");
        console.log(error);
    });


    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // };
    // axios
    //   .post(`${server_url}/api/device/ota`, data, config)
    //   .then((res) => {
    //     openSnackbar(res.data.message, "success");
    //   })
    //   .catch((error) => {
    //     openSnackbar("Something went wrong.. Try again later.", "error");
    //     console.log(error); //Logs a string: Error: Request failed with status code 404
    //   })

    // try {
    // axios({
    //   method: "post",
    //   url: `${server_url}/api/device/ota`,
    //   data: data,
    //   headers: { "Content-Type": "application/json" },
    // }).then(res => {
    //   openSnackbar(res.data.message, "info");
    //   // alert(`${res.data.message}`)
    //   console.log(res.data)
    // })
    // } catch (error) {
    //   openSnackbar("Something went wrong..", "error");
    //   console.log(error)
    // }
  }


  const handleSubmit = async (event) => {
    openSnackbar("Please wait", "info");
    event.preventDefault()
    if (selectedFile) {
      console.log(selectedFile)
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("user_id", userInfo.id);

      console.log(formData)
      try {
        return axios({
          method: "post",
          url: `${server_url}/api/file`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        }).then(res => {
          // alert(`${res.data.message}`)
          openSnackbar(res.data.message, "success");
          window.location.reload(false)
          // console.log(res.data)
        })
      } catch (error) {
        openSnackbar("Something went wrong..", "error");
        console.log(error)
      }
    } else {
      openSnackbar("Select file before uploading.", "warning");
      // alert("Select file before uploading.")
    }
  }

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])
    // console.log(event.target.files[0])
  }
  // Code for file upload

  const mac_id = location.pathname.split('/')
  // console.log(mac_id[3])

  return (

    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <>
          <CardHeader
            action={
              <Box width={150}>
              </Box>
            }
            title="Firmware Update"
          />
          <Divider />
          <Grid container justifyContent="" alignItems="left">
            <Button
              sx={{ m: { xs: 2, md: 2 } }}
              variant="contained"
              component="label"
              startIcon={<AddTwoToneIcon fontSize="small" />}
            >
              Select File
              <input
                type="file"
                accept=".bin"
                onChange={handleFileSelect}
                hidden
              />
            </Button>
            <Button
              sx={{ m: { xs: 2, md: 2 } }}
              variant="contained"
              component="label"
              startIcon={<UploadIcon fontSize="small" />}
              onClick={handleSubmit}
            >
              Upload
            </Button>
          </Grid>
          <Grid sx={{ m: { xs: 2, md: 2 } }}>
            {selectedFile ? (
              <div>
                <p>Filename: {selectedFile.name}</p>
                <p>Filetype: {selectedFile.type}</p>
                <p>Size in bytes: {selectedFile.size}</p>
              </div>
            ) : (
              <p>Select a file to show details</p>
            )}
          </Grid>
        </>
      )}
      <Divider />
      <TableContainer>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical, horizontal }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
        <Table>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell> */}
              <TableCell>Name</TableCell>
              <TableCell>Size</TableCell>
              <TableCell align="right">Added On</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoOrders.map((cryptoOrder) => {
              const isCryptoOrderSelected = selectedCryptoOrders.includes(
                cryptoOrder.id
              );

              return (
                <TableRow
                  hover
                  key={cryptoOrder.id}
                  selected={isCryptoOrderSelected}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoOrderSelected}
                      onChange={(event) =>
                        handleSelectOneCryptoOrder(event, cryptoOrder.id)
                      }
                      value={isCryptoOrderSelected}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {cryptoOrder.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Math.round(cryptoOrder.size / 1023)} KB
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {cryptoOrder.type}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {moment.utc(cryptoOrder.createdAt).local().format('DD-MMM-YY hh:mm:ss A')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {cryptoOrder.sourceDesc} */}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Update Firmware" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => {
                          // console.log(mac_id[3] + cryptoOrder.name)
                          const data = {
                            mac_id: mac_id[3],
                            bin_file: cryptoOrder.name,
                            server_url: server_url
                          }
                          setTimeout(() => {
                            initiateOTA(data)
                          }, 100);
                        }}
                      >
                        <SystemUpdateAltIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  cryptoOrders: []
};

export default RecentOrdersTable;
