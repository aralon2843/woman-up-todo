import { useEffect, useState } from 'react';
import EditItem from './components/layout/EditItem/EditItem';
import List from './components/layout/List/List';
import NewItem from './components/layout/NewItem/NewItem';
import Modal from './components/shared/modal/Modal';
import ViewItem from './components/layout/ViewItem/ViewItem';
import { getTodos } from './service/api';
import './styles/appStyles.css';

function App() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const [isEditMode, setEditMode] = useState(false);
  const [editableItem, setEditableItem] = useState(null);

  const [isViewMode, setViewMode] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  const [isNewTodoMode, setNewTodoMode] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const addItem = (item) => {
    setItems((items) => [...items, item]);
  };

  const removeItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  };

  const updateItem = (id, newItem) => {
    setItems((items) => items.map((item) => (item.id === id ? { id, ...newItem } : item)));
  };

  const toggleStatusItem = (id) => {
    setItems((items) =>
      items.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item))
    );
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditMode(false);
    setNewTodoMode(false);
    setViewMode(false);
  };

  const onNewClickHandler = () => {
    setNewTodoMode(true);
    openModal();
  };

  const onItemClick = (item) => {
    setViewItem(item);
    setViewMode(true);
    openModal();
  };

  const onEditItemClick = (item) => {
    setEditableItem(item);
    setEditMode(true);
    openModal();
  };

  useEffect(() => {
    setLoading(true);
    const fetchTodos = async () => {
      const todos = await getTodos();
      setItems(todos);
      setLoading(false);
    };

    fetchTodos();
  }, []);

  return (
    <div className='wrapper'>
      {isLoading && <div className='loader'>Загрузка...</div>}
      <main className='todo'>
        <div className='todo_inner'>
          <header className='todo_header'>
            <div className='todo_header_inner '>
              <h1 className='todo_title'>Задачи</h1>
              <button className='todo_new' onClick={onNewClickHandler}>
                Создать
              </button>
            </div>
          </header>
          <List
            items={items}
            removeItem={removeItem}
            toggleStatusItem={toggleStatusItem}
            onEditItemClick={onEditItemClick}
            onItemClick={onItemClick}
            setLoading={setLoading}
          />
        </div>
      </main>
      {isModalOpen && (
        <Modal closeModal={closeModal}>
          {isNewTodoMode && (
            <NewItem addItem={addItem} closeModal={closeModal} setLoading={setLoading} />
          )}
          {isEditMode && (
            <EditItem
              item={editableItem}
              closeModal={closeModal}
              updateItem={updateItem}
              setLoading={setLoading}
            />
          )}
          {isViewMode && <ViewItem item={viewItem} />}
        </Modal>
      )}
    </div>
  );
}

export default App;
