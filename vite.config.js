import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        characters: resolve(__dirname, "src/pages/characters.html"),
        films: resolve(__dirname, "src/pages/films.html"),
        planets: resolve(__dirname, "src/pages/planets.html"),
        species: resolve(__dirname, "src/pages/species.html"),
        starships: resolve(__dirname, "src/pages/starships.html"),
        vehicles: resolve(__dirname, "src/pages/vehicles.html"),
      },
    },
  },
});
