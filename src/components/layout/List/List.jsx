import ListItem from '../ListItem/ListItem';

const List = ({
  items,
  removeItem,
  toggleStatusItem,
  onEditItemClick,
  onItemClick,
  setLoading,
}) => {
  return (
    <ul className='todo_list'>
      {items.length > 0 ? (
        items.map(({ id, title, description, dateEnd, filesURL, isCompleted }) => (
          <ListItem
            id={id}
            title={title}
            description={description}
            dateEnd={dateEnd}
            filesURL={filesURL}
            isCompleted={isCompleted}
            removeItem={removeItem}
            toggleStatusItem={toggleStatusItem}
            onEditItemClick={onEditItemClick}
            onItemClick={onItemClick}
            setLoading={setLoading}
            key={id}
          />
        ))
      ) : (
        <h3 className='todo_list-empty'>Список пуст</h3>
      )}
    </ul>
  );
};

export default List;
