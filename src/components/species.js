import "../css/species.css";
import { fetchResource, createLoadButtonEventListener } from "./common";
import { getSpecies } from "../services/swapi";
import { progressTemplate } from "./UI";

sessionStorage.setItem("contador", sessionStorage.getItem("cSpecie") || "1");

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", progressTemplate());
const speciesContainer = document.querySelector("#speciesContainer");
const loadMoreBtn = document.querySelector("#load_more");
const loadLessBtn = document.querySelector("#load_less");
const spinner = document.querySelector(".spinner");

const speciesTemplate = (starship, id) => {
  const {
    average_height,
    average_lifespan,
    classification,
    designation,
    eye_colors,
    hair_colors,
    language,
    name,
  } = starship;

  return `
      <div class="uniquespecie ">
            <p class="pcollapse">
                <a class="btn " role="button">${name}</a>
            </p>
            <div class="col">
                <div class="" id="char${id}">
                    <div class="card card-body">
                        <div class="card-char">
                            <h6>Characteristics</h6>
                            <div>
                                <p>Height: ${average_height}</p>
                                <p>Lifespan: ${average_lifespan}</p>
                                <p>Classification: ${classification}</p>
                                <p>Designation: ${designation}</p>
                                <p>Eye colors: ${eye_colors}</p>
                                <p>Hair color: ${hair_colors}</p>
                                <p>Language: ${language}</p>
                                
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
  getSpecies,
  speciesContainer,
  speciesTemplate,
  spinner,
  main
);
createLoadButtonEventListener(
  loadLessBtn,
  getSpecies,
  speciesContainer,
  speciesTemplate,
  spinner,
  main
);

fetchResource(
  sessionStorage.getItem("cSpecie") || "1",
  getSpecies,
  speciesContainer,
  speciesTemplate,
  spinner,
  main
);
