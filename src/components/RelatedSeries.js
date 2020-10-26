import React, { useState } from "react";
import { Link } from "react-router-dom";
import { transition } from "../utils/const";
import { randomnumber } from "../utils/Helpers";
import { motion } from "framer-motion";
import { inject, observer } from "mobx-react";
import ScrollContainer from "react-indiana-drag-scroll";

export const RelatedSeries = inject("rootStore")(
  observer(function RelatedSeries({
    rootStore: { fetchSingleSerieDetails, relatedSeries },
  }) {
    const [indexSelected, setIndexSelected] = useState();

    return (
      <div className={`related-series`}>
        <motion.h1 exit={{ y: 100, opacity: 0 }}>Related</motion.h1>
        <ScrollContainer className="scrollable-posters">
          {relatedSeries.map((serie, index) => {
            return (
              <motion.div
                exit={
                  indexSelected === index
                    ? {
                        opacity: 0,
                        y: "100vh",
                        transition: {
                          duration: 1,
                          delay: 0.6,
                          ...transition,
                        },
                      }
                    : {
                        opacity: 0,
                        x: randomnumber(100, -100) + "vw",
                        y: randomnumber(100, -100) + "vh",
                        scale: 0.5,
                        transition: {
                          duration: 0.5,
                          delay: 0.2,
                          ...transition,
                        },
                      }
                }
                key={index}
              >
                <Link
                  to={`/${serie.id}`}
                  onClick={() => {
                    setTimeout(() => {
                      fetchSingleSerieDetails(serie.id);
                    }, 1000);
                    setIndexSelected(index);
                  }}
                >
                  <motion.img
                    src={`https://image.tmdb.org/t/p/w500${serie.image}`}
                    alt="movie "
                    className="related-poster"
                  />
                </Link>
              </motion.div>
            );
          })}
        </ScrollContainer>
      </div>
    );
  })
);
