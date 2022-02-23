import { Divider, Grid, Typography } from '@material-ui/core';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SubscribeList from '../components/SubscribeList';

const Dashboard = () => {
	const location = useLocation();

	const [token, setToken] = useState(location.state ? location.state.token : '');

	return (
		<Grid container direction="column">
			<SubscribeList token={token} />
		</Grid>
	);
};

export default Dashboard;
