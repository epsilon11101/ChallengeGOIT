import { showProgress, hideProgress } from "./UI";
import { getStarships, getPlanets, getCharacters } from "../services/swapi";

const fetchResource = async (
  page,
  getResource,
  resourceContainer,
  resourceTemplate,
  spinner,
  main
) => {
  showProgress(spinner);
  console.log("haciendo peticion a la pagina", page);
  const resources = await getResource(page);
  hideProgress(spinner);
  main.classList.add("showBg");
  await setTimeout(() => {
    resourceContainer.classList.remove("hide");
  }, 1500);

  resourceContainer.innerHTML = "";
  resources.map(async (resource, id) => {
    resourceContainer.insertAdjacentHTML(
      "beforeend",
      resourceTemplate(resource, id)
    );
  });
};

const createLoadButtonEventListener = (
  pageElement,
  getResource,
  resourceContainer,
  resourceTemplate,
  spiner,
  main
) => {
  pageElement.addEventListener("click", async () => {
    // Desplazarse al inicio del documento
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentPage = parseInt(localStorage.getItem("contador"));
    if (isNaN(currentPage)) {
      currentPage = 1;
    }

    if (pageElement.id === "load_more") {
      const nextPage = currentPage >= 9 ? 9 : currentPage + 1;
      pageElement.dataset.page = nextPage;
      localStorage.setItem("contador", nextPage.toString());
      await fetchResource(
        nextPage,
        getResource,
        resourceContainer,
        resourceTemplate,
        spiner,
        main
      );
    } else if (pageElement.id === "load_less") {
      const previousPage = currentPage <= 1 ? 1 : currentPage - 1;
      console.log(currentPage, previousPage);
      pageElement.dataset.page = previousPage;
      localStorage.setItem("contador", previousPage.toString());
      await fetchResource(
        previousPage,
        getResource,
        resourceContainer,
        resourceTemplate,
        spiner,
        main
      );
    }
  });
};

export { fetchResource, createLoadButtonEventListener };
