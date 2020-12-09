import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "../components/Column";
import { useList } from "react-firebase-hooks/database";
import { getAllFrom } from "../services/TutorialService";
import TutorialDataService from "../services/TutorialService";
import { deleteItem, getDataFromList, updateItem } from "../services/CRUD";

export function Drag() {
  const [toWatch] = useList(getAllFrom("toWatch"));
  const [watching] = useList(getAllFrom("watching"));
  const [watched] = useList(getAllFrom("watched"));

  const [columns, setColumns] = useState({});

  useEffect(() => {
    setColumns({
      toWatch: {
        id: "toWatch",
        list: toWatch,
      },
      watching: {
        id: "watching",
        list: watching,
      },
      watched: {
        id: "watched",
        list: watched,
      },
    });
  }, [watching, toWatch, watched]);

  const onDragEnd = ({ source, destination }) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
      };

      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      console.log(start.list[source.index]);
      const keyItemMoving = start.list[source.index].key;
      deleteItem(keyItemMoving, source.droppableId);
      TutorialDataService.addDataTo(
        destination.droppableId,
        start.list[source.index].val()
      );

      return null;
    }
  };

  return (
    watching &&
    watched &&
    toWatch && (
      <>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="columns-container">
            {Object.values(columns).map((col) => {
              return <Column key={col.id} list={col.list} id={col.id} />;
            })}
          </div>
        </DragDropContext>
      </>
    )
  );
}
