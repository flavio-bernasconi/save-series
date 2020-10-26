import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { transition } from "../utils/const";
import { randomnumber } from "../utils/Helpers";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "./Loader";
import ButtonsSave from "./ButtonsSave";

export const SliderMovies = inject("rootStore")(
  observer(function SliderMovies({
    rootStore: { datesetSeries, fetchMoreSeries, fetchSingleSerieDetails },
  }) {
    const [indexSelected, setIndexSelected] = useState();

    return (
      <motion.div
        className="list row"
        initial="exit"
        animate="enter"
        exit="exit"
      >
        <div className="col-md-6">
          <motion.div className="movie-cards-container">
            <InfiniteScroll
              dataLength={datesetSeries.length}
              next={fetchMoreSeries}
              hasMore={true}
              loader={<Loader />}
            >
              {datesetSeries.map((movie, index) => {
                const { id, image } = movie;
                return (
                  <motion.div
                    className={"movie-card"}
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
                      to={`/${id}`}
                      onClick={() => {
                        fetchSingleSerieDetails(id);
                        setIndexSelected(index);
                      }}
                    >
                      <motion.img
                        className={
                          indexSelected === index ? "selected-element" : ""
                        }
                        src={`https://image.tmdb.org/t/p/w500${image}`}
                        alt="movie poster"
                      />
                      <h1 className="button-info">+</h1>
                    </Link>
                    <div className="card-buttons-container">
                      <ButtonsSave movie={movie} />
                    </div>
                  </motion.div>
                );
              })}
            </InfiniteScroll>
          </motion.div>
        </div>
      </motion.div>
    );
  })
);
