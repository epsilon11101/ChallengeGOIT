import "../css/cards.css";

import characters from "../assets/mainPage/characters.jpg";
import planets from "../assets/mainPage/planets.jpg";
import starships from "../assets/mainPage/starship.webp";
import vehicles from "../assets/mainPage/vehicles.jpeg";
import species from "../assets/mainPage/species.jpg";
import films from "../assets/mainPage/films.jpg";

const images = [characters, planets, starships, vehicles, species, films];
const titles = [
  "CHARACTERS",
  "PLANETS",
  "STARSHIPS",
  "VEHICLES",
  "SPECIES",
  "FILMS",
];

const cardTemplate = (title, image) => `
        <div class="card " style="width: 18rem" data-name="${title}">
            <img class="card-img-top" src="${image}"
            alt="Card image cap">
            <div class="card-body">
                <p class="card-text">${title}</p>
            </div>
        </div>`;

const cards = titles
  .map((title, index) => cardTemplate(title, images[index]))
  .join("");

const cardWrapper = document.querySelector("#cards");
cardWrapper.innerHTML = cards;
cardWrapper.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) {
    const page_title = card.dataset.name.toLowerCase();
    window.location.href = `/src/pages/${page_title}.html`;
  }
});
