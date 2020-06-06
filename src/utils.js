/**
 *
 * @param {string} columnName - column name where belongs the card
 * @param {Number} cardID - id of the card
 * @returns undefined
 */
export function deleteFromLocalStore(columnName, cardID) {
  let collection = JSON.parse(localStorage.getItem(columnName));

  const success = delete collection[cardID]; // 🔪

  if (success) {
    localStorage.setItem(columnName, JSON.stringify(collection));
  }

  return success;
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
