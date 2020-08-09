import React from 'react';
import {
  Container, NavItem, Nav, NavLink, Row, Col, ModalFooter
} from 'reactstrap';

import {Glyphicon} from 'react-bootstrap';

class Footer extends React.Component {

  render() {
    return (
      <div>
        <ModalFooter expand='md'>
          <Container className=''>
            <Row>
              <Col lg={4} md={5}>
                <h4>Flight Booker</h4>
                <div>Book the cheapest flight</div>
              </Col>
              <Col lg={3} md={3}>
                <h4>Links</h4>
                <Nav>
                  <NavItem>
                    <NavLink href="/about">About</NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col lg={4} md={4}>
                <h4>Location</h4>
                <div>Snell Library, Northeastern University</div>
                <div><Glyphicon glyph="earphone"/>(617) 373-8778</div>
                <div><Glyphicon glyph="envelope"/>info@flightbooker.com</div>
              </Col>
            </Row>
            <Row>
              <Col lg={4} md={4}><p>Flight Booker © 2020. All Rights Reserved.</p></Col>
            </Row>
          </Container>
        </ModalFooter>
      </div>
    );
  }
}

export default Footer;