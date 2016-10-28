'use strict';
import * as React from "react";
import {Col, Panel, Row} from 'react-bootstrap';

const fields = [
  {title: "Full name", value: "Dionne Phua"},
  {title: "Title", value: "Artist (Generalist)"},
  {title: "Location", value: "San Francisco Bay Area"},
  {title: "Blurb", value: "Jack-of-all-trades with an awesome personality. Life won't be boring. I promise."}
]

export const About = React.createClass({
  render() {
    return (
      <Col xs={10} xsOffset={1}>
        <Panel>
          {
            fields.map(field => (
              <Row>
                <Col xs={2}>
                  <h4 className="text-muted">
                    <small>{field.title}</small>
                  </h4>
                </Col>
                <Col xs={10}>
                  <h5>{field.value}</h5>
                </Col>
              </Row>
            ))
          }
        </Panel>
        <Panel>
          <Row>
            <Col xs={2}>
              <h4 className="text-muted">
                Biography
              </h4>
            </Col>
            <Col xs={10}>
              <h5>
                Hailing from a tiny island called Singapore, I am often hungry (literally too) for an adventure! As a person of many hobbies and interest, I am often up and running about to keep things interesting. Overall nothing could keep me grounded but my desire for expressing both my skills and talent for art. I want to make a name for myself. I am known as a jack-of-all-trades, a master-in-the making of everything. And hopefully world domination... maybe. Lol~ Keeping my fingers cross.
              </h5>
            </Col>
          </Row>
        </Panel>
        <Panel>
          <Row>
            <Col xs={2}>
              <h4 className="text-muted">
                Education
              </h4>
            </Col>
            <Col xs={10}>
              <h4>
                Bachelors of Fine Arts
              </h4>
              <h4>
                Ringling College of Art and Design
              </h4>
              <h5 className="text-muted">
                Sarasota, FL &middot; 2007 - 2010
              </h5>
              <h5>
                Computer Animation Major
              </h5>
            </Col>
          </Row>
        </Panel>
      </Col>
    );
  }
});