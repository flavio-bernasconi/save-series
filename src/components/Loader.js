import React from "react";
import { motion } from "framer-motion";

const loaderVariants = {
  animate: {
    x: [-60, 60],
    width: [10, 50],
    transition: {
      x: {
        yoyo: Infinity,
        duration: 0.7,
        delay: 0.5,
      },
      width: {
        yoyo: Infinity,
        duration: 0.5,
        delay: 0.7,
      },
    },
  },
};

export const Loader = () => {
  return (
    <motion.div className="loader" initial="initial" animate="animate">
      <motion.div
        className="loader-dot"
        variants={loaderVariants}
        animate="animate"
      ></motion.div>
    </motion.div>
  );
};
