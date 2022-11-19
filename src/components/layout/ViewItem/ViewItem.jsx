import ItemForm from '../../shared/form/ItemForm';

const ViewItem = ({ item }) => {
  return (
    <section className='view_item'>
      <header className='view_item-header'>Просмотр задачи</header>
      <ItemForm
        title={item.title}
        description={item.description}
        dateEnd={item.dateEnd}
        files={item.filesURL}
        readOnly
      />
    </section>
  );
};

export default ViewItem;
