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

// query params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterUrl = urlParams.get("dataUrl");
const decodeUrl = decodeURIComponent(characterUrl);

//main template
mainTemplate("characters_info", template);

//containers
const infoContainer = document.querySelector("#characterWrapper #character");
//este contiene todos los ul
const dataContainer = document.querySelector(
  "#characterWrapper #infoContainerCard"
);
const wrapperContainer = document.querySelector("#characterWrapper");
wrapperContainer.insertAdjacentHTML("afterbegin", progressTemplate());
const spinner = document.querySelector("#characterWrapper .spinner");

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
      url = "../assets/error.jpg";
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

  dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("HomeWorld"));
  dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Films"));
  dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Species"));
  dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Vehicles"));
  dataContainer.insertAdjacentHTML("afterbegin", cardTemplate("Starships"));

  const cardHomeWorld = document.querySelector("#card_HomeWorld");
  const cardFilms = document.querySelector("#card_Films");
  const cardSpecies = document.querySelector("#card_Species");
  const cardVehicles = document.querySelector("#card_Vehicles");
  const cardStarships = document.querySelector("#card_Starships");

  infoContainer.insertAdjacentHTML("afterbegin", infoTemplate(character));

  cardHomeWorld.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate([homeWorldInfo], "planets")
  );

  cardFilms.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allFilms, "films")
  );

  cardSpecies.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allSpecies, "species")
  );

  cardVehicles.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allVehicles, "vehicles")
  );

  cardStarships.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allStarships, "starships")
  );

  hideProgress(spinner);
};

decodeInfo(decodeUrl);
