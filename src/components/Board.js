import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import TextField from 'material-ui/TextField';
import { compose, graphql } from 'react-apollo';

import { allBoardsQuery } from '../queries';
import { createSuggestion } from '../mutations';
import Suggestion from './Suggestion';

class Board extends React.Component {
  state = {
    suggestion: '',
  };

  onSubmit = async e => {
    e.preventDefault();
    const { suggestion } = this.state;
    this.setState({ suggestion: '' });
    await this.props.mutate({
      variables: {
        text: suggestion,
        boardId: this.props.board.id,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createSuggestion: {
          __typename: 'Suggestion',
          id: -1,
          text: suggestion,
          votes: 0,
        },
      },
      update: (store, { data }) => {
        const newData = store.readQuery({
          query: allBoardsQuery,
        });
        newData.allBoards[this.props.i].suggestions.push(data.createSuggestion);
        store.writeQuery({
          query: allBoardsQuery,
          data: newData,
        });
      },
    });
  };

  render() {
    const { name, suggestions } = this.props.board;

    return (
      <div>
        <h1>
          {name}
        </h1>
        <form onSubmit={e => this.onSubmit(e)}>
          <TextField
            name="suggestion"
            hintText="Suggestion"
            floatingLabelText="Suggestion"
            value={this.state.suggestion}
            onChange={e => this.setState({ suggestion: e.target.value })}
            floatingLabelFixed
            fullWidth
          />
        </form>
        <List>
          {suggestions.map(x => <Suggestion key={x.id} suggestion={x} />)}
        </List>
      </div>
    );
  }
}

export default graphql(createSuggestion)(Board);
