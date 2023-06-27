import "../css/header.css";
import { footer } from "./UI";

const mainElement = document.querySelector("main");
mainElement.insertAdjacentHTML("afterend", footer());

document.querySelector("#header").innerHTML = `
      <nav class="navbar  navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/index.html">SWAPI</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#navbarNav" aria-controls="navbarNav"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">

              <li class="nav-item">
                <a class="nav-link" href="/src/pages/characters.html">CHARACTERS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/pages/films.html">FILMS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/pages/species.html">SPECIES</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/pages/starships.html">STARSHIPS</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/pages/vehicles.html">VEHICLES</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/src/pages/planets.html">PLANETS</a>
              </li>

            </ul>
          </div>
        </div>
      </nav>
`;
