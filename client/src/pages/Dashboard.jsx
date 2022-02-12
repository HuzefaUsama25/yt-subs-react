import { Divider, Grid, Typography } from '@material-ui/core';
import SubscribeList from '../components/SubscribeList';

const Dashboard = () => {
	return (
		<Grid container direction="column">
			<SubscribeList />
		</Grid>
	);
};

export default Dashboard;
