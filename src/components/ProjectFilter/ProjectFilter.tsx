/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { fetchProjects, setCurrentProject } from '../../store/slices/projectSlice';
import { ProjectInterface } from '../../type';
import './ProjectFilter.css';

// used to handled two useEffect calls
let isLoading = false;

const ProjectFilter = (): ReactElement => {
  const dispatch = useAppDispatch();
  const projectList = useAppSelector(state => state?.projects?.all);
  const currentFilteredProject = useAppSelector(state => state?.projects?.currentProjectId);
  const requestCounter = useAppSelector(state => state.request?.counter);
  const err = useAppSelector(state => state?.projects?.error);
  const [counterUpdate, setCounterUpdate] = useState<boolean>(false);
  const [prevCounter, setPrevCounter] = useState<number>(requestCounter);

  const getProjects = useCallback(async () => {
    // if a request was already submitted on first mount, don't trigger again
    if (!isLoading && requestCounter > 0) {
      isLoading = true;
      await dispatch(fetchProjects());
      isLoading = false;
    }
  }, [dispatch, fetchProjects, counterUpdate]);

  useEffect(() => {
    void getProjects();
  }, [getProjects]);

  useEffect(() => {
    if (prevCounter === 0 && requestCounter > 0) {
      setCounterUpdate(true);
    }
    setPrevCounter(requestCounter);
  }, [requestCounter]);

  const handleProjectChange = useCallback((event: SelectChangeEvent): any => {
    dispatch(setCurrentProject(event.target.value));
  }, [dispatch, setCurrentProject]);

  const menuItems = projectList.map((project: ProjectInterface) => {
    const isInactive = project.status === 'inactive';
    return <MenuItem key={project.id} value={project.id} className={isInactive ? 'dis-item' : ''} data-testid='project-item'>
      {project.name} {isInactive ? '(Inactive)' : ''}
    </MenuItem>
  }
  );

  return (
    <>
      <Box sx={{ minWidth: '35vw' }} className='filter' data-testid='project-filter'>
        <FormControl fullWidth>
          <InputLabel id="project-select-label">Treenation Project</InputLabel>
          <Select
            labelId="project-select-label"
            id="project-select"
            value={currentFilteredProject ?? ''}
            label="Treenation Project"
            onChange={handleProjectChange}
            style={{ color: 'cornsilk' }}
            disabled={requestCounter <= 0}
            data-testid='project-select'
          >
            {menuItems}
          </Select>
        </FormControl>
      </Box>
      {
        err &&
        <p className='limit-err'>{err}</p>
      }
    </>
  );
};

export default ProjectFilter;
