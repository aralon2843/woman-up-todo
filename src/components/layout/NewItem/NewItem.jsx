import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ItemForm from '../../shared/form/ItemForm';
import isStringEmpty from '../../../utils/checkEmptyString';
import { addTodo, uploadFiles } from '../../../service/api';

const NewItem = ({ addItem, closeModal, setLoading }) => {
  const now = dayjs().format('YYYY-MM-DDTHH:mm');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [files, setFiles] = useState([]);
  const [newItemError, setNewItemError] = useState(false);
  const [isFormValid, setFormValid] = useState(false);

  const onChangeInputHandler = (event) => {
    const value = event.target.value;
    if (isStringEmpty(value)) {
      setNewItemError(true);
    }

    setTitle(value);
  };

  const onChangeAreaHandler = (event) => {
    const value = event.target.value;
    if (isStringEmpty(value)) {
      setNewItemError(true);
    }

    setDescription(value);
  };

  const onChangeDateHandler = (event) => {
    const value = event.target.value;
    if (isStringEmpty(value)) {
      setNewItemError(true);
    }

    setDateEnd(value);
  };

  const onChangeFilesHandler = (event) => {
    const files = event.target.files;
    setFiles((items) => [...items, ...files]);
  };

  const onButtonClickHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    const item = {
      title,
      description,
      dateEnd,
      filesURL: files,
      isCompleted: false,
    };

    if (files.length > 0) {
      const filesURL = await uploadFiles(files);
      item.filesURL = filesURL;
    }
    const { id } = await addTodo(item);
    addItem({ ...item, id });

    setNewItemError(false);
    closeModal();
    setLoading(false);
  };

  useEffect(() => {
    if (isStringEmpty(title) || isStringEmpty(description) || isStringEmpty(dateEnd)) {
      setFormValid(false);
    } else {
      setFormValid(true);
      setNewItemError(false);
    }
  }, [title, description, dateEnd]);

  return (
    <section className='new_item'>
      <header className='new_item-header'>Новая задача</header>
      <ItemForm
        title={title}
        description={description}
        dateEnd={dateEnd || now}
        files={files}
        setFiles={setFiles}
        onChangeInputHandler={onChangeInputHandler}
        onChangeAreaHandler={onChangeAreaHandler}
        onChangeDateHandler={onChangeDateHandler}
        onChangeFilesHandler={onChangeFilesHandler}
        error={newItemError}
      />
      <button className='item-submit' onClick={onButtonClickHandler} disabled={!isFormValid}>
        Создать
      </button>
    </section>
  );
};

export default NewItem;
