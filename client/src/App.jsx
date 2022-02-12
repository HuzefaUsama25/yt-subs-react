import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import { Container } from '@material-ui/core';

function App() {
	return (
		<Router>
			<Navbar />
			<Container maxWidth="lg">
				<Routes>
					<Route exact path="/" element={<Dashboard />} />
				</Routes>
			</Container>
		</Router>
	);
}

export default App;
