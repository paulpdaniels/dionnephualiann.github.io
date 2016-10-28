'use strict';
import {Form, FormGroup, Col, FormControl, ControlLabel, Button, InputGroup} from 'react-bootstrap';

export const Contact = ({route}) => (
  <Col xs={10} xsOffset={1}>
    {/*<div className="contactForm">
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
     </div>*/}
    <Form method="get" action="/extras/DionnePhuaResume.pdf">
      <div className="contactDetails">
        <FormGroup id="address" className="block">
          <ControlLabel>Address</ControlLabel>
          <FormControl.Static>{route.info.address}</FormControl.Static>
        </FormGroup>
        <FormGroup id="emailAddress" className="block">
          <ControlLabel>Email Address</ControlLabel>
          <FormControl.Static>
            <a href={`mailto:${route.info.emailAddress}`}>{route.info.emailAddress}</a>
          </FormControl.Static>
        </FormGroup>
        <FormGroup>
          <Button type="submit">Download Resume</Button>
        </FormGroup>
      </div>
    </Form>
  </Col>
);
