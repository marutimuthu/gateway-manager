import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import DatePicker from './DatePicker';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';

export default function SelectTimePeriod({timePeriod, setTimePeriod}) {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const handleChange = (event) => {
    setTimePeriod(event.target.value);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    // boxShadow: 24,
    p: 4,
  };

  

  return (
    <Box sx={{ minWidth: 150, display: 'flex' }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-autowidth-label">Select Period</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select-autowidtht" 
          value={timePeriod}
          label="Select Period"
          onChange={handleChange}
        >
          <MenuItem value="">Today</MenuItem>
          <MenuItem value="week">Last Week</MenuItem>
          <MenuItem value="month">Last Month</MenuItem>
          <MenuItem value={30}>
            <Button onClick={handleOpen}>Select Custom Date</Button>
          </MenuItem>
        </Select>
        <Modal
          open={openModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          // style={modalStyle}
        >
          <Box sx={style}>
            <DatePicker />
            <Button onClick={handleClose}>Submit</Button>
          </Box>
          {/* <>
          </> */}
        </Modal>
      </FormControl>
    </Box>
  );
}
