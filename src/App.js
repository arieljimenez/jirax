/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { jsx, css } from '@emotion/core';

import BoardContainer from './BoardContainer';

function App() {
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
            <div css={css`
              padding-left: 5px;
              height: 100%;
              position: absolute;
              pointer-events: none;
              display: flex;
              align-items: center;
              justify-content: center;
            `}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              css={css`
                padding-left: 30px;
                width: 100%;
              `}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <BoardContainer />
    </div>
  );
}

export default App;
