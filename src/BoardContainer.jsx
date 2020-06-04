/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';

import BoardCard from './components/BoardCard';
import BoardColumn from './components/BoardColumn';
import { jsx, css } from '@emotion/core';


export default function BoardContainer(props){
  const colNames = [
    'To Do',
    'In Progress',
    'Done',
  ];

  const BoardColumns = () => colNames.map(colName => <BoardColumn title={colName} />);

  return(
    <div
      className="board-container"
      css={css`
        display: flex;
        height: 100%
      `}
    >
      <BoardColumns />
    </div>
  )
}
