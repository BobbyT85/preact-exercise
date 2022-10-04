import { h } from 'preact';
import { Router } from 'preact-router';

import Header from './header';

// Code-splitting is automated for `routes` directory
import Home from '../routes/home';
import Profile from '../routes/profile';
// import MotoERiders from '../routes/motoE';
// import Moto3Riders from '../routes/moto3';
// import Moto2Riders from '../routes/moto2';
// import MotoGpRiders from '../routes/motogp';
import Riders from '../routes/riders';
import Rider from '../routes/rider';

import { store } from '../store/store';
import { Provider } from 'react-redux';


const App = () => (

	<Provider store={ store }>
		<div id="app">
			<Header />
			<Router>
				<Home path="/" />
				<Profile path="/profile/" user="me" />
				<Profile path="/profile/:user" />
				{/* <MotoERiders path="/motoE/" />
				<Moto3Riders path="/moto3/" />
				<Moto2Riders path="/moto2/" />
				<MotoGpRiders path="/motogp" /> */}
				<Rider path="/rider/:id" />

				<Riders path="/riders" />
				<Riders path="/riders/:raceClass" />
				<Riders path="/riders/" raceClass="motoe" />
				<Riders path="/riders/" raceClass="moto3" />
				<Riders path="/riders/" raceClass="moto2" />
				<Riders path="/riders/" raceClass="motogp" />
			</Router>
		</div>
	</Provider>
)

export default App;
