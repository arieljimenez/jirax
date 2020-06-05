/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import { jsx, css } from '@emotion/core';

import BoardCard from './components/BoardCard';
import BoardColumn from './components/BoardColumn';
import NewCardForm from './components/NewCardForm';

export default function BoardContainer(props){
  const colNames = [
    'To Do',
    'In Progress',
    'Done',
  ];

  const BoardColumns = () => colNames.map(
    (colName, index) => (
      <BoardColumn key={colName+index} title={colName}>
        <NewCardForm />
      </BoardColumn>
    )
  );

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
