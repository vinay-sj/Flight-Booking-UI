import React from 'react';
import {
	Row, Col, Card, CardImg, CardBody, CardTitle, NavLink
} from 'reactstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

/**
 * Class for the About page. It explains why we made this project and introduces the team members.
 */
class About extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			teamMembers:[],
		};
	}

	componentDidMount() {
		const json = require('../mock_json/about.json');
		const teamMembers = JSON.parse(JSON.stringify(json));
		this.setState({ teamMembers: teamMembers });
	}

	render() {
		const { teamMembers } = this.state;
		const teamInfo = (teamMembers.map((member, index)=>{
			return (
				<Col md={3} key={index}>
					<Card>
						<CardImg top width="100%" src={member.avatar} alt={member.name}></CardImg>
						<CardBody className='text-center'>
							<CardTitle>{member.name}</CardTitle>
							<NavLink className='zoom' href={member.linkedin} target='_blank'><FontAwesomeIcon icon={faLinkedinIn}/></NavLink>
						</CardBody>
					</Card>
				</Col>
			);
		}));

		return (
			<>
				<h3 className='text-center'>About Us</h3>
				<h4 className='text-center'>This is our Team of 4</h4>
				<Row>
					{teamInfo}
				</Row>
			</>
		);
	}
}

export default About;