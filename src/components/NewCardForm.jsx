/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { jsx, css } from '@emotion/core';

import theme from '../css/theme'

export default function NewCardForm(props){
  const {
    columnName,
    handleAdd,
  } = props;

  const [title, setTitle] = useState('');
  const [cardError, setCardError] = useState(false);

  const handleChange = (event) => {
    // validate/sanitize
    setTitle(event.target.value);
  }

  // reset the form
  const handleCancel = () => {
    setTitle('');
    setCardError(false);
  }

  return(
    <form
      noValidate
      autoComplete="off"
      css={css`
        & > * {
          margin: ${theme.margin};
          width: 95%;
        }
      `}
    >
      <TextField
        error={cardError}
        multiline
        rows={2}
        label="Title"
        variant="outlined"
        value={title}
        onChange={handleChange}
        helperText={cardError && "Card cant be empty"}
      />
      <div
        css={css`
          display: flex;
          flex-direction: column;
          align-items: center;
          & > * {
            margin: ${theme.margin};
          }
        `}
      >
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="outlined primary button group"
          css={css`
            justify-content: flex-end;
            width: 100%;
          `}
          >
          <Button
            onClick={() => handleAdd({
              title,
              columnName
            })}
          >
            Add
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </ButtonGroup>
      </div>
    </form>
  )
}
