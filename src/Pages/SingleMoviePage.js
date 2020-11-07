import { inject, observer } from "mobx-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { transition } from "../utils/const";
import { randomnumber, cleanDataset } from "../utils/Helpers";
import ButtonsSave from "../components/ButtonsSave";
import { CardContent } from "../components/CardContent";
import { RelatedSeries } from "../components/RelatedSeries";

export const SingleMoviePage = inject("rootStore")(
  observer(function SingleMoviePage({
    rootStore: {
      selectedSerie,
      fetchSingleSerieDetails,
      relatedSeries,
      isSaving,
    },
  }) {
    const location = useLocation();

    useEffect(() => {
      const getIdFromUrl = location.pathname.slice(7);
      window.scrollTo(0, 0);
      if (Object.keys(selectedSerie).length === 0)
        fetchSingleSerieDetails(getIdFromUrl);
    }, []);

    useEffect(() => {
      // card3DEffect();
      setTimeout(() => {
        window.scrollTo({ top: window.innerHeight / 2, behavior: "smooth" });
      }, 2300);
    }, []);

    const { poster_path: image } = selectedSerie;
    const { value, folder } = isSaving;

    return (
      Object.keys(selectedSerie).length > 0 && (
        <motion.div
          className="single-serie"
          initial="exit"
          animate="enter"
          exit="exit"
        >
          <div className="wrapper-animation">
            <motion.img
              src={`https://image.tmdb.org/t/p/w342${image}`}
              alt="movie poster"
              className={`poster saving-animation ${value ? "active" : ""}`}
            />
            <div className={`folder ${value ? "active" : ""}`}>{folder}</div>
            <div className={`folder-back ${value ? "active" : ""}`} />
          </div>

          <div className="wrapper-header">
            <motion.img
              src={`https://image.tmdb.org/t/p/w500${image}`}
              alt="movie poster"
              className="poster"
              initial={{ y: "35%", opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                boxShadow: "-10px 10px 30px black",
              }}
              transition={{ ...transition, duration: 1.2, delay: 0.7 }}
            />

            <motion.div
              className="blur-image"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/w500${image})`,
                backgroundPosition: "center",
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...transition, duration: 0.6 }}
            />
          </div>
          <motion.div
            className="content"
            initial={{ y: 300, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { ...transition, duration: 0.7, delay: 1.3 },
            }}
            exit={{ opacity: 0 }}
          >
            <ButtonsSave movie={cleanDataset([selectedSerie])[0]} />
            <CardContent selectedSerie={selectedSerie} />
          </motion.div>
          {/* <ImagesSerie /> */}

          <RelatedSeries />
        </motion.div>
      )
    );
  })
);
