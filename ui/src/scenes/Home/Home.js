import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import NeedsList from './components/NeedsList';
import ResponsibilitiesList from './components/ResponsibilitiesList';
import DetailView from './components/DetailView';

class Home extends React.Component {
  constructor() {
    super();

    this.state = { selectedNeed: null, selectedResponsibility: null };
    this.onSelectNeed = this.onSelectNeed.bind(this);
    this.onSelectResponsibility = this.onSelectResponsibility.bind(this);
  }

  onSelectNeed(need) {
    this.setState({ selectedNeed: need, selectedResponsibility: null });
  }

  onSelectResponsibility(responsibility) {
    this.setState({ selectedResponsibility: responsibility });
  }

  render() {
    const { needs } = this.props.data;
    return (
      <Container fluid>
        <Row>
          <Col>
            <NeedsList
              needs={needs}
              onSelectNeed={this.onSelectNeed}
              selectedNeed={this.state.selectedNeed}
            />
          </Col>
          <Col>
            <ResponsibilitiesList
              responsibilities={this.state.selectedNeed && this.state.selectedNeed.fulfilledBy}
              onSelectResponsibility={this.onSelectResponsibility}
              selectedResp={this.state.selectedResponsibility}
            />
          </Col>
          <Col>
            <DetailView data={this.state.selectedResponsibility || this.state.selectedNeed} />
          </Col>
        </Row>
      </Container>
    );
  }
}

Home.defaultProps = {
  data: {
    needs: [],
  },
};

Home.propTypes = {
  data: PropTypes.shape({
    needs: PropTypes.array,
  }),
};

export default graphql(gql`
  query {
    needs {
      nodeId
      title
      description
      fulfilledBy {
        nodeId
        title
        description
      }
    }
  }
`)(Home);
