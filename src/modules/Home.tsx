'use strict';
import {Grid, Image, Row, Col} from 'react-bootstrap';
import * as React from "react";

export const Home = React.createClass({
  render() {
    return (
      <Col md={4} mdOffset={4} className="g-item">
        <Image src="/img/personal/Dragon_low.jpg" responsive className="home-image center-block"/>
      </Col>
    );
  }
});