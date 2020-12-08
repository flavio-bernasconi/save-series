import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Column } from "../components/Column";
import { useList } from "react-firebase-hooks/database";
import { getAllFrom } from "../services/TutorialService";
import TutorialDataService from "../services/TutorialService";
import firebase, { auth } from "../firebase";
import { deleteItem, getDataFromList } from "../services/CRUD";
import { removeDuplicates } from "../utils/Helpers";

export function Drag() {
  const [toWatch, loading, error] = useList(getAllFrom("toWatch"));
  const [watching] = useList(getAllFrom("watching"));
  const [watched] = useList(getAllFrom("watched"));

  const [columns, setColumns] = useState({});
  // const [toWatchList, setToWatchList] = useState({});
  // const [watchingList, setWatchingList] = useState({});

  // useEffect(() => {
  //   getDataFromList("toWatch", setToWatchList);
  //   getDataFromList("watching", setWatchingList);
  // }, []);

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

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
      };

      console.log(start.list[source.index]);
      const keyItemMoving = start.list[source.index].key;
      deleteItem(keyItemMoving, source.droppableId);
      TutorialDataService.addDataTo(
        destination.droppableId,
        start.list[source.index].val()
      );

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  console.log(Object.values(columns).list);

  return (
    watching &&
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
