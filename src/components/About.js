import React from 'react';
import {
  Row, Col, Card, CardImg, CardBody, CardTitle, NavLink
} from 'reactstrap';

class About extends React.Component {
  render() {
    return (
      <>
        <h3 className='text-center'>About Us</h3>
        <p>We are a team of 4 ....</p>

        <h4 className='text-center'>****Meet the Team****</h4>
        <Row>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src={require("../img/dhaval.jpg")} alt="Dhaval Mohandas"></CardImg>
              <CardBody className='text-center'>
                <CardTitle>Dhaval</CardTitle>
                <NavLink href="https://www.linkedin.com/in/dhaval-mohandas/" target='_blank'>LinkedIn</NavLink>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src={require("../img/priyank.jpg")} alt="Priyank"></CardImg>
              <CardBody className='text-center'>
                <CardTitle>Priyank</CardTitle>
                <NavLink href="https://www.linkedin.com/in/priyank-s-2a94118a/" target='_blank'>LinkedIn</NavLink>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src={require("../img/ram.jpg")} alt="Ram"></CardImg>
              <CardBody className='text-center'>
                <CardTitle>Ram</CardTitle>
                <NavLink href="https://www.linkedin.com/in/ram-tarun-balagam-a0986a113/" target='_blank'>LinkedIn</NavLink>
              </CardBody>
            </Card>
          </Col>
          <Col md={3}>
            <Card>
              <CardImg top width="100%" src={require("../img/vinay.jpg")} alt="Vinay Srampickal Joseph"></CardImg>
              <CardBody className='text-center'>
                <CardTitle>
                  <div>Vinay</div></CardTitle>
                <NavLink href="https://www.linkedin.com/in/vinaysj/" target='_blank'>LinkedIn</NavLink>
              </CardBody>
            </Card>
          </Col>

        </Row>
      </>
    );
  }
}

export default About;