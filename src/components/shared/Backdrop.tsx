import React, { ReactElement, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

interface PropsInterface {
  status: string;
}

const AppBackdrop = ({ status }: PropsInterface): ReactElement => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (status === 'loading') {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [status]);

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AppBackdrop;
