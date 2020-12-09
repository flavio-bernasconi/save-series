import React, { Component, useEffect, useState } from "react";
import ListMovies from "../components/ListMovies";
import { SliderMovies } from "../components/SliderMovies";
import { inject, observer } from "mobx-react";
import { motion } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useList } from "react-firebase-hooks/database";
import { getAllFrom } from "../services/TutorialService";
import { Drag } from "./Drag";

export const Dashboard = inject("rootStore")(
  observer(function Dashboard({ rootStore }) {
    console.log("dash");

    return (
      <motion.div
        className="wrapper"
        initial="exit"
        animate="enter"
        exit="exit"
      >
        <Drag />
        <ListMovies folderDb="toWatch" />
        <ListMovies folderDb="watching" />
      </motion.div>
    );
  })
);
