import "../css/info.css";
import {
  getCharacterbyUrl,
  getHomeWorld,
  getFilmsbyUrl,
  getSpeciesbyUrl,
  getVehiclesbyUrl,
  getStarshipsbyUrl,
} from "../services/swapi";
import { charactersAssets } from "./charactersAssets";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterUrl = urlParams.get("character");
const decodeUrl = decodeURIComponent(characterUrl);

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

const dataTemplate = (data) => {
  return `
    <p>${data}</p>
    `;
};

const decodeInfo = async (url) => {
  const character = await getCharacterbyUrl(url);
  const infoContainer = document.querySelector("#characterWrapper #character");
  infoContainer.insertAdjacentHTML("afterbegin", infoTemplate(character));
  const { homeworld, films, species, vehicles, starships } = character;

  const planetContainer = document.querySelector(
    "#characterWrapper #planet h2"
  );
  const planet = await getHomeWorld(homeworld);
  planetContainer.insertAdjacentHTML("afterend", dataTemplate(planet));

  const filmContainer = document.querySelector("#characterWrapper #film h2");
  films.map(async (film) => {
    const filmName = await getFilmsbyUrl(film);
    filmContainer.insertAdjacentHTML("afterend", dataTemplate(filmName));
  });

  const speciesContainer = document.querySelector(
    "#characterWrapper #specie h2"
  );
  species.map(async (specie) => {
    const specieName = await getSpeciesbyUrl(specie);
    console.log("species", specieName);
    speciesContainer.insertAdjacentHTML("afterend", dataTemplate(specieName));
  });

  const vehiclesContainer = document.querySelector(
    "#characterWrapper #vehicles h2"
  );
  vehicles.map(async (vehicle) => {
    const vehicleName = await getVehiclesbyUrl(vehicle);
    vehiclesContainer.insertAdjacentHTML("afterend", dataTemplate(vehicleName));
  });

  const starshipsContainer = document.querySelector(
    "#characterWrapper #starships h2"
  );

  starships.map(async (starship) => {
    const starshipName = await getStarshipsbyUrl(starship);
    starshipsContainer.insertAdjacentHTML(
      "afterend",
      dataTemplate(starshipName)
    );
  });
};

decodeInfo(decodeUrl);
