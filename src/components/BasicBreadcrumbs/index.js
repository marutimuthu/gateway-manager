import React from 'react';
import { useLocation } from 'react-router';
import { Typography, Breadcrumbs, Link, Box } from '@mui/material';

import classes from './breadcrumb.module.scss';

export default function BasicBreadcrumbs() {
  const location = useLocation();

  // location always starts from slash removing forward slash otherwise it gives empty string
  const paths = location.pathname.split('/').filter((path) => path !== '');

  return (
    <div role="presentation">
      <Box sx={{ py: 2 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {/* <Link
            className={classes.text}
            underline="hover"
            color="inherit"
            href={`/`}
          >
            Home
          </Link> */}
          {paths.map((path, index, array) => {
            // console.log(path)
            if (path == "app") {
              return index === array.length - 1 ? (
                <Typography
                  sx={{ textTransform: 'capitalize' }}
                  color="text.primary"
                  key={index}
                >
                  {path}
                </Typography>
              ) : (
                <Link
                  className={classes.text}
                  underline="hover"
                  color="inherit"
                  href={`/${path}`}
                  key={index}
                >
                  {path}
                </Link>
              );
            } else {
              
              return index === array.length - 1 ? (
                <Typography
                  sx={{ textTransform: 'capitalize' }}
                  color="text.primary"
                  key={index}
                >
                  {path}
                </Typography>
              ) : (
                <Link
                  className={classes.text}
                  underline="hover"
                  color="inherit"
                  href={`/app/${path}`}
                  key={index}
                >
                  {path}
                </Link>
              );
            }
          })}
        </Breadcrumbs>
      </Box>
    </div>
  );
}
