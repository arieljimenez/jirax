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
import FormHelperText from '@material-ui/core/FormHelperText';

import theme from '../css/theme';
import { getContributorsList } from '../utils';

export default function NewCardForm(props){
  const { addHandler } = props;

  const [cardError, setCardError] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [tagsData, setTagsData] = useState([
    {
      key: 1, label: 'neka'
    }
  ]);

  const [content, setContent] = useState({
    title: '',
    description: '',
    tags: [],
    assignee: '',
    dueDate: new Date(),
  });

  const handleChange = (property) => (event) => {
    setContent((content) => ({
      ...content,
      [property]: event.target.value,
    }));
  }

  // reset the form
  const handleReset = () => {
    setContent('');
    setCardError(false);
  }

  const handleAddTag = () => {
    setTagsData([...tagsData, {
      key: new Date().getTime(),
      label: currentTag,
    }]);

    setCurrentTag('');
  }

  const handleTagsDelete = (tagToDelete) => {
    setTagsData((tags) => tags.filter((tag) => tag !== tagToDelete));
  };

  const TagsComponent = () => (
    <ul
      css={css`
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 15px;
      `}
    >
      {tagsData.map((tag) => (
          <li key={tag.key}>
            <Chip
              size='small'
              label={tag.label}
              onDelete={() => handleTagsDelete(tag)}
              css={css`
                margin: 15px;
              `}
            />
          </li>
        )
      )}
    </ul>
  );

  const AssigneeComponent = () => (
    <FormControl className={'classes.formControl'}>
      <InputLabel shrink id="assignee-select-label-label">
        Assignee
      </InputLabel>
      <Select
        displayEmpty
        labelId="assignee-select-label-label"
        id="assignee-select-label"
        value={content.assignee}
        onChange={handleChange('assignee')}
        className={'classes.selectEmpty'}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {getContributorsList().map((contributor) => (
          <MenuItem key={contributor.email} value={contributor.email}>{contributor.name}</MenuItem>
        ))}
      </Select>
      <FormHelperText>Choose one</FormHelperText>
    </FormControl>
  );

  return(
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
        onChange={handleChange}
        helperText={cardError && "Card cant be empty"}
      />
      <TextField
        error={cardError}
        multiline
        rows={2}
        label="Description"
        variant="outlined"
        value={content.description}
        onChange={handleChange}
        helperText={cardError && "Card cant be empty"}
      />
      <FormControl fullWidth>
        <InputLabel htmlFor="outlined-adornment-password">Tags</InputLabel>
        <Input
          label="Tags"
          value={currentTag}
          onChange={(e) => setCurrentTag(e.target.value)}
          endAdornment={<AddIcon onClick={handleAddTag} />}
        />
      </FormControl>
      <TagsComponent />
      <AssigneeComponent />
      <DialogActions
        css={css`
          align-items: flex-end;
        `}
      >
        <Button
          css={css`
            margin: ${theme.margins.small};
          `}
          onClick={() => addHandler({
              id: new Date().getTime(),
              content,
            })
          }
        >
          Add
        </Button>
        <Button onClick={handleReset}>
          Reset
        </Button>
      </DialogActions>
    </form>
  )
}
