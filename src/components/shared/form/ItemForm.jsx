const ItemForm = ({
  title,
  description,
  dateEnd,
  files,
  setFiles,
  onChangeInputHandler,
  onChangeAreaHandler,
  onChangeDateHandler,
  onChangeFilesHandler,
  error,
  readOnly,
}) => {
  const onDeleteFileClickHandler = (fileName) => {
    setFiles([...files].filter((file) => file.name !== fileName));
  };

  return (
    <form>
      <label htmlFor='title'>Заголовок: </label>
      <input
        className='item_title-input'
        type='text'
        name='title'
        onChange={onChangeInputHandler}
        value={title}
        readOnly={readOnly}
      />

      <label htmlFor='description'>Описание:</label>
      <textarea
        className='item_description-area'
        type='text'
        name='description'
        onChange={onChangeAreaHandler}
        value={description}
        readOnly={readOnly}
      />

      <label htmlFor='dateEnd'>
        {readOnly ? 'Дата окончания задачи:' : 'Выберите дату окончания задачи:'}
      </label>
      <input
        className='item_date-input'
        type={'datetime-local'}
        value={dateEnd}
        onChange={onChangeDateHandler}
        readOnly={readOnly}
      />

      {files.length > 0 && (
        <>
          <span className='item_files-title'>Загруженные файлы:</span>
          <ul className='item_files'>
            {[...files].map((file) => (
              <li className='item_file' key={file.name}>
                <a
                  className='item_file-link'
                  href={file.url || URL.createObjectURL(file)}
                  target='_blank'
                  rel='noreferrer'
                >
                  {file.name}
                </a>
                {!readOnly && (
                  <span
                    className='item_file-delete'
                    onClick={() => onDeleteFileClickHandler(file.name)}
                  >
                    удалить
                  </span>
                )}
              </li>
            ))}
          </ul>
        </>
      )}
      {!readOnly ? (
        <>
          <label htmlFor='file'>
            {`Вы можете загрузить ${files.length > 0 ? 'дополнительные' : ''} файлы`}:
          </label>
          <input type={'file'} name='file' onChange={onChangeFilesHandler} />
        </>
      ) : null}

      {error && <span className='item-error'>Заполните необходимые поля</span>}
    </form>
  );
};

export default ItemForm;
