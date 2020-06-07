/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import BoardColumn from './components/BoardColumn';
import Dialog from './components/Dialog';

import { COLUMNS_KEY_NAMES } from './configs';
import { deleteFromLocalStore, saveInLocalStorage } from './utils';

export default function BoardContainer(props){
  const [todoItems, addTodo] = useState({});
  const [inprogressItems, addInprogress] = useState({});
  const [doneItems, addDone] = useState({});

  const [showDialog, toggleDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    action: 'delete',
    column: '',
    cardInfo: '',
    handler: () => {},
  });

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

  const handleAddCard = (column, addHandler) => {
    setDialogData({
      action: 'add',
      column,
      addHandler,
    });
    toggleDialog(true);
  }

  const handleCardDelete = ({ column, cardInfo }) => {
    setDialogData({
      action: 'delete',
      column,
      cardInfo
    });
    toggleDialog(true);
  };

  const handleDeleteFromLocalStorage = (column, cardId) => {
    if ( deleteFromLocalStore(column, cardId)) {
      // refresh the board
      getFromLocalStore(column);
    }

    toggleDialog(false);
  }

  const getFromLocalStore = (columnName = 'all') => {
    addTodo(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.TODO) || '{}'));
    addInprogress(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.INPROGRESS)  || '{}'));
    addDone(JSON.parse(localStorage.getItem(COLUMNS_KEY_NAMES.DONE) || '{}'));
  }

  const colNames = [
    {
      title: 'To Do',
      cards: todoItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.TODO, item, addHandler: addTodo }),
      handleDelete: (cardInfo) => handleCardDelete({ column: COLUMNS_KEY_NAMES.TODO, cardInfo })
    },
    {
      title: 'In Progress',
      cards: inprogressItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.INPROGRESS, item, addHandler: addInprogress }),
      handleDelete: (cardInfo) => handleCardDelete({ column: COLUMNS_KEY_NAMES.INPROGRESS, cardInfo })
    },
    {
      title: 'Done',
      cards: doneItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.DONE, item, addHandler: addDone }),
      handleDelete: (cardInfo) => handleCardDelete({ column: COLUMNS_KEY_NAMES.DONE, cardInfo })
    }
  ];

  const BoardColumns = () => colNames.map(
    (colInfo, index) => (
      <BoardColumn
        key={colInfo.title + index}
        {...colInfo}
      >
        <div>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            endIcon={<AddIcon />}
            onClick={() => handleAddCard(colInfo.title, colInfo.handler)}
          >
            Add
        </Button>

        </div>
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
      <Dialog {...{
        showDialog,
        toggleDialog,
        dialogData,
        handleDeleteFromLocalStorage
      }} />
    </div>
  )
}
