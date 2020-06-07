/** @jsx jsx */
// eslint-disable-next-line
import React, { useState } from 'react';
import { jsx, css } from '@emotion/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Chip from '@material-ui/core/Chip';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import AddIcon from '@material-ui/icons/Add';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import theme from '../css/theme';
import { getContributorsList } from '../utils';


const initialCardValues = {
  title: '',
  description: '',
  tags: [
    {
      key: 1, label: 'TODO'
    }
  ],
  assignee: '',
  dueDate: new Date().toISOString().substring(0, 16), // yyyy-mm-ddTHH:mm
};

export default function NewCardForm(props){
  const { addHandler, toggleDialog } = props;

  const [cardError, setCardError] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [content, setContent] = useState({...initialCardValues});

  const handleChange = (property) => (event) => {
    setContent({
      ...content,
      [property]: event.target.value,
    });
  }

  // reset the form
  const handleReset = () => {
    setContent({...initialCardValues});
    setCardError(false);
  }

  const handleAddTag = () => {
    setContent({
      ...content,
      tags: [
        ...content.tags,
        {
          key: new Date().getTime(),
          label: currentTag,
        }
      ]
    });

    setCurrentTag('');
  }

  const handleTagsDelete = (tagToDelete) => {
    const filteredTags = content.tags.filter((tag) => tag !== tagToDelete);

    setContent({
      ...content,
      tags: filteredTags,
    })
  };

  const assigneeComponent = (
    <FormControl>
      <InputLabel shrink id="assignee-select-label-label">
        Assignee
      </InputLabel>
      <Select
        displayEmpty
        labelId="assignee-select-label-label"
        id="assignee-select-label"
        value={content.assignee}
        onChange={handleChange('assignee')}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {getContributorsList().map((contributor) => (
          <MenuItem key={contributor.email} value={contributor.email}>{contributor.name}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const dueDateComponent = (
    <TextField
      id="datetime-local"
      className={'classes.textField'}
      type="datetime-local"
      label="Due Date"
      value={content.dueDate}
      onChange={handleChange('dueDate')}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );

  const dialogActions = (
    <DialogActions
      css={css`
        align-items: flex-end;
      `}
    >
      <Button
        css={css`
          margin: ${theme.margins.small};
        `}
        onClick={() => {

          if (content.title) {
            addHandler({
              id: new Date().getTime(),
              ...content,
            });

            toggleDialog(false);
          }

          setCardError(true);
        }}
      >
        Add
      </Button>
      <Button onClick={handleReset}>
        Reset
      </Button>
    </DialogActions>
  );

  return (
    <form
      noValidate
      autoComplete="off"
      css={css`
        & > * {
          margin: ${theme.margins.normal} 0 0 0;
          width: 100%;
        }
      `}
    >
      <TextField
        error={cardError}
        label="Title"
        value={content.title}
        onChange={handleChange('title')}
        helperText={cardError && "Card cant be empty"}
      />
      <TextField
        multiline
        rows={2}
        label="Description"
        variant="outlined"
        value={content.description}
        onChange={handleChange('description')}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment">Tags</InputLabel>
        <Input
          label="Tags"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          endAdornment={<AddIcon onClick={handleAddTag} />}
        />
      </FormControl>
      <TagsComponent tags={content.tags} {...{handleTagsDelete}} />
      {assigneeComponent}
      {dueDateComponent}
      {dialogActions}
    </form>
  )
}

export const TagsComponent = (props) => {
  const {
    tags,
    handleTagsDelete,
  } = props;

  return (
    <ul
      css={css`
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        list-style: none;
        margin: 0;
        padding: 0;
      `}
    >
      {
      tags
      .filter(tag => tag.key)
      .map((tag) => (
        <li key={tag.key}>
          <Chip
            size='small'
            label={tag.label}
            onDelete={handleTagsDelete ? () => handleTagsDelete(tag) : undefined}
            color={tag.color ? tag.color : undefined}
          />
        </li>
      ))}
    </ul>
  )
};
