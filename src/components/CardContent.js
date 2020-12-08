import React from "react";
import { cleanDataset } from "../utils/Helpers";
import ButtonsSave from "./ButtonsSave";

const GenericDetail = ({ movieDbKey }) =>
  movieDbKey.map((e, i) => <h1 key={i}>{e.name}</h1>);

const GenericRow = ({ movieDbKey, label }) => (
  <div className="row-detail">
    <p>{label}</p>
    <GenericDetail movieDbKey={movieDbKey} />
  </div>
);

export function CardContent({ selectedSerie }) {
  const {
    name,
    overview,
    created_by,
    genres,
    networks,
    number_of_episodes,
    number_of_seasons,
    vote_average,
    first_air_date: startDate,
  } = selectedSerie;
  console.log(selectedSerie);
  return (
    <div className="container">
      <div className="first-section">
        <div className="title-description">
          <h1>{name}</h1>
          <p>{overview}</p>
          <ButtonsSave movie={cleanDataset([selectedSerie])[0]} />
        </div>
        <div className="table-details">
          <GenericRow movieDbKey={created_by} label={"Created by:"} />
          <GenericRow movieDbKey={genres} label={"Generes:"} />
          <GenericRow movieDbKey={networks} label={"Networks:"} />
          <div className="row-detail flex">
            <div>
              <p>Episodes</p>
              <h1>{number_of_episodes}</h1>
            </div>
            <div>
              <p>Seasons</p>
              <h1>{number_of_seasons}</h1>
            </div>
          </div>
          <div className="row-detail">
            <p>Year</p>
            <h1>{startDate.slice(0, 4)}</h1>
          </div>
          <div className="row-detail">
            <p>Rate</p>
            <h1>{vote_average}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
