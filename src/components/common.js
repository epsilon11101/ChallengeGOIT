import { showProgress, hideProgress } from "./UI";

const fetchResource = async (
  page,
  getResource,
  resourceContainer,
  resourceTemplate,
  spinner,
  main
) => {
  showProgress(spinner);
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

const setSessionStorage = (value, key) => {
  if (key.includes("characters")) {
    sessionStorage.setItem("cCharacter", value.toString());
  }
  if (key.includes("planets")) {
    sessionStorage.setItem("cPlanet", value.toString());
  }
  if (key.includes("species")) {
    sessionStorage.setItem("cSpecie", value.toString());
  }
  if (key.includes("starships")) {
    sessionStorage.setItem("cStarship", value.toString());
  }
  if (key.includes("vehicles")) {
    sessionStorage.setItem("cVehicle", value.toString());
  }
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
    const currentLocation = window.location.href;

    // Desplazarse al inicio del documento
    window.scrollTo({ top: 0, behavior: "smooth" });
    let currentPage = parseInt(sessionStorage.getItem("contador"));

    if (isNaN(currentPage)) {
      currentPage = 1;
    }

    if (pageElement.id === "load_more") {
      const nextPage = currentPage >= 9 ? 9 : currentPage + 1;
      pageElement.dataset.page = nextPage;
      sessionStorage.setItem("contador", nextPage.toString());

      setSessionStorage(nextPage, currentLocation);

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
      sessionStorage.setItem("contador", previousPage.toString());

      setSessionStorage(previousPage, currentLocation);

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

const containerEventLister = (container, closestClass, locationPage) => {
  container.addEventListener("click", async (e) => {
    const closestTarget = e.target.closest(closestClass);
    if (closestTarget) {
      const url = closestTarget.dataset.url;
      const type = closestTarget.dataset.type;
      const encodeUrl = encodeURIComponent(url);
      const encodeType = encodeURIComponent(type);
      window.location.href = `./${locationPage}.html?dataUrl=${encodeUrl}&type=${encodeType}`;
    }
  });
};

const mainTemplate = (id, template) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.removeAttribute("id");
  main.setAttribute("id", id);
  main.insertAdjacentHTML("afterbegin", template());
};

export {
  fetchResource,
  createLoadButtonEventListener,
  containerEventLister,
  mainTemplate,
};
