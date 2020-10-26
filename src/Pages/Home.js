import React, { useEffect } from "react";
import ListMovies from "../components/ListMovies";
import { SliderMovies } from "../components/SliderMovies";
import { inject, observer } from "mobx-react";
import { motion } from "framer-motion";

export const Home = inject("rootStore")(
  observer(function Home({
    rootStore: { fetchSeries, selectedSerie, isSaving },
  }) {
    useEffect(() => {
      fetchSeries();
    }, []);

    console.log(selectedSerie);

    const { value, folder, image } = isSaving;

    return (
      <div>
        {/* <div style={{ height: "200vh" }}></div> */}
        <ListMovies folderDb="to-watch" />
        <ListMovies folderDb="watched" />
        <SliderMovies />
        <div className="wrapper-animation">
          <motion.img
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt="movie poster"
            className={`poster saving-animation ${value ? "active" : ""}`}
          />
          <div className={`folder ${value ? "active" : ""}`}>{folder}</div>
          <div className={`folder-back ${value ? "active" : ""}`} />
        </div>
      </div>
    );
  })
);
