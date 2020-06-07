/** @jsx jsx */
// eslint-disable-next-line
import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { jsx, css } from '@emotion/core';

import { TagsComponent } from './NewCardForm';
import theme from '../css/theme';
import { getContributorsList } from '../utils';


export default function SimpleCard(props) {
  const { cardInfo, handleDelete } = props;

  const formattedDueDate = new Date(cardInfo.dueDate).toDateString();
  const [contributorInfo] = getContributorsList().filter(contributor => contributor.email === cardInfo.assignee);

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

          button {
            opacity: 0;
          }

          :hover {
            button {
              opacity: 1;
            }
          }
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
            {cardInfo.title}
          </Typography>
          <Typography
            color="textSecondary"
            css={css`
              text-align: left;
              padding: 5px 0;
            `}
          >
            {cardInfo.description}

            {formattedDueDate}

          </Typography>
          <TagsComponent
            tags={[
              ...cardInfo.tags,
              (contributorInfo ? {key: 'assignee', label: contributorInfo.name} : ''),
              { key: 'dueDate', label: formattedDueDate, color: 'secondary'},
            ]}
          />
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