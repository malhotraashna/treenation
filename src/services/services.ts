/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { ProjectInterface, SpeciesInterface, SpeciesListInterface } from '../type';
import axiosClient from './axios';

interface CacheInterface {
  projects: ProjectInterface[];
  species: { [key: string]: SpeciesListInterface[] };
  spDetails: { [key: string]: SpeciesInterface };
}

const cache: CacheInterface = {
  projects: [],
  species: {},
  spDetails: {}
};

const getProjects = async (): Promise<any> => {
  try {
    // return from cache if available
    if (cache.projects?.length > 0) {
      return { data: cache.projects, error: '', isFromCache: true };
    }
    const response = await axiosClient.get('/projects');
    const activeProjects = response.data.filter((proj: ProjectInterface) => proj.status === 'active');
    const inactiveProjects = response.data.filter((proj: ProjectInterface) => proj.status === 'inactive');
    // Dislay active projects first
    const projects = activeProjects.concat(inactiveProjects);
    // save in cache
    cache.projects = projects;
    return { data: projects, error: '', isFromCache: false };
  } catch (e: any) {
    return { error: e.message, isFromCache: false };
  }
};

const getSpecies = async (projectId: string): Promise<any> => {
  try {
    // return from cache if available
    if (cache.species?.[projectId]) {
      return { data: cache.species?.[projectId], error: '', isFromCache: true };
    }
    const response = await axiosClient.get(`/projects/${projectId}/species`);
    // save in cache
    cache.species[projectId] = response.data;
    return { data: response.data, error: '', isFromCache: false };
  } catch (e: any) {
    return { error: e.message, isFromCache: false };
  }
};

const getSpeciesDetails = async (speciesId: string): Promise<any> => {
  try {
    // return from cache if available
    if (cache.spDetails?.[speciesId]) {
      return { data: cache.spDetails?.[speciesId], error: '', isFromCache: true };
    }
    const response = await axiosClient.get(`/species/${speciesId}`);
    // save in cache
    cache.spDetails[speciesId] = response.data;
    return { data: response.data, error: '', isFromCache: false };
  } catch (e: any) {
    return { error: e.message, isFromCache: false };
  }
};

const services = { getProjects, getSpecies, getSpeciesDetails };

export default services;
