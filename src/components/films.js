import "../css/films.css";
import { fetchResource, createLoadButtonEventListener } from "./common";
import { getFilms } from "../services/swapi";
import { progressTemplate } from "./UI";

localStorage.setItem("contador", "1");

const main = document.querySelector("main");
main.insertAdjacentHTML("afterbegin", progressTemplate());
const filmsContainer = document.querySelector("#filmsContainer");
const loadMoreBtn = document.querySelector("#load_more");
const loadLessBtn = document.querySelector("#load_less");
const spinner = document.querySelector(".spinner");

const filmsTemplate = (film, id) => {
  const {
    director,
    episode_id,
    producer,
    release_date,
    title: name,
    opening_crawl,
  } = film;

  return `
      <div class="uniqueFilm ">
            <p class="pcollapse">
                <a class="btn " role="button">${name}</a>
            </p>
            <div class="col">
                <div class="" id="char${id}">
                    <div class="card card-body">
                        <div class="card-char">
                            <div>
                                <p>Director: ${director}</p>
                                <p>Episode: ${episode_id}</p>
                                <p>Producer: ${producer}</p>
                                <p>Release: ${release_date}</p>
                                <p>Description: ${opening_crawl}</p>
                                
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
  getFilms,
  filmsContainer,
  filmsTemplate,
  spinner,
  main
);
createLoadButtonEventListener(
  loadLessBtn,
  getFilms,
  filmsContainer,
  filmsTemplate,
  spinner,
  main
);

fetchResource(1, getFilms, filmsContainer, filmsTemplate, spinner, main);
