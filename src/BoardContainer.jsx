/** @jsx jsx */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { jsx, css } from '@emotion/core';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import BoardColumn from './components/BoardColumn';
import Dialog from './components/Dialog';

import { COLUMNS_KEY_NAMES } from './configs';
import { deleteFromLocalStore, saveInLocalStorage, getAllCollectionsFromLocalStore } from './utils';

export default function BoardContainer(props){
  let {
    todoItems,
    addTodo,
    inprogressItems,
    addInprogress,
    doneItems,
    addDone,
  } = props;

  const [showDialog, toggleDialog] = useState(false);
  const [dialogData, setDialogData] = useState({
    action: 'delete',
    column: '',
    cardInfo: '',
    handler: () => {},
  });

  // cdm
  useEffect(() => {
    setFromLocalStore();
  }, []);

  const addToCollection = (props) => {
    saveInLocalStorage(props);

    props.addHandler(items => ([...items, props.item ]));
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

  const handleCardEdit = ({ column, cardInfo, addHandler }) => {
    setDialogData({
      action: 'edit',
      column,
      cardInfo,
      addHandler,
    });

    toggleDialog(true);
  }

  const handleDeleteFromLocalStorage = (column, cardId) => {
    if ( deleteFromLocalStore(column, cardId)) {
      // refresh the board
      setFromLocalStore(column);
    }

    toggleDialog(false);
  }

  const setFromLocalStore = () => {
    const {
      todoItems,
      inprogressItems,
      doneItems
    } = getAllCollectionsFromLocalStore();

    addTodo(todoItems);
    addInprogress(inprogressItems);
    addDone(doneItems);
  }

  const handleMoveCard = ({ from, to, cardInfo, addHandler}) => {
    handleDeleteFromLocalStorage(from, cardInfo.id);

    addToCollection({ column: to, item: cardInfo, addHandler})
    setFromLocalStore();
  }

  const colNames = [
    {
      keyColumnName: COLUMNS_KEY_NAMES.TODO,
      title: 'To Do',
      cards: todoItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.TODO, item, addHandler: addTodo }),
      handleDelete: (cardInfo) => handleCardDelete({ column: COLUMNS_KEY_NAMES.TODO, cardInfo }),
      handleEdit: (cardInfo) => handleCardEdit({ column: COLUMNS_KEY_NAMES.TODO, cardInfo, addHandler: addTodo }),
      handleMove: (cardInfo, column) => handleMoveCard({ from: COLUMNS_KEY_NAMES.TODO, to: column, cardInfo, addHandler: addTodo }),
    },
    {
      keyColumnName: COLUMNS_KEY_NAMES.INPROGRESS,
      title: 'In Progress',
      cards: inprogressItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.INPROGRESS, item, addHandler: addInprogress }),
      handleDelete: (cardInfo) => handleCardDelete({ column: COLUMNS_KEY_NAMES.INPROGRESS, cardInfo }),
      handleEdit: (cardInfo) => handleCardEdit({ column: COLUMNS_KEY_NAMES.INPROGRESS, cardInfo, addHandler: addInprogress }),
      handleMove: (cardInfo, column) => handleMoveCard({ from: COLUMNS_KEY_NAMES.INPROGRESS, to: column, cardInfo, addHandler: addInprogress }),
    },
    {
      keyColumnName: COLUMNS_KEY_NAMES.DONE,
      title: 'Done',
      cards: doneItems,
      handler: (item) => addToCollection({ column: COLUMNS_KEY_NAMES.DONE, item, addHandler: addDone }),
      handleDelete: (cardInfo) => handleCardDelete({ column: COLUMNS_KEY_NAMES.DONE, cardInfo }),
      handleEdit: (cardInfo) => handleCardEdit({ column: COLUMNS_KEY_NAMES.DONE, cardInfo, addHandler: addDone }),
      handleMove: (cardInfo, column) => handleMoveCard({ from: COLUMNS_KEY_NAMES.DONE, to: column, cardInfo, addHandler: addDone }),
    }
  ];

  const BoardColumns = () => colNames.map(
    (colInfo, index) => (
      <div
        css={css`
          text-align: center;
          width: 100%;

          > div {
            height: 100%;
          }
        `}
      >
        <BoardColumn
          key={colInfo.title + index}
          {...colInfo}
        >
          <Button
            variant="outlined"
            color="primary"
            size="small"
            endIcon={<AddIcon />}
            onClick={() => handleAddCard(colInfo.title, colInfo.handler)}
          >
            Add
          </Button>
        </BoardColumn>
      </div>
    )
  );

  return (
    <div
      className="board-container"
      css={css`
        display: flex;
        height: 100%
      `}
    >
      <DndProvider backend={HTML5Backend}>
        <BoardColumns />
      </DndProvider>
      <Dialog {...{
        showDialog,
        toggleDialog,
        dialogData,
        handleDeleteFromLocalStorage
      }} />
    </div>
  )
};
