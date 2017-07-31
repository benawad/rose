import React from 'react';
import { graphql } from 'react-apollo';

import Board from '../components/Board';
import { allBoardsQuery } from '../queries';

const Home = ({ data: { allBoards = [] } }) =>
  (<div>
    {allBoards.map((b, i) => <Board key={b.id} board={b} i={i} />)}
  </div>);

export default graphql(allBoardsQuery)(Home);
