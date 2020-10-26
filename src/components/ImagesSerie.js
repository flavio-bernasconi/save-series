import { inject, observer } from "mobx-react";
import React from "react";

export const ImagesSerie = inject("rootStore")(
  observer(function ImagesSerie({ rootStore: { imagesSerie } }) {
    console.log("imagesSerie", imagesSerie.toJSON());

    return (
      <div className="poster-single-serie">
        {imagesSerie.map((pathImage) => {
          return (
            <img
              src={`https://image.tmdb.org/t/p/w500${pathImage}`}
              alt="movie poster"
              className="poster"
            />
          );
        })}
      </div>
    );
  })
);
