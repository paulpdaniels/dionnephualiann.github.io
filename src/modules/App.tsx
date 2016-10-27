'use strict';
import * as React from "react";
import {Grid, Col, Row, Dropdown, MenuItem, DropdownButton} from 'react-bootstrap';
import {Link} from 'react-router';

export const App = React.createClass({
  render() {
    const {projects} = this.props.route.config;

    return (
      <Grid className="form-group">
        <Row>
          <Col mdOffset={4} md={4}>
            <h1 className="text-center">
              <Link to="/" className="my-name">Dionne Phua</Link>
            </h1>
          </Col>
        </Row>
        <Row>
          <div className="sexy_line"></div>
        </Row>
        <Row>
          <Col className="text-center" xsOffset={2} xs={2}>
            <Link to="/about" className="menu-item-default">About</Link>
          </Col>
          <Col className="text-center" xsOffset={1} xs={2}>
            <DropdownButton
              bsStyle="link"
              title="Gallery"
              className="menu-item-default"
              styles={{padding: 0}}
            >
              {projects.map((project, index) => {
                return (
                  <MenuItem eventKey={index}>
                    <Link to={`/gallery/${project.id}`}>{project.name}</Link>
                  </MenuItem>
                )
              })}
            </DropdownButton>
          </Col>
          <Col className="text-center" xsOffset={1} xs={2}>
            <Link to="/contact" className="menu-item-default">Contact</Link>
          </Col>
        </Row>
        <br />
        <Row>
          {
            this.props.children
          }
        </Row>
        <footer className="footer">
          <Grid>
            <p className="text-muted">&copy; Copyright Dionne Phua 2016</p>
          </Grid>
        </footer>
      </Grid>
    );
  }
});