import React from 'react';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import {Accordion, Card} from 'react-bootstrap';

const MobileCardView = ({keysArray, valuesArray, actionHandler, currentIndex, primaryField}) => {
	let primaryIndex;
	const keyValueArray = valuesArray.map((value, index) => {

		if (keysArray[index] === primaryField) {
			primaryIndex = index;
		}
		return [keysArray[index], value];
	});

	return (
		<Accordion>
			<Card>
				<Accordion.Toggle as={Card.Header} eventKey={currentIndex+1}>
					<Form>
						<Label readOnly style={{'marginBottom': 0}} >{keyValueArray[primaryIndex][1]}</Label>
					</Form>
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={currentIndex+1}>
					<Card.Body>
						<Form>
							{keyValueArray.map((item, index) => {
								return (
									<FormGroup key={index} style={{'marginBottom': '10px'}}>
										<Label style={{'marginBottom': 0}} >{item[0]}</Label>
										<Input bsSize='md' plaintext readOnly defaultValue={item[1]}></Input>
									</FormGroup>
								);
							})}

							<div>{actionHandler}</div>
						</Form>
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		</Accordion>
	);
};

export default MobileCardView;