import React from "react";
import { useList } from "react-firebase-hooks/database";
import { getAllFrom } from "../services/TutorialService";

function ListMovies({ folderDb }) {
  const [savedMovie, loading, error] = useList(getAllFrom(folderDb));

  return (
    <div>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Loading...</span>}

      <h1>{folderDb}</h1>
      <ul className="list-group">
        {!loading &&
          savedMovie &&
          savedMovie
            .slice()
            .reverse()
            .map((tutorial, index) => {
              return (
                <li className={""} key={index}>
                  <div>
                    <h1>{tutorial.val().title}</h1>
                  </div>
                </li>
              );
            })}
      </ul>
    </div>
  );
}

export default ListMovies;
