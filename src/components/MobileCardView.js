import React from 'react';
import {  Form, FormGroup, Label, Input } from 'reactstrap';
import {Accordion, Card} from 'react-bootstrap';
import Loader from 'react-loader-spinner';

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
										{item[0] && <Label style={{'marginBottom': 0}} >{item[0]}</Label>}
										{item[1] && <Input bsSize='md' plaintext readOnly defaultValue={item[1]}></Input>}
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

const CustomLoaderSpinner = () => {
	return (
		<div className='custom-spinner-css text-center'>
			<Loader
				type="ThreeDots"
				color="#00BFFF"
				height={100}
				width={100} //3 secs
			/>
		</div>
	);
};

export {CustomLoaderSpinner,
	MobileCardView};