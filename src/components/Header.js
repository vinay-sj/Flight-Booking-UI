import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
} from 'reactstrap';

const Example = (props) => {
  
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">Home</NavbarBrand>

      </Navbar>
    </div>
  );
}

export default Example;