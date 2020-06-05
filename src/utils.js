
export function deleteFromLocalStore (props) {
  const { column, item } = props;
  let collection = localStorage.getItem(column);

  delete collection[item.id]; // 🔪

  localStorage.setItem(column, collection);
};

export function saveInLocalStorage({ column, item }) {
  let collection = JSON.parse(localStorage.getItem(column) || '{}');

  collection = {
    ...collection,
    [item.id]: {
      ...item
    }
  };

  localStorage.setItem(column, JSON.stringify(collection)); // 💾
}
