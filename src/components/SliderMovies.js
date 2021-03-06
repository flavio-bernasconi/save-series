import React, { useEffect, useState } from "react";
import { inject, observer } from "mobx-react";
import InfiniteScroll from "react-infinite-scroll-component";
import { transition } from "../utils/const";
import { randomnumber } from "../utils/Helpers";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "./Loader";
import ButtonsSave from "./ButtonsSave";
import { Palette } from "react-palette";

export const SliderMovies = inject("rootStore")(
  observer(function SliderMovies({
    rootStore: {
      datesetSeries,
      fetchMoreSeries,
      fetchSingleSerieDetails,
      setRestoredScroll,
      restoredScroll,
    },
  }) {
    const [indexSelected, setIndexSelected] = useState();
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        window.scrollTo({ top: restoredScroll, behavior: "smooth" });
      }, 50);
    }, []);

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

                console.log();
                return (
                  <motion.div
                    className={"movie-card"}
                    exit={
                      indexSelected === index
                        ? {
                            x: "0",
                            left: "0",
                            scale: 0,
                            transition: {
                              duration: 1,
                              delay: 0.6,
                              ...transition,
                            },
                          }
                        : {
                            opacity: 0,
                            y: "120vh",
                            scale: 0.5,
                            transition: {
                              duration: 0.3,
                              delay: 0.2,
                              ...transition,
                            },
                          }
                    }
                    key={index}
                  >
                    <Link
                      to={`/serie/${id}`}
                      onClick={(e) => {
                        fetchSingleSerieDetails(id);
                        setRestoredScroll(document.documentElement.scrollTop);
                      }}
                      onMouseEnter={() => setIndexSelected(index)}
                    >
                      <motion.img
                        className={
                          indexSelected === index ? "selected-element" : ""
                        }
                        src={`https://image.tmdb.org/t/p/w342${image}`}
                        alt="movie poster"
                      />
                      <h1 className="button-info">+</h1>
                    </Link>
                    <div className="card-buttons-container">
                      <div
                        className="accordion-btns"
                        onClick={() => {
                          setIsAccordionOpen(!isAccordionOpen);
                          setIndexSelected(index);
                        }}
                        onMouseLeave={() => setIsAccordionOpen(false)}
                      >
                        <div
                          className={
                            indexSelected === index && isAccordionOpen
                              ? "open"
                              : "close"
                          }
                        >
                          <ButtonsSave movie={movie} />
                        </div>
                        <div className="btn-open">
                          <p>
                            {indexSelected === index && isAccordionOpen
                              ? "close"
                              : "save"}
                          </p>
                        </div>
                      </div>
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
