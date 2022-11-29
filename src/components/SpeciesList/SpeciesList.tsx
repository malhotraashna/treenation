/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchSpecies } from '../../store/slices/speciesSlice';
import { useNavigate } from 'react-router-dom';
import { SpeciesListInterface } from '../../type';
import './SpeciesList.css';

// used to handled two useEffect calls
let isLoading = false;

interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

const TablePaginationActions = (props: TablePaginationActionsProps): ReactElement => {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
};

const SpeciesList = (): ReactElement => {
  const dispatch = useAppDispatch();
  const currentProjectId = useAppSelector(state => state?.projects?.currentProjectId);
  const speciesList = useAppSelector(state => state?.species?.all);
  const requestCounter = useAppSelector(state => state.request?.counter);
  const err = useAppSelector(state => state?.species?.error);
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [counterUpdate, setCounterUpdate] = useState<boolean>(false);
  const [prevCounter, setPrevCounter] = useState<number>(requestCounter);

  const getSpecies = useCallback(async () => {
    // if a request was already submitted on first mount, don't trigger again
    if (!isLoading && currentProjectId && requestCounter > 0) {
      isLoading = true;
      await dispatch(fetchSpecies(currentProjectId));
      isLoading = false;
    }
  }, [dispatch, fetchSpecies, currentProjectId, counterUpdate]);

  useEffect(() => {
    void getSpecies();
  }, [getSpecies]);

  useEffect(() => {
    if (prevCounter === 0 && requestCounter > 0) {
      setCounterUpdate(true);
    }
    setPrevCounter(requestCounter);
  }, [requestCounter]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - speciesList.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ): void => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const onSpeciesClick = useCallback((speciesId: number) => {
    return (): any => {
      if (requestCounter > 0) {
        return navigate(`/species/${speciesId}`);
      }
    };
  }, []);

  const style = useCallback(() => {
    if (requestCounter <= 0) {
      return { backgroundColor: 'lightgrey' };
    }
    return { backgroundColor: 'azure' };
  }, [requestCounter]);

  return (
    <div className='app-content' data-testid='species-list'>
      <div data-testid='list-header' className='sp-header'>
        Species
        {
          requestCounter <= 0 &&
          <p data-testid='limit-err' className='limit-err'>Your request limit is exhausted!</p>
        }
        {
          err &&
          <p data-testid='list-err' className='limit-err'>{err}</p>
        }
      </div>
      {speciesList?.length <= 0
        ? <div data-testid='no-data' className='no-data'>No Data</div>
        : requestCounter > 0 && !err &&
        < TableContainer component={Paper} data-testid='species-table'>
          <Table sx={{ minWidth: 500, ...style() }} aria-label="custom pagination table">
            <TableBody>
              {(rowsPerPage > 0
                ? speciesList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : speciesList
              ).map((species: SpeciesListInterface) => (
                <TableRow data-testid='list-row' key={species.id} onClick={onSpeciesClick(species.id)} className='sp-row' hover>
                  <TableCell component="th" scope="row" className='sp-item'>
                    {species.name}
                  </TableCell>
                  <TableCell style={{ width: 200 }} align="right" className='sp-item'>
                    $ {species.price} per unit
                  </TableCell>
                  <TableCell style={{ width: 160 }} align="right">
                    {
                      species.stock <= 0
                        ? <Chip label='Out of Stock' color='error' className='sp-stock' />
                        : <Chip label='In Stock' color='success' className='sp-stock' />
                    }
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                  colSpan={3}
                  count={speciesList.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page'
                    },
                    native: true
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      }
    </div >
  );
};

export default SpeciesList;
