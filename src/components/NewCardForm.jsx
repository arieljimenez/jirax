/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { jsx, css } from '@emotion/core';

import theme from '../css/theme'

export default function NewCardForm(props){
  const { handleAdd } = props;

  const [content, setContent] = useState('');
  const [cardError, setCardError] = useState(false);

  const handleChange = (event) => {
    // validate/sanitize
    setContent(event.target.value);
  }

  // reset the form
  const handleReset = () => {
    setContent('');
    setCardError(false);
  }

  return(
    <form
      noValidate
      autoComplete="off"
      css={css`
        & > * {
          margin: ${theme.margins.normal};
          width: ${theme.cardWidth};
        }
      `}
    >
      <TextField
        error={cardError}
        multiline
        rows={2}
        label="Content"
        variant="outlined"
        value={content}
        onChange={handleChange}
        helperText={cardError && "Card cant be empty"}
      />
      <div
        css={css`
          align-items: center;
          display: flex;
          flex-direction: column;
          & > * {
            margin: ${theme.margins.normal};
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
                content,
                id: new Date().getTime()
              })
            }
            css={css`
              margin: ${theme.margins.small};
            `}
          >
            Add
          </Button>
          <Button onClick={handleReset}>Cancel</Button>
        </ButtonGroup>
      </div>
    </form>
  )
}
