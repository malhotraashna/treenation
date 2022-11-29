import React, { ReactElement } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import ProjectFilter from '../ProjectFilter/ProjectFilter';
import RequestCounter from '../RequestCounter/RequestCounter';
import AppBackdrop from '../shared/Backdrop';
import SpeciesList from '../SpeciesList/SpeciesList';
import './Home.css';

const Home = (): ReactElement => {
  const requestStatus = useAppSelector(state => state?.request?.status);

  return (
    <>
      <AppBackdrop status={requestStatus} />
      <div className='home-header' data-testid='home'>
        <div>Treenation</div>
        <RequestCounter />
        <ProjectFilter />
      </div>
      <SpeciesList />
    </>
  )
};

export default Home;
