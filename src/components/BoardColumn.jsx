/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { jsx, css } from '@emotion/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import BoardCard from './BoardCard';


export default function BoardColumn(props){
  const { title, cards, handleDelete, handleEdit } = props;

  const columnCards = Object.entries(cards).map(
    ([key, cardInfo]) => (
      <BoardCard
        {...{ key, cardInfo, handleDelete, handleEdit }}
      />
    )
  )

  return (
    <DndProvider
      backend={HTML5Backend}
    >
      <Card
        css={css`
          text-align: center;
          width: 100%;
        `}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            css={css`
              font-size: 1.5em;
            `}
           >
            {title}
            <hr />
          </Typography>
          {columnCards}
          {props.children}
        </CardContent>
      </Card>
    </DndProvider>
  )
};
