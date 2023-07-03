import "../css/planets.css";
import { fetchResource, createLoadButtonEventListener } from "./common";
import { getPlanets } from "../services/swapi";
import { progressTemplate } from "./UI";

sessionStorage.setItem("contador", sessionStorage.getItem("cPlanet") || "1");

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", progressTemplate());
const planetsContainer = document.querySelector("#planetsContainer");
const loadMoreBtn = document.querySelector("#load_more");
const loadLessBtn = document.querySelector("#load_less");
const spinner = document.querySelector(".spinner");

const planetTemplate = (planet, id) => {
  const {
    climate,
    diameter,
    gravity,
    name,
    orbital_period,
    population,
    rotation_period,
    surface_water,
    terrain,
  } = planet;

  return `
    <div class="uniquePlanet ">
          <p class="pcollapse">
              <a class="btn " role="button">${name}</a>
          </p>
          <div class="col">
              <div class="" id="char${id}">
                  <div class="card card-body">
                      <div class="card-char">
                          <h6>Characteristics</h6>
                          <div>
                              <p>Climate: ${climate}</p>
                              <p>Diameter: ${diameter}</p>
                              <p>Gravity: ${gravity}</p>
                              <p>Orbital period: ${orbital_period}</p>
                              <p>Population: ${population}</p>
                              <p>Rotation: ${rotation_period}</p>
                              <p>Terrain: ${terrain}</p>
                              <p>Surface Water: ${surface_water}</p>
                          </div>
                      </div>
                  </div>
              </div>
      </div>
    <div>
      `;
};

createLoadButtonEventListener(
  loadMoreBtn,
  getPlanets,
  planetsContainer,
  planetTemplate,
  spinner,
  main
);
createLoadButtonEventListener(
  loadLessBtn,
  getPlanets,
  planetsContainer,
  planetTemplate,
  spinner,
  main
);

fetchResource(
  sessionStorage.getItem("cPlanet") || "1",
  getPlanets,
  planetsContainer,
  planetTemplate,
  spinner,
  main
);
