import firebase, { auth } from "../firebase";

export const createTodo = () => {
  const todoRef = firebase.ref(`users/${auth.currentUser?.uid}/todo`);
  const todo = {
    complete: false,
  };

  todoRef.push(todo);
};

const update = (item) => {
  const todoRef = firebase
    .database()
    .ref(`users/${auth.currentUser?.uid}/todo`)
    .child(item.id);
  todoRef.update({
    complete: !item.complete,
  });
};

export const deleteItem = (id, refFolderDb) => {
  const refItem = firebase
    .ref(`users/${auth.currentUser?.uid}/${refFolderDb}`)
    .child(id);
  console.log(id);
  refItem.remove();
};

export const getDataFromList = (folderDb, setterList) => {
  const dbFolderRef = firebase.ref(
    `users/${auth.currentUser?.uid}/${folderDb}`
  );

  dbFolderRef.on("value", (snapshot) => {
    const savedSerie = snapshot.val();
    const list = [];
    for (let id in savedSerie) {
      list.push({ id, ...savedSerie[id] });
    }
    setterList(savedSerie);
  });
};

export const updateItem = (folderDb, key, data) => {
  const itemref = firebase
    .ref(`users/${auth.currentUser?.uid}/${folderDb}`)
    .child(key);
  console.log(key, data);
  itemref.update(data);
};
