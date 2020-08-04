import React, { useState } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

let userName;

const RenderLoginButtons = ({updateUserDetails}) => {

	const loginHandler = (loginResponse) => {
		userName = loginResponse && loginResponse.profileObj ? loginResponse.profileObj.name : null;
		updateUserDetails(loginResponse);
		setLoginState(!isUserLoggedIn);
	};

	const [isUserLoggedIn, setLoginState] = useState(false);

	return !isUserLoggedIn ? (
		<GoogleLogin
			clientId="660147973995-blt1grgbfeebedrr543u53s7okhgtlso.apps.googleusercontent.com"
			buttonText="Login"
			onSuccess={(res) => loginHandler(res)}
			onFailure={(err) => console.log(err)}
			cookiePolicy={'single_host_origin'}
			isSignedIn={true}
		/>
	) : (
		<GoogleLogout
			clientId="660147973995-blt1grgbfeebedrr543u53s7okhgtlso.apps.googleusercontent.com"
			buttonText={`Logout ${userName}`}
			onLogoutSuccess={(res) => loginHandler(res)}
		/>
	);
};

const Example = ({updateUserDetails}) => {
	return (
		<div>
			<Navbar expand="md">
				<NavbarBrand className="mr-auto" href="/">Home</NavbarBrand>
				<RenderLoginButtons updateUserDetails={updateUserDetails}/>
			</Navbar>
		</div>
	);
};

export default Example;
