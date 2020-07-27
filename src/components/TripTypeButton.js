import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const TripTypeButton = ({ rSelected }) => {
      
    return (
      <div>
        <ButtonGroup>
          <Button color="primary"  >Round Trip</Button>
          <Button color="secondary" >One Way</Button>
        </ButtonGroup>
      </div>
    );
  }
  
  export default TripTypeButton;
