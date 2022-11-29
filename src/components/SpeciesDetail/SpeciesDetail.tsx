/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Grid,
  Stack,
  Chip,
  Divider,
  Breadcrumbs,
  Link,
  Typography
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchSpeciesDetails } from '../../store/slices/speciesSlice';
import RequestCounter from '../RequestCounter/RequestCounter';
import './SpeciesDetail.css';

// used to handled two useEffect calls
let isLoading = false;

const SpeciesDetail = (): ReactElement => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const cs = useAppSelector(state => state?.species?.currentSpecies);
  const requestCounter = useAppSelector(state => state?.request?.counter);
  const err = useAppSelector(state => state?.species?.error);
  const [counterUpdate, setCounterUpdate] = useState<boolean>(false);
  const [prevCounter, setPrevCounter] = useState<number>(requestCounter);
  const navigate = useNavigate();

  const getSpeciesDetails = useCallback(async () => {
    // if a request was already submitted on first mount, don't trigger again
    if (!isLoading && id && requestCounter > 0) {
      isLoading = true;
      await dispatch(fetchSpeciesDetails(id));
      isLoading = false;
    }
  }, [dispatch, fetchSpeciesDetails, id, counterUpdate]);

  useEffect(() => {
    void getSpeciesDetails();
  }, [getSpeciesDetails]);

  useEffect(() => {
    if (prevCounter === 0 && requestCounter > 0) {
      setCounterUpdate(true);
    }
    setPrevCounter(requestCounter);
  }, [requestCounter]);

  const goToHome = useCallback(() => {
    return navigate('/');
  }, []);

  return (
    <>
      <header className='detail-header' data-testid='detail-header'>
        <div className='nav' data-testid='home-nav'>
          <Breadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="white" onClick={goToHome} style={{ cursor: 'pointer' }}>
              Home
            </Link>
            <Typography color="white">{cs.name ?? ''}</Typography>
          </Breadcrumbs>
        </div>
        <div data-testid='detail-header-name'>
          Treenation
        </div>
        <RequestCounter />
      </header>
      {requestCounter <= 0 || err
        ? <>
          <p className='limit-err' data-testid='sp-error'>{err !== '' ? err : 'Your request limit is exhausted!'}</p>
          <div className='no-data' data-testid='no-data'>No Data</div>
        </>
        : <Box sx={{ flexGrow: 1 }} data-testid='detail-content'>
          <Grid container spacing={2}>
            <Grid item xs={5} className='grid'>
              <img data-testid='sp-image' src={cs.image} loading='lazy' height='600vh' width='300vw' />
            </Grid>
            <Grid item xs={7} className='grid' style={{ paddingBottom: '10%', paddingRight: '5%' }}>
              <div data-testid='sp-name' className='cs-heading'>{cs.name}</div>
              <Stack direction="row" spacing={1}>
                <Chip data-testid='sp-category' label={cs.category?.name ?? ''} variant="outlined" color='primary' />
                <Chip data-testid='sp-origin' label={cs.origin_type?.name ?? ''} variant="outlined" color='secondary' />
                <Chip data-testid='sp-foliage' label={cs.foliage_type?.name ?? ''} variant="outlined" color='warning' />
              </Stack>
              <Divider className='divider' />
              <div style={{ height: '9%' }}>
                <span data-testid='sp-stock' className='stock-info'>
                  {
                    cs.stock !== undefined && cs.stock !== null
                      ? cs.stock <= 0
                        ? <Chip label='Out of Stock' color='error' className='chip' />
                        : cs.stock <= 100
                          ? <>
                            <Chip label='In Stock' color='success' className='chip' />
                            <p className='in-stock less-qty'>Only {cs.stock} units left!</p>
                          </>
                          : <>
                            <Chip label='In Stock' color='success' className='chip' />
                            <p className='in-stock'>{cs.stock} units left</p>
                          </>
                      : ''
                  }
                </span>
                <span data-testid='sp-price' className='price'>
                  $ {cs.price} per unit
                </span>
              </div>
              <Divider className='divider' />
              <div data-testid='sp-des' className='des'>
                <h4>Description</h4>
                {cs.particularities && cs.particularities.length > 1 && <p>{cs.particularities}</p>}
                <p><b>Family: </b>{cs.family}</p>
                <p><b>Common Names: </b>{cs.common_names}</p>
                <p><b>Average Natural Life Span: </b>{cs.average_natural_life_span ?? 0}</p>
                <p><b>Height: </b>{cs.height}</p>
                <p><b>Lifetime CO2: </b>{cs.life_time_CO2 ?? 0}</p>
                {cs.planter_likes && cs.planter_likes.length > 1 && <p><b>Planter Likes: </b>{cs.planter_likes}</p>}
              </div>
            </Grid>
          </Grid>
        </Box>
      }
    </>
  );
};

export default SpeciesDetail;
