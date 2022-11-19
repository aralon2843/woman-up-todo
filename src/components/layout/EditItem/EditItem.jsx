import { useEffect, useState } from 'react';
import ItemForm from '../../shared/form/ItemForm';
import isStringEmpty from '../../../utils/checkEmptyString';
import { updateTodo, uploadFiles } from '../../../service/api';

const EditItem = ({ item, closeModal, updateItem, setLoading }) => {
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newDateEnd, setNewDateEnd] = useState(item.dateEnd);
  const [newFiles, setNewFiles] = useState(item.filesURL);
  const [editItemError, setEditItemError] = useState(false);

  const onChangeInputHandler = (event) => {
    const value = event.target.value;
    setNewTitle(value);
  };

  const onChangeAreaHandler = (event) => {
    const value = event.target.value;
    setNewDescription(value);
  };

  const onChangeDateHandler = (event) => {
    const value = event.target.value;
    setNewDateEnd(value);
  };

  const onChangeFilesHandler = (event) => {
    const files = event.target.files;
    setNewFiles((items) => [...items, ...files]);
  };

  const onButtonClickHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const newItem = {
      title: newTitle,
      description: newDescription,
      dateEnd: newDateEnd,
      filesURL: newFiles,
      isCompleted: item.isCompleted,
    };

    const filesList = [];
    const filesURL = [];

    newFiles.forEach((file) => {
      if (file instanceof File) filesList.push(file);
      else filesURL.push(file);
    });

    if (filesList.length > 0) {
      const urlsFromUploads = await uploadFiles(filesList);
      newItem.filesURL = filesURL.concat(urlsFromUploads);
    }

    await updateTodo(item.id, newItem);
    updateItem(item.id, newItem);

    setEditItemError(false);
    closeModal();
    setLoading(false);
  };

  useEffect(() => {
    if (isStringEmpty(newTitle) || isStringEmpty(newDescription) || isStringEmpty(newDateEnd)) {
      setEditItemError(true);
    } else {
      setEditItemError(false);
    }
  }, [newTitle, newDescription, newDateEnd]);

  return (
    <section className='edit_item'>
      <header className='edit_item-header'>Редактировать задачу</header>
      <ItemForm
        title={newTitle}
        description={newDescription}
        dateEnd={newDateEnd}
        files={newFiles}
        setFiles={setNewFiles}
        onChangeInputHandler={onChangeInputHandler}
        onChangeAreaHandler={onChangeAreaHandler}
        onChangeDateHandler={onChangeDateHandler}
        onChangeFilesHandler={onChangeFilesHandler}
        error={editItemError}
      />
      <button className='item-submit' onClick={onButtonClickHandler} disabled={editItemError}>
        Готово
      </button>
    </section>
  );
};

export default EditItem;
