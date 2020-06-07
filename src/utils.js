/**
 *
 * @param {string} columnName - column name where belongs the card
 * @param {Number} cardID - id of the card
 * @returns undefined
 */
export function deleteFromLocalStore(columnName, cardID) {
  let collection = JSON.parse(localStorage.getItem(columnName));

  collection = collection.filter(card => card.id !== cardID)

  // const success = delete collection[cardID]; // 🔪

  localStorage.setItem(columnName, JSON.stringify(collection));

  return true;
};

export function saveInLocalStorage({ column, item }) {
  let collection = JSON.parse(localStorage.getItem(column) || '[]');

  // filter old item
  collection = collection.filter(card => card.id !== item.id);

  collection = [
    ...collection,
    item,
  ];

  localStorage.setItem(column, JSON.stringify(collection)); // 💾
}

export function getContributorsList() {
  const defaultContributors = [
    {
      email: 'a@j',
      name: 'Ariel Jiménez',
    },
    {
      email:'m@j',
      name:'Mario "El Primo" Jiménez',
    },
    {
      email: 'j@b',
      name:'Jesus "El Chapi" Bibieca',
    },
  ];

  return defaultContributors;
}
