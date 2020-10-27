import { inject, observer } from "mobx-react";
import React from "react";
import TutorialDataService from "../services/TutorialService";
import { DB_FOLDERS, transition } from "../utils/const";
import { motion } from "framer-motion";

const ButtonsSave = inject("rootStore")(
  observer(function ButtonsSave({
    movie,
    rootStore: { setIsSaving, selectedSerie },
  }) {
    const saveMovie = (movie, refDb) => {
      TutorialDataService.addDataTo(refDb, movie).then((res) => {
        setIsSaving(true, refDb, movie.image);
        setTimeout(() => {
          setIsSaving(false);
        }, 1800);
      });
    };

    return (
      <>
        <div className="buttons-save">
          {DB_FOLDERS.map((folder, i) => {
            const { name, label, color } = folder;
            return (
              <motion.div
                className="btn-save"
                onClick={() => {
                  saveMovie(movie, name);
                }}
                initial={{ opacity: 0, y: -100 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 2.5, ...transition },
                  y: 0,
                }}
                style={{ backgroundColor: color }}
                key={i}
              >
                <p>{label}</p>
              </motion.div>
            );
          })}
        </div>
      </>
    );
  })
);

export default ButtonsSave;
