import { inject, observer } from "mobx-react";
import React from "react";
import TutorialDataService from "../services/TutorialService";
import { DB_FOLDERS, transition } from "../utils/const";
import { motion } from "framer-motion";
import { Palette } from "react-palette";

const ButtonsSave = inject("rootStore")(
  observer(function ButtonsSave({
    movie,
    rootStore: { setIsSaving, selectedSerie },
    colors,
  }) {
    const saveMovie = (movie, refDb) => {
      TutorialDataService.addDataTo(refDb, movie).then(() => {
        setIsSaving(true, refDb, movie.image);
        setTimeout(() => {
          setIsSaving(false);
        }, 1800);
      });
    };

    return (
      <>
        <div className="buttons-save">
          <Palette src={`https://image.tmdb.org/t/p/w342${movie.image}`}>
            {({ data, loading, error }) => {
              const definedColors = [
                data.lightMuted,
                data.muted,
                data.darkVibrant,
              ] || ["red", "blue", "yellow"];

              return (
                <>
                  {DB_FOLDERS.map((folder, i) => {
                    const { name, label } = folder;
                    return (
                      <motion.div
                        className="btn-save"
                        onClick={() => {
                          saveMovie(movie, name);
                        }}
                        initial={{ opacity: 0, y: 100 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        style={{ backgroundColor: definedColors[i] }}
                        key={i}
                      >
                        <p color={data.muted}>{label}</p>
                      </motion.div>
                    );
                  })}
                </>
              );
            }}
          </Palette>
        </div>
      </>
    );
  })
);

export default ButtonsSave;
