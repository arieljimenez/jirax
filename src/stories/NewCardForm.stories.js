// eslint-disable-next-line
import React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import NewCardFrom from '../components/NewCardForm';
import { defaultCardInfo } from './stubs';

export default { title: 'New Card Form'};

export const withData = () => (
  <div
    css={css`
      margin: 0 auto;
      width: 50%;
    `}
  >
    <NewCardFrom
      edit
      cardInfo={defaultCardInfo}
    />
  </div>
);

export const withOutData = () => (
  <div
    css={css`
      margin: 0 auto;
      width: 50%;
    `}
  >
    <NewCardFrom
      cardInfo={{
        title: '',
        description: '',
        tags: [],
        assignee: '',
        dueDate: new Date().toISOString().substring(0, 16),
      }}
    />
  </div>
);
