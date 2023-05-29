import React from 'react';

import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CardHeader,
  TextField
} from '@mui/material';

const Heading = ({
  heading,
  showDropdown,
  dropdownLabel,
  dropdownValue,
  handleDropdownItemChange,
  headerDropdownOptions
}) => {
  return (
    <CardHeader
      title={heading}
      action={
        showDropdown ? (
          <Box width={150}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>{dropdownLabel}</InputLabel>
              <Select
                value={dropdownValue}
                onChange={(event) =>
                  handleDropdownItemChange(event.target.value)
                }
                label={dropdownLabel}
                autoWidth
              >
                {headerDropdownOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        ) : null
      }
    />
  );
};

export default Heading;
