import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const TripTypeButton = ({ handleSelectedTripType, rSelected }) => {
      
    return (
      <div>
        <ButtonGroup>
          <Button color="primary" onClick={() => handleSelectedTripType(1)} active={rSelected === 1}>Round Trip</Button>
          <Button color="secondary" onClick={() => handleSelectedTripType(2)} active={rSelected === 2}>One Way</Button>
        </ButtonGroup>
      </div>
    );
  }
  
  export default TripTypeButton;
