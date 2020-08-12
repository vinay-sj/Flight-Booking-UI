import React from 'react';
import {
	Navbar, NavbarBrand, NavItem, Nav, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {GoogleLogin, GoogleLogout} from 'react-google-login';

let userName;

const UI_API_ENDPOINT = process.env.REACT_APP_UI_API_ENDPOINT || 'http://localhost:5000';

/**
 * This is the class for the header of all the pages. It contains the handling of Google authentication, and the
 * dropdown for the links of booking and passenger list.
 */
class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLoggedIn: false,
			dropDownOpen: false
		};

		this.loginHandler = this.loginHandler.bind(this);
		this.logoutHandler = this.logoutHandler.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	async loginHandler(loginResponse) {
		userName = loginResponse && loginResponse.profileObj ? loginResponse.profileObj.name : null;
		if (loginResponse.tokenId) {
			const serverSignInResponse = await fetch(`${UI_API_ENDPOINT}/auth/signin`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ google_tokenId: loginResponse.tokenId }),
			});
			const body = await serverSignInResponse.text();
			const result = JSON.parse(body);
			const { signedIn, givenName } = result;
			console.log({ signedIn, givenName });
		}
		this.props.updateUserDetails(loginResponse);
		this.setState({ isUserLoggedIn: !this.state.isUserLoggedIn });
	}

	async logoutHandler(logoutresponse) {
		const serverSignOutResponse = await fetch(`${UI_API_ENDPOINT}/auth/signout`, {
			method: 'POST',
			credentials: 'include',
		});
		const body = await serverSignOutResponse.text();
		const result = JSON.parse(body);
		console.log(result);
		this.props.updateUserDetails(logoutresponse);
		await this.setState({ isUserLoggedIn: !this.state.isUserLoggedIn });
		window.location.replace('/');
	}

	toggle() {
		const { dropDownOpen } = this.state;
		this.setState({ dropDownOpen: !dropDownOpen });
	}

	render() {
		const { dropDownOpen, isUserLoggedIn } = this.state;
		return (
			<div>
				<Navbar expand="md">
					<Nav className='mr-auto' tabs>
						<Dropdown isOpen={dropDownOpen} toggle={this.toggle} disabled={!isUserLoggedIn}>
							<DropdownToggle nav>
								<FontAwesomeIcon icon={faBars}/>
							</DropdownToggle>
							<DropdownMenu style={{'backgroundColor': 'black'}}>
								<DropdownItem>
									<NavItem>
										<NavLink href="/bookings">My Bookings</NavLink>
									</NavItem>
								</DropdownItem>
								<DropdownItem>
									<NavItem>
										<NavLink href="/passengerlist">My Passengers</NavLink>
									</NavItem>
								</DropdownItem>
							</DropdownMenu>
						</Dropdown>
					</Nav>
					<NavbarBrand className="mr-auto" href="/">Home</NavbarBrand>
					{!this.state.isUserLoggedIn ? (
						<GoogleLogin
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
							buttonText="Login"
							onSuccess={(res) => this.loginHandler(res)}
							onFailure={(err) => console.log(err)}
							// cookiePolicy={'single_host_origin'}
							isSignedIn={true}
						/>
					) : (
						<GoogleLogout
							clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
							buttonText={ window.innerWidth > 620 ? `Logout ${userName}` : 'Logout'}
							onLogoutSuccess={(res) => this.logoutHandler(res)}
						/>
					)}
				</Navbar>
			</div>
		);
	}
}

export default Example;
