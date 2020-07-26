import React, { useState } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

const TripTypeButton = (props) => {
    const [rSelected, setRSelected] = useState(null);
      
    return (
      <div>
        <ButtonGroup>
          <Button color="primary" onClick={() => setRSelected(1)} active={rSelected === 1}>Round Trip</Button>
          <Button color="secondary" onClick={() => setRSelected(2)} active={rSelected === 2}>One Way</Button>
        </ButtonGroup>
      </div>
    );
  }
  
  export default TripTypeButton;
