import React, { ReactElement, useCallback } from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { setRequestCounter } from '../../store/slices/requestSlice';
import './RequestCounter.css';

const RequestCounter = (): ReactElement => {
  const dispatch = useAppDispatch();
  const counter = useAppSelector(state => state?.request?.counter);

  const style = useCallback((val: number) => {
    const style = { margin: 0 };
    if (val <= 10) {
      return { ...style, color: 'crimson' };
    }
    return { ...style, color: 'bisque' };
  }, []);

  const addRequests = useCallback(() => {
    void dispatch(setRequestCounter(counter + 30));
  }, [dispatch, setRequestCounter, counter]);

  return (
    <div className='counter' data-testid='request-counter'>
      <p style={style(counter)} data-testid='counter-val'>Requests Left: {counter}</p>
      <p style={{ margin: '4% 0 0 0' }}>
        <Button data-testid='add-request' variant='outlined' color="secondary" size='small' onClick={addRequests}>Add 30 requests</Button>
      </p>
    </div>
  );
};

export default RequestCounter;
