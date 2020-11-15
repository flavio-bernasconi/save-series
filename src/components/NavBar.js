import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { removeAllFrom } from "../services/TutorialService";
import { DB_FOLDERS } from "../utils/const";

export function NavBar(props) {
  return (
    <div className="navbar">
      <Link to="/">home</Link>
      <button
        onClick={() =>
          auth.signOut().then((res) => {
            console.log("logout");
          })
        }
      >
        logout
      </button>
      <button
        onClick={() => removeAllFrom(DB_FOLDERS.map((folder) => folder.name))}
      >
        remove all
      </button>
      {/* <h1>hello {auth.currentUser?.email}</h1> */}
    </div>
  );
}
