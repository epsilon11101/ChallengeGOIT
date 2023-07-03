import "../css/info.css";
import "../css/filmsInfo.css";
import {
  getCharacterbyUrl,
  getHomeWorld,
  getFilmsbyUrl,
  getSpeciesbyUrl,
  getVehiclesbyUrl,
  getStarshipsbyUrl,
} from "../services/swapi";

import { fetchImage } from "../services/fetchimg";
import { mainTemplate } from "./common";
import { showProgress, hideProgress, progressTemplate } from "./UI";

import errorImage from "../assets/error.jpg";

//main template
mainTemplate("characters_info", template);

//containers
let infoContainer;
//este contiene todos los ul
let dataContainer;
let wrapperContainer;
let spinner;

function template() {
  return `
            <div id="characterWrapper">
                <div id="character"></div>
                <div id="infoContainerCard">
                </div>
            </div>
            `;
}

const infoTemplate = (character) => {
  const id = character.url.split("/").filter(Boolean).pop();
  return `

    <div class="image">
        <h3>${character.name}</h3>
            <img src="https://starwars-visualguide.com/assets/img/characters/${id}.jpg" />
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
const cardTemplate = (title) => {
  return `
  <div  class="card" style="width: 18rem;">
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <div class="card-body" >
      <ul id="card_${title}">
      </ul>
      </div>
    </div>
  </div>
`;
};

const InfoTemplate = async (data, param) => {
  const listItemPromises = data.map(async (item) => {
    const id = item.url.split("/").filter(Boolean).pop();
    let url = await fetchImage(
      `https://starwars-visualguide.com/assets/img/${param}/${id}.jpg`
    );
    if (url === "404") {
      url = errorImage;
    }

    return `
      <li>
        <div class="avatarWrapper">
          <img src="${url}" alt="${item.name}" />
          <p>${item.name ?? item.title}</p>
        </div>
      </li>`;
  });

  const listItems = await Promise.all(listItemPromises);
  return listItems.join("");
};

const decodeInfo = async (url) => {
  showProgress(spinner);

  const character = await getCharacterbyUrl(url);

  const { homeworld, films, species, vehicles, starships } = character;

  const allFilms = await Promise.all(
    films.map(async (film) => {
      const filmInfo = await getFilmsbyUrl(film);
      return filmInfo;
    })
  );
  const allSpecies = await Promise.all(
    species.map(async (specie) => {
      const specieInfo = await getSpeciesbyUrl(specie);
      return specieInfo;
    })
  );
  const allVehicles = await Promise.all(
    vehicles.map(async (vehicle) => {
      const vehicleInfo = await getVehiclesbyUrl(vehicle);
      return vehicleInfo;
    })
  );
  const allStarships = await Promise.all(
    starships.map(async (starship) => {
      const starshipInfo = await getStarshipsbyUrl(starship);
      return starshipInfo;
    })
  );
  const homeWorldInfo = await getHomeWorld(homeworld);

  infoContainer.insertAdjacentHTML("afterbegin", infoTemplate(character));
  dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("HomeWorld"));
  const cardHomeWorld = document.querySelector("#card_HomeWorld");
  cardHomeWorld.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate([homeWorldInfo], "planets")
  );

  if (allFilms.length > 0) {
    dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Films"));
    const cardFilms = document.querySelector("#card_Films");
    cardFilms.insertAdjacentHTML(
      "afterbegin",
      await InfoTemplate(allFilms, "films")
    );
  }

  if (allSpecies.length > 0) {
    dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Species"));
    const cardSpecies = document.querySelector("#card_Species");
    cardSpecies.insertAdjacentHTML(
      "afterbegin",
      await InfoTemplate(allSpecies, "species")
    );
  }

  if (allVehicles.length > 0) {
    dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Vehicles"));
    const cardVehicles = document.querySelector("#card_Vehicles");
    cardVehicles.insertAdjacentHTML(
      "afterbegin",
      await InfoTemplate(allVehicles, "vehicles")
    );
  }

  if (allStarships.length > 0) {
    dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Starships"));
    const cardStarships = document.querySelector("#card_Starships");
    cardStarships.insertAdjacentHTML(
      "afterbegin",
      await InfoTemplate(allStarships, "starships")
    );
  }

  hideProgress(spinner);
};

export function init() {
  // query params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const characterUrl = urlParams.get("dataUrl");
  const decodeUrl = decodeURIComponent(characterUrl);
  infoContainer = document.querySelector("#characterWrapper #character");
  //este contiene todos los ul
  dataContainer = document.querySelector(
    "#characterWrapper #infoContainerCard"
  );
  wrapperContainer = document.querySelector("#characterWrapper");
  wrapperContainer.insertAdjacentHTML("afterbegin", progressTemplate());
  spinner = document.querySelector("#characterWrapper .spinner");
  decodeInfo(decodeUrl);
}
