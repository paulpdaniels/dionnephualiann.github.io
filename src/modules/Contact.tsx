'use strict';
import {Form, FormGroup, Col, FormControl, Button, InputGroup} from 'react-bootstrap';

export const Contact = ({route}) => (
  <Col xs={12}>
    <div className="contactForm">
      <Form horizontal>
        <FormGroup>
          <Col sm={6}>
            <FormControl type="text" required placeholder="Name"/>
          </Col>
          <Col sm={6}>
            <InputGroup>
              <InputGroup.Addon>@</InputGroup.Addon>
              <FormControl type="email" required placeholder="Email"/>
            </InputGroup>
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={12}>
            <FormControl componentClass="textarea"
                         placeholder="Message"
                         rows={8}
                         required={true}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Col xs={2}>
            <Button bsStyle="info">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    <div className="contactDetails">
      <div id="address" className="block">
        <h4>Address</h4>
        <p>{route.info.address}</p>
      </div>
      <div id="phoneNumber" className="block">
        <h4>Phone Number</h4>
        <p>{route.info.phoneNumber}</p>
      </div>
      <div id="emailAddress" className="block">
        <h4>Email Address</h4>
        <p><a href={`mailto:${route.info.emailAddress}`}>{route.info.emailAddress}</a></p>
      </div>
    </div>
  </Col>
);
