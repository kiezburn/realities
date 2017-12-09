import React from 'react';
import Head from 'next/head';
import { Container } from 'reactstrap';
import PropTypes from 'prop-types';
import Header from './Header';

const Layout = props => (
  <div>
    <Head>
      <title>Borderland Realities</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" />
    </Head>
    <Container>
      <Header />
      {props.children}
    </Container>
  </div>
);

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Layout;
