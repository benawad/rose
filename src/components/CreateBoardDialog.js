import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import { graphql } from 'react-apollo';

import { createBoardMutation } from '../mutations';
import { allBoardsQuery } from '../queries';

class CreateBoardDialog extends React.Component {
  state = {
    name: '',
  };

  handleClose = () => {
    this.setState({ name: '' });
    this.props.closeDialog();
  };

  handleOk = () => {
    const { state } = this;
    this.props.mutate({
      variables: state,
      optimisticResponse: {
        __typename: 'Mutation',
        createBoard: {
          __typename: 'Board',
          id: -1,
          name: state.name,
          suggestions: [],
        },
      },
      update: (store, { data: createBoard }) => {
        const newData = store.readQuery({
          query: allBoardsQuery,
        });
        newData.allBoards.push(createBoard.createBoard);
        store.writeQuery({
          query: allBoardsQuery,
          data: newData,
        });
      },
    });
    this.handleClose();
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary onTouchTap={() => this.handleClose()} />,
      <FlatButton label="Save" primary onTouchTap={() => this.handleOk()} />,
    ];
    return (
      <Dialog
        title="Create a board"
        actions={actions}
        modal={false}
        open={this.props.open}
        onRequestClose={this.handleClose}
      >
        <TextField
          hintText="Name"
          floatingLabelText="Name"
          value={this.state.name}
          floatingLabelFixed
          onChange={e => this.setState({ name: e.target.value })}
        />
      </Dialog>
    );
  }
}

export default graphql(createBoardMutation)(CreateBoardDialog);
