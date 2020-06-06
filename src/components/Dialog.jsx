import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function JiraxDialog(props) {
  const {
    dialogData: { column, cardInfo },
    showDialog,
    toggleDialog,
    handleDeleteFromLocalStorage,
  } = props;

  const handleClose = () => {
    toggleDialog(false);
  };

  return (
    <div>
      <Dialog
        open={showDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete this Card?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this card?
          </DialogContentText>
        </DialogContent>
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
      </Dialog>
    </div>
  );
}