import firebase, { auth } from "../firebase";

const db = firebase.ref("/users");

export const getAllFrom = (refFolderDb) => {
  return db.child(`${auth.currentUser?.uid}/${refFolderDb}`);
};

const addDataTo = (refFolderDb, data) => {
  console.log("adding", refFolderDb, data);
  return db
    .child(`${auth.currentUser?.uid}/${refFolderDb}`)
    .push(data)
    .then((res) => {
      console.log("added success", res);
    });
};

const update = (refFolderDb, key, data) => {
  return db
    .child(`${auth.currentUser?.uid}/${refFolderDb}/${key}`)
    .update(data);
};

const remove = (refFolderDb, key) => {
  console.log("removing", refFolderDb, key);

  // firebase.firestore().collection("users");
  // console.log(firebase.firestore().collection("users"));
  // console.log(db.child(`${auth.currentUser?.uid}/${refFolderDb}/${key}`));

  return db.child(`${auth.currentUser?.uid}/${refFolderDb}/${key}`).remove();
};

export const removeAllFrom = (destinations) => {
  destinations.forEach((destination) =>
    db.child(`${auth.currentUser?.uid}/${destination}`).remove()
  );
};

export default {
  addDataTo,
  update,
  remove,
};
