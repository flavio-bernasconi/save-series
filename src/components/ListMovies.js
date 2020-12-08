import React, { useState, useEffect } from "react";
import { deleteItem, getDataFromList } from "../services/CRUD";

export default function ListMovies({ folderDb }) {
  const [todoList, setTodoList] = useState();

  useEffect(() => {
    getDataFromList(folderDb, setTodoList);
  }, []);

  const keys = todoList && Object.keys(todoList);
  console.log(keys);

  return (
    <div>
      <h1>{folderDb}</h1>
      {todoList && keys && (
        <ul className="list-saved">
          {console.log(todoList)}
          {Object.values(todoList).map((item, i) => {
            console.log(item.id);
            return (
              <li className="list-item" key={i}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.image}`}
                  alt="movie "
                />
                {item.title}
                <button onClick={() => deleteItem(keys[i], folderDb)}>
                  deleteItem
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
