import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Item = ({ text, index, info }) => {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          className="item"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {index}
          {info.title}
          <img
            src={`https://image.tmdb.org/t/p/w500${info.image}`}
            alt="movie "
          />
        </div>
      )}
    </Draggable>
  );
};
