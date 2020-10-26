import ky from "ky";
import { initialNumberOfPages } from "../utils/const";

const mainUrl =
  "https://api.themoviedb.org/3/tv/popular?api_key=085f025c352f6e30faea971db0667d31";

export function getPopulatSerie() {
  const movies = Array(initialNumberOfPages)
    .fill(0)
    .map((_, i) => ky.get(mainUrl + "&page=" + i + 1).json())
    .flat(2);

  return Promise.all(movies).then((response) =>
    response.map((allMovies) => allMovies.results).flat(2)
  );
  // return ky.get(mainUrl + "&page=2").json();
}

export const getSingleSerieDetails = (id) => {
  const urlCall = `https://api.themoviedb.org/3/tv/${id}?api_key=085f025c352f6e30faea971db0667d31`;
  return ky.get(urlCall).json();
};
export const getRecommendations = (id) => {
  const urlCall = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=085f025c352f6e30faea971db0667d31`;
  return ky.get(urlCall).json();
};

export const getImagesSingleSerie = (id) => {
  const urlCall = `https://api.themoviedb.org/3/tv/${id}/images?api_key=085f025c352f6e30faea971db0667d31`;
  return ky.get(urlCall).json();
};
