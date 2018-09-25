import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ResponsibilitiesList from './components/ResponsibilitiesList';

const GET_RESPONSIBILITIES = gql`
  query Responsibilities($needId: ID!) {
    need(nodeId: $needId) {
      fulfilledBy {
        nodeId
        title
      }
    }
  }
`;

const ResponsibilitiesContainer = withRouter(({ match }) => (
  <Query query={GET_RESPONSIBILITIES} variables={{ needId: match.params.needId }}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <Container fluid>
          <Row>
            <Col lg={4} xs={12}>
              <ResponsibilitiesList
                responsibilities={data.need.fulfilledBy}
                selectedResponsibilityId={match.params.responsibilityId}
              />
            </Col>
          </Row>
        </Container>
      );
    }}
  </Query>
));

ResponsibilitiesContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      needId: PropTypes.string,
      resposibilityId: PropTypes.string,
    }),
  }),
};

ResponsibilitiesContainer.defaultProps = {
  match: {
    params: {
      needId: undefined,
      responsibilityId: undefined,
    },
  },
};

export default ResponsibilitiesContainer;
