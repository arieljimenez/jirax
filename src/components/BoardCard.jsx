/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { jsx, css } from '@emotion/core';

import theme from '../css/theme';


export default function SimpleCard(props) {
  const { cardInfo, handleDelete } = props;

  return (
    <div
      className="cardContainer"
      css={css`
        display: -webkit-inline-box;
        width: 100%;
      `}
    >
      <Card
        css={css`
          margin: 5px 10px;
          width: ${theme.cardWidth};
        `}
      >
        <CardContent>
          <Typography
            variant="h5"
            component="h2"
            css={css`
              text-align: left;
            `}
          >
            {cardInfo.content}
          </Typography>
        </CardContent>
        <CardActions
          css={css`
            justify-content: flex-end;
          `}
        >
          <Button
            variant='outlined'
            size="small"
            color="secondary"
            onClick={() => handleDelete(cardInfo)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}