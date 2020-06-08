// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { action } from '@storybook/addon-actions';
import { jsx, css } from '@emotion/core';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


import BoardCard from '../components/BoardCard';
import { defaultCardInfo } from './stubs';

export default { title: 'Board Card' };

export const withAllData = () => (
  <DndProvider backend={HTML5Backend}>
    <div
      css={css`
        margin: 0 auto;
        width: 30%;
      `}
    >
      <BoardCard
        key='1'
        cardInfo={ {...defaultCardInfo, title: 'Draggable Card'}}
        handleDelete={action('Delete Card')}
        handleEdit={action('Edit Card')}
        handleMove={() => { }}
        keyColumnName="TODO"
        isActive={false}
      />
    </div>
  </DndProvider>
);