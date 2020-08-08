import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import App from './App';
// import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
	<div className="screenType">
		<React.Fragment>
			<App />
		</React.Fragment>
	</div>,
	document.getElementById('root')
);
