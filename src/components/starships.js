import "../css/starships.css";
import { fetchResource, createLoadButtonEventListener } from "./common";
import { getStarships } from "../services/swapi";
import { progressTemplate } from "./UI";

localStorage.setItem("contador", "1");

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", progressTemplate());
const starshipContainer = document.querySelector("#starshipsContainer");
const loadMoreBtn = document.querySelector("#load_more");
const loadLessBtn = document.querySelector("#load_less");
const spinner = document.querySelector(".spinner");

const starshipsTemplate = (starship, id) => {
  const {
    cargo_capacity,
    consumables,
    cost_in_credits,
    hyperdrive_rating,
    length,
    manufacturer,
    starship_class,
    model,
    name,
    max_atmosphering_speed,
  } = starship;

  return `
      <div class="uniquestarships ">
            <p class="pcollapse">
                <a class="btn " role="button">${name}</a>
            </p>
            <div class="col">
                <div class="" id="char${id}">
                    <div class="card card-body">
                        <div class="card-char">
                            <h6>Characteristics</h6>
                            <div>
                                <p>Capacity: ${cargo_capacity}</p>
                                <p>Consumables: ${consumables}</p>
                                <p>Cost in credits: ${cost_in_credits}</p>
                                <p>Hyperdrive: ${hyperdrive_rating}</p>
                                <p>Length: ${length}</p>
                                <p>Class: ${starship_class}</p>
                                <p>Max Speed: ${max_atmosphering_speed}</p>
                                <p>Manufacter: ${manufacturer}</p>
                                <p>Model: ${model}</p>
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
  getStarships,
  starshipContainer,
  starshipsTemplate,
  spinner,
  main
);
createLoadButtonEventListener(
  loadLessBtn,
  getStarships,
  starshipContainer,
  starshipsTemplate,
  spinner,
  main
);

fetchResource(
  1,
  getStarships,
  starshipContainer,
  starshipsTemplate,
  spinner,
  main
);
