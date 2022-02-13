import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';
import Login from './pages/Login';

function App() {
	return (
		<Router>
			<Navbar />
			<Container maxWidth="lg">
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
					<Route exact path="/login" element={<Login />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
