import "../css/info.css";
import {
  getCharacterbyUrl,
  getHomeWorld,
  getFilmsbyUrl,
  getSpeciesbyUrl,
  getVehiclesbyUrl,
  getStarshipsbyUrl,
} from "../services/swapi";

import { showProgress, hideProgress, progressTemplate } from "./UI";

import { charactersAssets } from "./charactersAssets";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterUrl = urlParams.get("character");
const decodeUrl = decodeURIComponent(characterUrl);
const infoContainer = document.querySelector("#characterWrapper #character");
const dataContainer = document.querySelector(
  "#characterWrapper #infoContainer"
);
const wrapperContainer = document.querySelector("#characterWrapper");
wrapperContainer.insertAdjacentHTML("afterbegin", progressTemplate());
const spinner = document.querySelector("#characterWrapper .spinner");

const infoTemplate = (character) => {
  const characterUrl = charactersAssets.find((characterAsset) =>
    characterAsset.name.includes(character.name)
  ).image;

  return `

    <div class="image">
        <h3>${character.name}</h3>
            <img src="${characterUrl}" />
    </div>
    <div class="info">
        <h2>INFO</h2>
            <p>height:  ${character.height} </p>
            <p>mass: ${character.mass} </p>
            <p>hair color: ${character.hair_color} </p>
            <p>skin color: ${character.skin_color} </p>
            <p>eye color: ${character.eye_color} </p>
            <p>birth year: ${character.birth_year} </p>
            <p>gender: ${character.gender} </p>
    </div>
    `;
};

const dataTemplate = (data, parent) => {
  console.log(data);
  if (typeof data === "string")
    return `
  <div id="${parent}">
    <h2>${parent}</h2>
    <p>${data}</p>
  </div>
    `;

  if (data.length != 0)
    return `
  <div id="${parent}">
    <h2>${parent}</h2>
    ${data.map((item) => `<p>${item}</p>`).join("")}
  </div>
    `;

  return "";
};

const decodeInfo = async (url) => {
  showProgress(spinner);

  const character = await getCharacterbyUrl(url);

  infoContainer.insertAdjacentHTML("afterbegin", infoTemplate(character));
  const { homeworld, films, species, vehicles, starships } = character;

  const planet = await getHomeWorld(homeworld);
  const filmsdata = [];
  await Promise.all(
    films.map(async (film) => {
      const filmName = await getFilmsbyUrl(film);
      filmsdata.push(filmName);
    })
  );
  const speciesdata = [];
  await Promise.all(
    species.map(async (specie) => {
      const specieName = await getSpeciesbyUrl(specie);
      speciesdata.push(specieName);
    })
  );
  const vehiclesdata = [];
  await Promise.all(
    vehicles.map(async (vehicle) => {
      const vehicleName = await getVehiclesbyUrl(vehicle);
      vehiclesdata.push(vehicleName);
    })
  );
  const starshipsdata = [];
  await Promise.all(
    starships.map(async (starship) => {
      const starshipName = await getStarshipsbyUrl(starship);
      starshipsdata.push(starshipName);
    })
  );

  hideProgress(spinner);

  dataContainer.insertAdjacentHTML(
    "afterbegin",
    dataTemplate(planet, "planet")
  );
  dataContainer.insertAdjacentHTML(
    "afterbegin",
    dataTemplate(filmsdata, "films")
  );
  dataContainer.insertAdjacentHTML(
    "afterbegin",
    dataTemplate(speciesdata, "species")
  );
  dataContainer.insertAdjacentHTML(
    "afterbegin",
    dataTemplate(vehiclesdata, "vehicles")
  );
  dataContainer.insertAdjacentHTML(
    "afterbegin",
    dataTemplate(starshipsdata, "starships")
  );
};

decodeInfo(decodeUrl);
