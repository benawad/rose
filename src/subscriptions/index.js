import { gql } from 'react-apollo';

export const voteHappened = gql`
  subscription {
    voteHappened {
      suggestionId
      incrementAmount
    }
  }
`;
