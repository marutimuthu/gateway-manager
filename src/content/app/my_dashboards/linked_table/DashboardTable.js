import { useEffect, useState } from 'react';
import axios from 'axios';
import { server_url } from 'src/api/app.js';

import moment from 'moment';
import { useNavigate } from 'react-router';
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography
} from '@mui/material';
import { Heading } from 'src/components/Table';

import GetZoneStatusLabel from './partials/GetZoneStatusLabel';

import RouterIcon from '@mui/icons-material/Router';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import { func } from 'prop-types';
import { parse } from 'date-fns';

/**
 * @description : Takes response of zones API and returs a table UI
 * @params {array} zones: The zones is an array of object which contains multiple zones
 **/

const ZonesTable = (props) => {
  const { ...headingProps } = props;

  const [zones, setZones] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  
  const navigate = useNavigate();

  const paginatedZones = zones.slice(page * limit, page * limit + limit);
  // In future we have to store userId in redux
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    axios
      .get(
        // `http://54.202.17.198:8080/api/device/${userInfo.id}`
        // `${server_url}/api/device/${userInfo.id}?page=${page}&limit=${limit}`
        `${server_url}/api/device/${userInfo.id}?page=1&limit=100`
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

  return (
    <Card>
      <Heading {...headingProps} />
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Details</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              {/* <TableCell align="right">Status</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedZones.map((zones) => {

              return (
                <TableRow
                  hover
                  key={zones.id}
                  selected={false}
                  onClick={() => navigate(zones.mac_id)}
                >
                  {/* Zone */}
                  <TableCell>
                    <AutoGraphIcon sx={{ m: 1 }} fontSize='large' color='secondary' />
                  </TableCell>

                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {/* {zones.details.zone} */}
                      {zones.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {/* {zones.details.modules} */}
                      MAC ID: {zones.mac_id}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      Firmware: {zones.firmware_version}
                    </Typography> */}
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      Scheduled Restart: {zones.schedule_restart_enable}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Scheduled Restart Time: {`${zones.schedule_restart_hour}:${zones.schedule_restart_minute}:${zones.schedule_restart_second}`}
                    </Typography> */}
                  </TableCell>
                  {/* URL */}
                  <TableCell>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      URL: {zones.dhcp}
                    </Typography>
                  </TableCell>
                  {/* Last Updated- */}
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {/* {moment(zones.updatedAt).format('MMM-DD-YYYY HH:mm')} */}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      Added on: {moment.utc(zones.createdAt).local().format('DD-MMM-YY hh:mm:ss A')}
                    </Typography>
                  </TableCell>

                  {/* <TableCell align="right">
                    <GetZoneStatusLabel status={parseInt(Math.floor(Date.now()/1000)) - parseInt(moment.utc(zones.updatedAt).local()/1000) < (zones.http_refresh_interval_mins*60) ? "connected" : "inactive"} />
                  </TableCell> */}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={zones.length}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={(event) =>
            setLimit(parseInt(event.target.value))
          }
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

export default ZonesTable;
