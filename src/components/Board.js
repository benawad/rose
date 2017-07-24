import React from 'react';
import { List, ListItem } from 'material-ui/List';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentSend from 'material-ui/svg-icons/content/send';
import ContentDrafts from 'material-ui/svg-icons/content/drafts';
import TextField from 'material-ui/TextField';
import { compose, graphql } from 'react-apollo';

import { getBoard } from '../queries';
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
        boardId: this.props.boardId,
      },
      optimisticResponse: {
        __typename: 'Mutation',
        createSuggestion: {
          __typename: 'Suggestion',
          id: -1,
          text: suggestion,
        },
      },
      update: (store, { data }) => {
        const newData = store.readQuery({
          query: getBoard,
          variables: { boardId: this.props.boardId },
        });
        newData.getBoard.suggestions.push(data.createSuggestion);
        store.writeQuery({
          query: getBoard,
          data: newData,
          variables: { boardId: this.props.boardId },
        });
      },
    });
  };

  render() {
    let name = '';
    let suggestions = [];

    if (!this.props.data.loading) {
      const { getBoard } = this.props.data;
      name = getBoard.name;
      suggestions = getBoard.suggestions;
    }

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

export default compose(
  graphql(getBoard, {
    options: ({ boardId }) => ({ variables: { boardId } }),
  }),
  graphql(createSuggestion),
)(Board);
