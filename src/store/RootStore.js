import ky from "ky";
import { types as t } from "mobx-state-tree";
import {
  getImagesSingleSerie,
  getPopulatSerie,
  getRecommendations,
  getSingleSerieDetails,
} from "../services/apiMovieDb";
import { initialNumberOfPages } from "../utils/const";
import { cleanDataset } from "../utils/Helpers";

const mainUrl =
  "https://api.themoviedb.org/3/tv/popular?api_key=085f025c352f6e30faea971db0667d31";

const MovieModel = t.model("MovieModel", {
  index: t.optional(t.number, 0),
  id: t.optional(t.number, 0),
  title: t.optional(t.string, ""),
  image: t.optional(t.string, ""),
});

const ImageSerieModel = t.model("ImageSerieModel", {
  image_path: t.optional(t.string, ""),
});

export const RootStore = t
  .model("RootStore", {
    currentUser: t.optional(t.frozen(), {}),
    currentPageResults: t.optional(t.number, initialNumberOfPages),
    datesetSeries: t.optional(t.array(MovieModel), []),
    relatedSeries: t.optional(t.array(MovieModel), []),
    selectedSerie: t.optional(t.frozen(), {}),
    isSaving: t.optional(t.frozen(), {}),
    imagesSerie: t.optional(t.array(t.string), []),
    restoredScroll: t.optional(t.number, 0),
    // relatedChords: t.optional(t.array(t.frozen()), []),
    // rootOctave: t.optional(t.string, ""),
    // inversion: t.optional(t.number, 0),
    // initialChord: t.optional(t.array(t.frozen()), []),
  })
  .actions((self) => ({
    setCurrentUser(user) {
      self.currentUser = user;
    },
    setCurrentPageResults() {
      self.currentPageResults = self.currentPageResults + 1;
    },
    fetchMoreSeries() {
      self.setCurrentPageResults();
      const seriesToadd = ky
        .get(mainUrl + "&page=" + self.currentPageResults)
        .json();
      seriesToadd.then((res) => {
        setTimeout(() => {
          self.setDatasetSeries([
            ...self.datesetSeries,
            ...cleanDataset(res.results),
          ]);
        }, 800);
      });
    },
    setDatasetSeries(dataset) {
      self.datesetSeries = dataset;
    },
    fetchSeries() {
      if (self.currentPageResults === 1) {
        getPopulatSerie()
          .then((res) => {
            self.setDatasetSeries(cleanDataset(res));
          })
          .catch((err) => console.log(err));
      } else {
        console.log("aoi");
      }
    },
    async fetchSingleSerieDetails(id) {
      self.setSelectedSerie(await getSingleSerieDetails(id));
      self.setRelatedSeries(await getRecommendations(id));
      self.setImagesSerie(await getImagesSingleSerie(id));
    },
    setSelectedSerie(data) {
      self.selectedSerie = data;
    },
    setRelatedSeries(data) {
      self.relatedSeries = cleanDataset(data.results);
    },
    setRestoredScroll(scrollTop) {
      self.restoredScroll = scrollTop;
    },
    setImagesSerie(data) {
      const backdropsPaths = data.backdrops
        .filter((backdrop) => backdrop.width < 2000)
        .map((backdrop) => backdrop.file_path)
        .slice(0, 6);
      console.log(data);
      self.imagesSerie = backdropsPaths;
    },
    setIsSaving(value, folder, image) {
      self.isSaving = { value, folder, image };
    },
  }))
  .views((self) => ({
    selectedNotesIndex() {
      return self.selectedNotes.map((note) => note.index);
    },
  }));
