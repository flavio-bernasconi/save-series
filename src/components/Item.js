import React from "react";
import { Draggable } from "react-beautiful-dnd";

export const Item = ({ text, index }) => {
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
          {text}
        </div>
      )}
    </Draggable>
  );
};
