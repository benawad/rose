import React from 'react';
import { ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { graphql } from 'react-apollo';

import { voteMutation } from '../mutations';

const suggestion = ({ mutate, suggestion: { id, text, votes } }) =>
  (<ListItem
    primaryText={`${text} - ${votes}`}
    rightIconButton={
      <IconButton onTouchTap={() => mutate({ variables: { id } })}>
        <ActionHome />
      </IconButton>
    }
  />);

export default graphql(voteMutation)(suggestion);
