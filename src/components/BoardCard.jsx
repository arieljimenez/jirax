/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { jsx, css } from '@emotion/core';



export default function SimpleCard(props) {
  const {
    cardTitle = 'Card Title...',
    cardDesc = 'Card Desc...'
  } = props;

  return (
    <Card
      css={css`
        width: 90%;
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
          {cardTitle}
        </Typography>
        <Typography variant="body2" component="p">
          {cardDesc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Neka</Button>
      </CardActions>
    </Card>
  );
}