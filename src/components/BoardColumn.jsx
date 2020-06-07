/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import { jsx, css } from '@emotion/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { DropTarget } from 'react-dnd';
import Skeleton from '@material-ui/lab/Skeleton';

import BoardCard from './BoardCard';


function BoardColumn(props){
  const {
    title,
    cards,
    handleDelete,
    handleEdit,
    handleMove,
    canDrop,
    isOver,
    connectDropTarget,
    keyColumnName,
    isDataLoaded,
  } = props;

  const isActive = canDrop && isOver;

  const columnCards = cards.map(
    (cardInfo) => (
      <BoardCard
        key={cardInfo.id}
        {...{
          cardInfo,
          handleDelete,
          handleEdit,
          handleMove,
          keyColumnName,
          isActive,
        }}
      />
    )
  );

  return connectDropTarget (
    <div>
      <Card css={css` height: 100%; `}>
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            css={css` font-size: 1.5em;`}
          >
            {title}
            <hr />
          </Typography>
          {isDataLoaded
            ? columnCards
            : <Skeleton variant='rect' height="2000px" />
          }
          {props.children}
        </CardContent>
      </Card>
    </div>
  )
};

export default DropTarget (
  'CARD',
  {
    drop: ({ keyColumnName }) => ({
      name: `${keyColumnName} Column`,
      allowedDropEffect: 'move',
      keyColumnName,
    }),
  },
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  }),
)(BoardColumn);
