import "../css/vehicles.css";
import { fetchResource, createLoadButtonEventListener } from "./common";
import { getVehicles } from "../services/swapi";
import { progressTemplate } from "./UI";

sessionStorage.setItem("contador", sessionStorage.getItem("cVehicle") || "1");

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", progressTemplate());
const vehiclesContainer = document.querySelector("#vehiclesContainer");
const loadMoreBtn = document.querySelector("#load_more");
const loadLessBtn = document.querySelector("#load_less");
const spinner = document.querySelector(".spinner");

const vehiclesTemplate = (starship, id) => {
  const {
    cargo_capacity,
    consumables,
    cost_in_credits,
    length,
    manufacturer,
    max_atmosphering_speed,
    model,
    name,
    vehicle_class,
  } = starship;

  return `
      <div class="uniquevehicle ">
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
                                <p>Length: ${length}</p>
                                <p>Class: ${vehicle_class}</p>
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
  getVehicles,
  vehiclesContainer,
  vehiclesTemplate,
  spinner,
  main
);
createLoadButtonEventListener(
  loadLessBtn,
  getVehicles,
  vehiclesContainer,
  vehiclesTemplate,
  spinner,
  main
);

fetchResource(
  sessionStorage.getItem("cVehicle") || "1",
  getVehicles,
  vehiclesContainer,
  vehiclesTemplate,
  spinner,
  main
);
