export const mockedProjects = [{
  id: 1,
  name: 'test1 project',
  status: 'active'
}, {
  id: 2,
  name: 'test2 project',
  status: 'active'
}, {
  id: 3,
  name: 'test3 project',
  status: 'inactive'
}];

const mockedSpecies = [{
  id: 1,
  name: 'test1 species',
  price: 3,
  stock: 1000
}, {
  id: 2,
  name: 'test2 species',
  price: 3,
  stock: 50
}, {
  id: 3,
  name: 'test3 species',
  price: 3,
  stock: 0
}];

const mockedSpeciesDetail = {
  average_natural_life_span: 100,
  category: { id: 1, name: 'test_category' },
  common_names: 'Test Names',
  family: 'Test Family',
  foliage_type: { id: 1, name: 'test_type' },
  height: '10,20',
  id: 1,
  image: 'https://test.image.tst',
  life_time_CO2: 200,
  name: 'Test Species',
  origin_type: { id: 1, name: 'test_type' },
  particularities: 'Test Description',
  planter_likes: 'Test Likes',
  price: 3,
  stock: 100
};

export const getProjectsMockValue = { data: mockedProjects, error: '', isFromCache: false };
export const getSpeciesMockValue = { data: mockedSpecies, error: '', isFromCache: false };
export const getSpeciesDetailsMockValue = { data: mockedSpeciesDetail, error: '', isFromCache: false };

export const preloadedState = {
  projects: {
    all: mockedProjects,
    currentProjectId: mockedProjects[0].id.toString(),
    error: ''
  },
  species: {
    all: mockedSpecies,
    currentSpecies: mockedSpeciesDetail,
    error: ''
  },
  request: {
    status: 'idle',
    counter: 30
  }
};
