import { Backdrop } from '@material-ui/core';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

export default function CLoader({ enabled }) {
  return (
    <Backdrop open={enabled}
      style={{ zIndex: 1 }}
      sx={{ color: '#fff' }}
    >
      <CircularProgress style={{ color: ' #FFFFFF' }} />
    </Backdrop>
  );
}
