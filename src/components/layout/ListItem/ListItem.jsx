import dayjs from 'dayjs';
import local from 'dayjs/locale/ru';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import cutString from '../../../utils/cutString';
import { deleteTodo, updateTodo } from '../../../service/api';

const ListItem = ({
  id,
  title,
  description,
  dateEnd,
  filesURL,
  isCompleted,
  removeItem,
  toggleStatusItem,
  onEditItemClick,
  onItemClick,
  setLoading,
}) => {
  const now = dayjs().format('YYYY-MM-DDTHH:mm');
  dayjs.extend(isSameOrBefore);
  const isExpired = !isCompleted && dayjs(dateEnd).isSameOrBefore(now);
  const dateEndFormatted = dayjs(dateEnd).locale(local.name).format('DD MMMM HH:mm');

  const onDeleteClickHandler = async (event) => {
    event.stopPropagation();
    setLoading(true);

    await deleteTodo(id);
    removeItem(id);

    setLoading(false);
  };

  const onCheckHandler = async () => {
    setLoading(true);

    await updateTodo(id, {
      isCompleted: !isCompleted,
    });
    toggleStatusItem(id);

    setLoading(false);
  };

  const onEditItemClickHandler = (event) => {
    event.stopPropagation();

    onEditItemClick({
      id,
      title,
      description,
      dateEnd,
      filesURL,
      isCompleted,
    });
  };

  const onItemClickHandler = () => {
    onItemClick({
      id,
      title,
      description,
      dateEnd,
      filesURL,
      isCompleted,
    });
  };

  return (
    <li className={`list_item ${isCompleted ? 'completed' : ''}`} onClick={onItemClickHandler}>
      <input
        className='list_item-checkbox'
        type={'checkbox'}
        checked={isCompleted}
        value={isCompleted}
        onChange={onCheckHandler}
        onClick={(e) => e.stopPropagation()}
      />
      <div>
        <h2 className='list_item-title'>{title}</h2>
        <span className='list_item-description'>{cutString(description, 50)}</span>
      </div>
      <span className={`list_item-date ${isExpired ? 'expired' : ''}`}>до {dateEndFormatted}</span>
      <header className='list_item-header'>
        {filesURL.length > 0 && <span>{filesURL.length} 📂</span>}
        <span onClick={onEditItemClickHandler}>ред.</span>
        <span onClick={onDeleteClickHandler}>х</span>
      </header>
    </li>
  );
};

export default ListItem;
