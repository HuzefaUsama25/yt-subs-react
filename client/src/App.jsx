import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import Login from './pages/Login';
import Register from './pages/Register';
import { useState } from 'react';

function App() {
	const [token, settoken] = useState('');

	return (
		<Router>
			<Navbar />
			<Container maxWidth="lg">
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
					<Route exact path="/login" element={<Login />} />
					<Route exact path="/register" element={<Register />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
