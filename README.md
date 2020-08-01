# GroupProject-Avengers

## Description
We will avenge confused travellers with a flight booking web applicaiton that allows users to search for and book flights as well as find previous bookings and manage travellers.

*Add deployed heroku link*\
[Api Link](https://github.ccs.neu.edu/NEU-CS5610-SU20/GroupProject-avengers-API)

__Note__: While fetching the list of airports, not all airports would work with the search, we are still working on it. For now, for testing purposes, you can test with these airports : "Boston Logan International" and "New York J.F. Kennedy"
 * For selecting the list of Airports, we used Skyscanner Open API
 * For fetching the list of flights, we used Amadeus Open API

## Team
Ram Tarun Balagam
1. Linked UI and API layers and made connections with MongoDB with Mongoose serving as the Schema.
2. Developed GET and POST API's for confirming and retrieving Bookings.
3. Connected Flights Search page with Passenger Details page and finally with Booking Confirmation page maintaining the state across all pages.

Vinay Srampickal Joseph
1. Designed the Flight Search page and the Flight Bookings page.
2. Connected the Home Page with the Flight Search page maintaining the state across the pages.

Dhaval Mohandas
1. Designing of landing page and navigation bar.
2. Integrated the external Amadeus API, for fetching airports and flights data, with the application.

Priyank Shelat
1. Designed the confirmation page.

## Iteration 1
We used [Create React App](https://github.com/facebook/create-react-app) to start the app.\
Our homepage was inspired by [Galatia Flight Search](https://galatia.herokuapp.com/homepage). 

For this iteration, we have implemented the main functionality of our app, booking flights. You first land on the homepage where they can input what type of trip and the trip details that they are looking for.

One Way Flight Search             |  Round Trip Flight Search
:-------------------------:|:-------------------------:
![](readme_images/Homepage_OneWay.PNG) | ![](readme_images/Homepage_RoundTrip.PNG)

When you hit search, you are taken to the available flights page where it shows you flights based on your search.

![](readme_images/AvailableFlights.PNG)

Once you select the flight you like, it will ask you to input your personal information.

![](readme_images/PassengerDetail.PNG)

Then, last but not least, you get a confirmation with a unique id and a read-back of your flight and personal information.

![](readme_images/ConfirmationPage.png)

Our next iterations goals will be to add, get, and show more necessary flight and user information as well as to give the user editing capability which include but are not limited to canceling tickets and passengers as well as booking return flights.

=======
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
