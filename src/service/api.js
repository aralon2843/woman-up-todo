import { doc, collection, addDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const route = 'todos';

export const uploadFiles = (files) => {
  try {
    const storage = getStorage();
    return new Promise((res, rej) => {
      if (!files) rej(new Error('No files'));
      const filesURL = [];
      files.forEach(async (file) => {
        const storageRef = ref(storage, file.name);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        filesURL.push({ name: file.name, url: downloadURL });
        if (filesURL.length === files.length) res(filesURL);
      });
    });
  } catch (e) {
    console.error(e);
  }
};

export const getTodos = async () => {
  try {
    const data = await getDocs(collection(db, 'todos'));
    const todos = [];
    data.forEach((document) =>
      todos.push({
        id: document.id,
        ...document.data(),
      })
    );
    return todos;
  } catch (e) {
    console.error(e);
  }
};

export const addTodo = async (item) => {
  try {
    return await addDoc(collection(db, route), item);
  } catch (e) {
    console.error(e);
  }
};

export const updateTodo = async (id, newFields) => {
  try {
    return await updateDoc(doc(db, route, id), newFields);
  } catch (e) {
    console.error(e);
  }
};

export const deleteTodo = async (id) => {
  try {
    await deleteDoc(doc(db, route, id));
  } catch (e) {
    console.error(e);
  }
};
