import "../css/characters.css";
import {
  fetchResource,
  createLoadButtonEventListener,
  containerEventLister,
} from "./common";
import { getCharacters } from "../services/swapi";
import { progressTemplate } from "./UI";

sessionStorage.setItem("contador", sessionStorage.getItem("cCharacter") || "1");

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", progressTemplate());
const charactersContainer = document.querySelector("#characters");
const loadMoreBtn = document.querySelector("#load_more");
const loadLessBtn = document.querySelector("#load_less");
const spinner = document.querySelector(".spinner");

const characterTemplate = (character, id) => {
  const {
    name,
    height,
    mass,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
    gender,
    url,
  } = character;

  return `
  <div class="uniqueCharacter ">
        <p class="pcollapse" data-url=${url} data-type="character">
            <a class="btn " role="button" >${name}</a>
        </p>
        <div class="col">
            <div class="" id="char${id}">
                <div class="card card-body">
                    <div class="card-char">
                        <h6>Characteristics</h6>
                        <div>
                            <p>Height: ${height}</p>
                            <p>Mass: ${mass}</p>
                            <p>Hair color: ${hair_color}</p>
                            <p>Skin color: ${skin_color}</p>
                            <p>Eye color: ${eye_color}</p>
                            <p>Birth Year: ${birth_year}</p>
                            <p>Gender: ${gender}</p>
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
  getCharacters,
  charactersContainer,
  characterTemplate,
  spinner,
  main
);
createLoadButtonEventListener(
  loadLessBtn,
  getCharacters,
  charactersContainer,
  characterTemplate,
  spinner,
  main
);
fetchResource(
  sessionStorage.getItem("cCharacter") || "1",
  getCharacters,
  charactersContainer,
  characterTemplate,
  spinner,
  main
);

containerEventLister(charactersContainer, ".pcollapse", "info");
