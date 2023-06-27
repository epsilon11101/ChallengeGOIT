const getAllData = async (field) => {
  let url = `https://swapi.dev/api/${field}/`;
  const characters = [];
  while (true) {
    const response = await fetch(url);
    const result = await response.json();
    characters.push(...result.results);
    console.log("Loading....");
    if (!result.next) break;
    url = result.next;
  }
  return characters;
};

const getCharacters = async (page) => {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await response.json();

  return await data.results;
};

const getCharacterbyUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return await data.name;
};

const getHomeWorld = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return await data.name;
};

const getFilmsbyUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return await data.title;
};

const getSpeciesbyUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return await data.name;
};

const getVehiclesbyUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return await data.name;
};

const getStarshipsbyUrl = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return await data.name;
};

const getPlanets = async (page = 1) => {
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  const data = await response.json();
  return await data.results;
};

const getStarships = async (page = 1) => {
  const response = await fetch(`https://swapi.dev/api/starships/?page=${page}`);
  const data = await response.json();
  return await data.results;
};

const getVehicles = async (page = 1) => {
  const response = await fetch(`https://swapi.dev/api/vehicles/?page=${page}`);
  const data = await response.json();
  return await data.results;
};

const getSpecies = async (page = 1) => {
  const response = await fetch(`https://swapi.dev/api/species/?page=${page}`);
  const data = await response.json();
  return await data.results;
};

const getFilms = async (page = 1) => {
  const response = await fetch(`https://swapi.dev/api/films/?page=${page}`);
  const data = await response.json();
  return await data.results;
};

const getCharacter = async (id) => {
  const response = await fetch(`https://swapi.dev/api/people/${id}`);
  const data = await response.json();
  return await data;
};

const getPlanet = async (id) => {
  const response = await fetch(`https://swapi.dev/api/planets/${id}`);
  const data = await response.json();
  return await data;
};

const getStarship = async (id) => {
  const response = await fetch(`https://swapi.dev/api/starships/${id}`);
  const data = await response.json();
  return await data;
};

const getVehicle = async (id) => {
  const response = await fetch(`https://swapi.dev/api/vehicles/${id}`);
  const data = await response.json();
  return await data;
};

const getSpecie = async (id) => {
  const response = await fetch(`https://swapi.dev/api/species/${id}`);
  const data = await response.json();
  return await data;
};

const getFilm = async (id) => {
  const response = await fetch(`https://swapi.dev/api/films/${id}`);
  const data = await response.json();
  return await data;
};

export {
  getAllData,
  getCharacters,
  getPlanets,
  getStarships,
  getVehicles,
  getSpecies,
  getFilms,
  getCharacter,
  getPlanet,
  getStarship,
  getVehicle,
  getSpecie,
  getFilm,
  getFilmsbyUrl,
  getSpeciesbyUrl,
  getVehiclesbyUrl,
  getStarshipsbyUrl,
  getCharacterbyUrl,
  getHomeWorld,
};
