// Queries that need to be accessible to several components (for reusability, cache updates, etc.)

import gql from 'graphql-tag';

export const GET_NEEDS = gql`
  query Needs {
    needs {
      nodeId
      title
    }
  }
`;

export const GET_RESPONSIBILITIES = gql`
  query Responsibilities($needId: ID!) {
    responsibilities(nodeId: $needId) {
      nodeId
      title
    }
  }
`;
