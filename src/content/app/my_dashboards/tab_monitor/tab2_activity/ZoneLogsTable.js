import { FC, ChangeEvent, useState } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {
  Grid,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
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
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
// import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
// import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
// import BulkActions from './BulkActions';

const getStatusLabel = (cryptoOrderStatus) => {
  const map = {
    network: {
      text: 'network',
      color: 'warning'
    },
    config: {
      text: 'config',
      color: 'success'
    },
    ota: {
      text: 'ota',
      color: 'success'
    }
  };

  const { text, color } = map[cryptoOrderStatus];

  return <Label color={color}>{text}</Label>;
};

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

function ZoneLogs(params) {

}

const ZoneLogsTable = ({ cryptoOrders }) => {

  const [selectedCryptoOrders, setSelectedCryptoOrders] = useState([]);
  const selectedBulkActions = selectedCryptoOrders.length > 0;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filters, setFilters] = useState({
    status: null
  });


  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'network',
      name: 'network'
    },
    {
      id: 'config',
      name: 'config'
    },
    {
      id: 'ota',
      name: 'ota'
    }
  ];

  const handleStatusChange = (e) => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

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
  
  return (
    <Card >
      <Grid
        padding={1}>
        {selectedBulkActions && (
          <Box flex={1} p={2}>
            <BulkActions />
          </Box>
        )}
        {!selectedBulkActions && (
          <CardHeader
            // action={
            //   <Box width={150}>
            //     <FormControl fullWidth variant="outlined">
            //       <InputLabel>Status</InputLabel>
            //       <Select
            //         value={filters.status || 'all'}
            //         onChange={handleStatusChange}
            //         label="Status"
            //         autoWidth
            //       >
            //         {statusOptions.map((statusOption) => (
            //           <MenuItem key={statusOption.id} value={statusOption.id}>
            //             {statusOption.name}
            //           </MenuItem>
            //         ))}
            //       </Select>
            //     </FormControl>
            //   </Box>
            // }
            title="Device Activity Logs"
          />
        )}
        <Divider />
        <TableContainer>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Timestamp</TableCell>
                <TableCell>Activity</TableCell>
                {/* <TableCell> Old Value</TableCell> */}
                {/* <TableCell align="right"> New Value</TableCell> */}
                <TableCell align="right"> Type</TableCell>
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
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {moment.utc(cryptoOrder.createdAt).local().format('DD-MMM-YY hh:mm:ss A')}
                        {/* {cryptoOrder.createdAt} */}
                      </Typography>
                      {/* <Typography variant="body2" color="text.secondary" noWrap>
                        {format(cryptoOrder.orderDate, 'MMMM dd yyyy')}
                      </Typography> */}
                    </TableCell>
                    <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.activity}
                      </Typography>
                    </TableCell>

                    {/* <TableCell>
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.old_value}
                      </Typography>
                    </TableCell> */}
                    {/* <TableCell align="right">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {cryptoOrder.new_value}
                      </Typography>
                    </TableCell> */}
                    <TableCell align="right">
                      {/* {getStatusLabel(cryptoOrder.type)} */}
                      {cryptoOrder.type}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

        </TableContainer>
      </Grid>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[10, 25, 50]}
        />
      </Box>
    </Card>
  );
};

ZoneLogsTable.propTypes = {
  cryptoOrders: PropTypes.array.isRequired
};

ZoneLogsTable.defaultProps = {
  cryptoOrders: []
};

export default ZoneLogsTable;
