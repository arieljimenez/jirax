/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';

import BoardColumn from './components/BoardColumn';
import NewCardForm from './components/NewCardForm';

import { COLUMNS_KEY_NAMES } from './configs';

import { deleteFromLocalStore, saveInLocalStorage } from './utils';

export default function BoardContainer(props){
  const [todoItems, addTodo] = useState({ content: 'neka default', id: 1});
  const [inprogressItems, addInprogress] = useState({});
  const [doneItems, addDone] = useState({});

  // cdm
  useEffect(() => {
    getFromLocalStore();
  }, []);

  const addToCollection = (props) => {
    saveInLocalStorage(props);

    props.addHandler(
      items => ({
        ...items,
        [props.item.id]: {
          ...props.item
        }
      })
    );
  };

  const getFromLocalStore = (columnName = 'all') => {
    switch (columnName) {
      case COLUMNS_KEY_NAMES.TODO:
        addTodo(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.TODO) || '{}'));
        break;
      case COLUMNS_KEY_NAMES.INPROGRESS:
        addInprogress(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.INPROGRESS) || '{}'));
        break;
      case COLUMNS_KEY_NAMES.DONE:
        addDone(localStorage.getItem(COLUMNS_KEY_NAMES.DONE) || '{}');
        break;
      default:
        addTodo(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.TODO) || '{}'));
        addInprogress(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.INPROGRESS)  || '{}'));
        addDone(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.DONE) || '{}'));
        break;
    }
  }



  const colNames = [
    {
      title: 'To Do',
      cards: todoItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.TODO, item, addHandler: addTodo }),
      handleDelete: (cardID) => deleteFromLocalStore({ column: COLUMNS_KEY_NAMES.TODO, cardID })
    },
    {
      title: 'In Progress',
      cards: inprogressItems,
      handler: (item) => addInprogress(inprogressItems => [...inprogressItems, item]),
      handleDelete: (cardID) => deleteFromLocalStore({ column: COLUMNS_KEY_NAMES.INPROGRESS, cardID })
    },
    {
      title: 'Done',
      cards: doneItems,
      handler: (item) => addDone(doneItems => [...doneItems, item]),
      handleDelete: (cardID) => deleteFromLocalStore({ column: COLUMNS_KEY_NAMES.DONE, cardID })
    }
  ];

  const BoardColumns = () => colNames.map(
    (colInfo, index) => (
      <BoardColumn
        key={colInfo.title + index}
        {...colInfo}
      >
        <NewCardForm  handleAdd={colInfo.handler} />
      </BoardColumn>
    )
  );

  return(
    <div
      className="board-container"
      css={css`
        display: flex;
        height: 100%
      `}
    >
      <BoardColumns />
    </div>
  )
}
