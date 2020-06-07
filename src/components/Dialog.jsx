import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import NewCardForm from './NewCardForm';


export default function JiraxDialog(props) {
  const {
    dialogData: { action, column, cardInfo, addHandler },
    handleDeleteFromLocalStorage,
    showDialog,
    toggleDialog,
  } = props;

  const handleClose = () => {
    toggleDialog(false);
  };

  const dialogTitlesByActions = {
    delete: 'Delete this Card?',
    add: `Adding a card to ${column}`
  };

  const dialogContent = {
    delete: () => (
      <>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this card?
        </DialogContentText>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button
            autoFocus
            color="primary"
            onClick={() => handleDeleteFromLocalStorage(column, cardInfo.id)}
          >
            Yes
          </Button>
        </DialogActions>
      </>
    ),
    add: () => <NewCardForm {...{ addHandler, toggleDialog }} />,
  };

  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {dialogTitlesByActions[action]}
        </DialogTitle>
        <DialogContent>
          {dialogContent[action]()}
        </DialogContent>
      </Dialog>
    </div>
  );
}