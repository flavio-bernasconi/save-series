import React from "react";
import { Item } from "./Item";
import { Droppable } from "react-beautiful-dnd";

export const Column = ({ list, id }) => {
  console.log(list);
  return (
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="column">
          <h2>{id}</h2>
          <div
            className="list"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((info, index) => {
              return (
                <Item
                  key={info.val().id}
                  text={info.val().title}
                  index={index}
                  // key={info.id}
                  // text={info.title}
                />
              );
            })}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
};
