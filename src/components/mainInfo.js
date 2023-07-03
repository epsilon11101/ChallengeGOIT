window.addEventListener("load", async function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const urlP = urlParams.get("dataUrl");
  const typeP = urlParams.get("type");
  console.log(typeP);
  switch (typeP) {
    case "character":
      const module = import.meta.globEager("./info.js");
      const initFunction = module["./info.js"].init;
      if (typeof initFunction === "function") {
        initFunction();
      } else {
        console.error("init function not found in info.js");
      }
      break;
    case "film":
      const moduleInfo = import.meta.globEager("./filmsInfo.js");
      const initFunctionInfo = moduleInfo["./filmsInfo.js"].init;
      if (typeof initFunctionInfo === "function") {
        initFunctionInfo();
      } else {
        console.error("init function not found in filmsInfo.js");
      }
      break;
  }
});
