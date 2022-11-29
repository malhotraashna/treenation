export interface ProjectInterface {
  id: number;
  name: string;
  status: string;
}

export interface SpeciesListInterface {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface SpeciesObjectInterface {
  id: number;
  name: string;
}

export interface SpeciesInterface {
  average_natural_life_span?: number;
  category?: SpeciesObjectInterface;
  common_names?: string;
  family?: string;
  foliage_type?: SpeciesObjectInterface;
  height?: string;
  id?: number;
  image?: string;
  life_time_CO2?: number;
  name?: string;
  origin_type?: SpeciesObjectInterface;
  particularities?: string;
  planter_likes?: string;
  price?: number;
  stock?: number;
}
