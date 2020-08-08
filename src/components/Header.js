import React from 'react';
import { Navbar, NavbarBrand, NavItem, Nav, NavLink } from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

let userName;


class Example extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isUserLoggedIn: false
		};

		this.loginHandler = this.loginHandler.bind(this);
		this.logoutHandler = this.logoutHandler.bind(this);
	}

	async loginHandler(loginResponse) {
		userName = loginResponse && loginResponse.profileObj ? loginResponse.profileObj.name : null;
		if (loginResponse.tokenId) {
			// const serverSignInResponse = await fetch('http://localhost:5000/auth/signin', {
			const serverSignInResponse = await fetch('https://group-project-avengers-api.herokuapp.com/auth/signin', {
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
		this.setState({isUserLoggedIn: !this.state.isUserLoggedIn});
	}

	async logoutHandler(logoutresponse) {
		// const serverSignOutResponse = await fetch('http://localhost:5000/auth/signout', {
		const serverSignOutResponse = await fetch('https://group-project-avengers-api.herokuapp.com/auth/signout', {
			method: 'POST',
			credentials: 'include',
		});
		const body = await serverSignOutResponse.text();
		const result = JSON.parse(body);
		console.log(result);
		this.props.updateUserDetails(logoutresponse);
		this.setState({isUserLoggedIn: !this.state.isUserLoggedIn});
	}

	render() {
		return (
			<div>
				<Navbar expand="md">
					<NavbarBrand className="mr-auto" href="/">Home</NavbarBrand>
					<Nav className="mr-auto" navbar>
						<NavItem>
							<NavLink href="/bookings">My Bookings</NavLink>
						</NavItem>
						<NavItem>
							<NavLink href="/passengerlist">My Passengers</NavLink>
						</NavItem>
					</Nav>
					{!this.state.isUserLoggedIn ? (
						<GoogleLogin
							clientId="660147973995-blt1grgbfeebedrr543u53s7okhgtlso.apps.googleusercontent.com"
							buttonText="Login"
							onSuccess={(res) => this.loginHandler(res)}
							onFailure={(err) => console.log(err)}
							cookiePolicy={'single_host_origin'}
							isSignedIn={true}
						/>
					) : (
						<GoogleLogout
							clientId="660147973995-blt1grgbfeebedrr543u53s7okhgtlso.apps.googleusercontent.com"
							buttonText={`Logout ${userName}`}
							onLogoutSuccess={(res) => this.logoutHandler(res)}
						/>
					)}
				</Navbar>
			</div>
		);
	}
}

export default Example;
