import React from 'react';
import { graphql } from 'react-apollo';
import _ from 'lodash';
import RaisedButton from 'material-ui/RaisedButton';

import Board from '../components/Board';
import CreateBoardDialog from '../components/CreateBoardDialog';
import { allBoardsQuery } from '../queries';

// i = 0
// 0 : i2 = 0
// 1 : i2 = 1
// 2 : i2 = 2
// 3 : i2 = 3

// i = 1
// 4 : i2 = 0
// 5 : i2 = 1
// 6 : i2 = 2
// 7 : i2 = 3

const row = (boards, i) =>
  <div key={i} className="row">
    {boards.map((b, i2) =>
      <div key={b.id} className="col-xs-3">
        <Board board={b} i={i * 4 + i2} />
      </div>,
    )}
  </div>;

class Home extends React.Component {
  state = {
    openDialog: false,
  };

  render() {
    const { data: { allBoards = [] } } = this.props;
    return (
      <div>
        <RaisedButton
          label="Create Board"
          onTouchTap={() => this.setState({ openDialog: true })}
          fullWidth
          primary
        />
        {_.chunk(allBoards, 4).map(row)}
        <CreateBoardDialog
          open={this.state.openDialog}
          closeDialog={() =>
            this.setState({
              openDialog: false,
            })}
        />
      </div>
    );
  }
}

export default graphql(allBoardsQuery)(Home);
