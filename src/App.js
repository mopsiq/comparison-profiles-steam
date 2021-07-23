import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	NavLink,
	Link,
	Route,
	useRouteMatch,
	useParams,
} from 'react-router-dom';
import Home from './pages/Home/Home.js';
import About from './pages/About/About.js';

export default function App() {
	return (
		<Router>
			<div>
				<Switch>
					<Route path='/about' component={About} />
					<Route path='/' component={Home} />
				</Switch>
			</div>
		</Router>
	);
}
