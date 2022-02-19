import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
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
