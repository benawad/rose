import { gql } from 'react-apollo';

export const boardFragment = gql`
  fragment allBoardFields on Board {
    id
    name
    suggestions {
      id
      text
      votes
    }
  }
`;

export const getBoard = gql`
  query($boardId: Int!) {
    getBoard(boardId: $boardId) {
      ...allBoardFields
    }
  }
  ${boardFragment}
`;

export const allBoardsQuery = gql`
  {
    allBoards {
      ...allBoardFields
    }
  }
  ${boardFragment}
`;
