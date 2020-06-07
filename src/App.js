/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { jsx, css } from '@emotion/core';
import IconButton from '@material-ui/core/IconButton'

import BoardContainer from './BoardContainer';

function App() {
  const [todoItems, addTodo] = React.useState([]);
  const [inprogressItems, addInprogress] = React.useState([]);
  const [doneItems, addDone] = React.useState([]);

  const [searchMode, toggleSearch] = React.useState(false);
  const [searchQuery, updateSearchQuery] = React.useState('');
  const [filteredResults, setFilteredResults] = React.useState({
    todoItems: [],
    inprogressItems: [],
    doneItems: [],
  })

  const handleSearch = () => {
    const query = searchQuery.trim().toLowerCase();

    const filteredTodoItems = todoItems
      .filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.assignee.toLowerCase().includes(query) ||
        (item.tags.filter(tag => tag.label.includes(query)).length > 0)
        );

    const filteredInprogressItems = inprogressItems
      .filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.assignee.toLowerCase().includes(query) ||
        (item.tags.filter(tag => tag.label.includes(query)).length > 0)
      );

    const filteredDoneItems = doneItems
      .filter(item =>
        item.title.toLowerCase().includes(query) ||
        item.assignee.toLowerCase().includes(query) ||
        (item.tags.filter(tag => tag.label.includes(query)).length > 0)
      );

    setFilteredResults({
      todoItems: filteredTodoItems,
      inprogressItems: filteredInprogressItems,
      doneItems: filteredDoneItems,
    });

    toggleSearch(true);
  }

  const handleSearchQuery = (query) => {
    if (query) {
      toggleSearch(false)
    }

    updateSearchQuery(query);
  }

  return (
    <div css={css`
      flex-grow: 1;
      height: 100%;
    `}>
      <AppBar
        position="static"
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            css={css`
              width: 80%;
            `}
          >
            Jirax
          </Typography>
          <div
            css={css`
              position: relative;
              border-radius: 15px;
              background-color: rgba(255,255,255, 0.15);
              &:hover {
                background-color: rgba(255,255,255, 0.25);
              }
            `}
          >
            <div
              onClick={handleSearch}
              css={css`
                padding-left: 5px;
                height: 100%;
                position: absolute;
                pointer-events: none;
                display: flex;
                align-items: center;
                justify-content: center;
            `}>

            </div>
            <InputBase
              placeholder="Search…"
              value={searchQuery}
              onChange={(e) => handleSearchQuery(e.target.value)}
              startAdornment={
                <IconButton
                  onClick={handleSearch}
                >
                  <SearchIcon />
                </IconButton>
              }
              css={css`
                width: 100%;

                &:hover {
                  color: white;
                }
              `}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <BoardContainer
        todoItems={searchMode
            ? filteredResults.todoItems
            : todoItems}
        inprogressItems={searchMode
          ? filteredResults.inprogressItems
          : inprogressItems
        }
        doneItems={searchMode
          ? filteredResults.doneItems
          : doneItems
        }
        addTodo={addTodo}
        addInprogress={addInprogress}
        addDone={addDone}
      />
    </div>
  );
}

export default App;
