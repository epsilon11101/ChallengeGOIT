import "../css/filmsInfo.css";
import { fetchImage } from "../services/fetchimg";
import {
  getCharacterbyUrl,
  getHomeWorld,
  getFilmsbyUrl,
  getSpeciesbyUrl,
  getVehiclesbyUrl,
  getStarshipsbyUrl,
} from "../services/swapi";
import { mainTemplate } from "./common";
import { showProgress, hideProgress, progressTemplate } from "./UI";

// query params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const filmUrl = urlParams.get("dataUrl");
const decodeUrl = decodeURIComponent(filmUrl);

// params: main id and func: template
mainTemplate("filmsInfo", template);
// film containers

const mainInfoContainer = document.querySelector("#infoWrapper");
const infoContainer = document.querySelector("#infoWrapper #film");
const filmCardContainer = document.querySelector(
  "#infoWrapper #infoContainerCard"
);

mainInfoContainer.insertAdjacentHTML("afterbegin", progressTemplate());
const spinner = document.querySelector("#infoWrapper .spinner");

//main template
function template() {
  return `
          <div id="infoWrapper">
            <div id="film">
            </div>
            <div id="infoContainerCard">
            </div>
          </div>
    `;
}
//film template
const filmTemplate = (film) => {
  const { director, episode_id, opening_crawl, producer, release_date, title } =
    film;
  return `
        <div class="film_info">
          <h2>${title}</h2>
          <p>Director: ${director}</p>
          <p>Episode: ${episode_id}</p>
          <p>Opening: ${opening_crawl}</p>
          <p>Producer: ${producer}</p>
          <p>Release: ${release_date}</p>
        </div>
        <img src="../assets/films/${episode_id}.jpg" />
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
          <p>${item.name}</p>
        </div>
      </li>`;
  });

  const listItems = await Promise.all(listItemPromises);
  return listItems.join("");
};

const decodeInfo = async (url) => {
  showProgress(spinner);
  const film = await getFilmsbyUrl(url);

  const { characters, planets, species, starships, vehicles } = film;

  const allcharacters = await Promise.all(
    characters.map(async (character) => {
      const characterInfo = await getCharacterbyUrl(character);
      return characterInfo;
    })
  );
  const allPlanets = await Promise.all(
    planets.map(async (planet) => {
      const planetInfo = await getHomeWorld(planet);
      return planetInfo;
    })
  );
  const allSpecies = await Promise.all(
    species.map(async (specie) => {
      const specieInfo = await getSpeciesbyUrl(specie);
      return specieInfo;
    })
  );
  const allStarships = await Promise.all(
    starships.map(async (starship) => {
      const starshipInfo = await getStarshipsbyUrl(starship);
      return starshipInfo;
    })
  );
  const allVehicles = await Promise.all(
    vehicles.map(async (vehicle) => {
      const vehicleInfo = await getVehiclesbyUrl(vehicle);
      return vehicleInfo;
    })
  );

  hideProgress(spinner);

  infoContainer.insertAdjacentHTML("afterbegin", filmTemplate(film));

  filmCardContainer.insertAdjacentHTML(
    "afterbegin",
    cardTemplate("Characters")
  );
  filmCardContainer.insertAdjacentHTML("afterbegin", cardTemplate("Planets"));
  filmCardContainer.insertAdjacentHTML("afterbegin", cardTemplate("Species"));
  filmCardContainer.insertAdjacentHTML("afterbegin", cardTemplate("Starships"));
  filmCardContainer.insertAdjacentHTML("afterbegin", cardTemplate("Vehicles"));

  const cardcharacters = document.querySelector("#card_Characters");
  const cardplanets = document.querySelector("#card_Planets");
  const cardspecies = document.querySelector("#card_Species");
  const cardstarships = document.querySelector("#card_Starships");
  const cardvehicles = document.querySelector("#card_Vehicles");

  cardcharacters.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allcharacters, "characters")
  );

  cardplanets.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allPlanets, "planets")
  );
  cardspecies.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allSpecies, "species")
  );
  cardstarships.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allStarships, "starships")
  );
  cardvehicles.insertAdjacentHTML(
    "afterbegin",
    await InfoTemplate(allVehicles, "vehicles")
  );
};

decodeInfo(decodeUrl);
