import Subscribe from './Subscribe';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	heading: {
		margin: '1em 0',
	},
});

const SubscribeList = (props) => {
	/*
		'UCX6OQ3DkcsbYNE6H8uQQuVA',
		'UCAiLfjNXkNv24uhpzUgPa6A',
		'UCIPPMRA040LQr5QPyJEbmXA',
		'UCUaT_39o1x6qWjz7K2pWcgw',
		'UC4-79UOlP48-QNGgCko5p2g',
		'UCZzvDDvaYti8Dd8bLEiSoyQ',
		'UCW5YeuERMmlnqo4oq8vwUpg',
	*/
	const [subchannels, setsubchannels] = useState([]);
	const [newchannels, setnewchannels] = useState([]);
	const [token, settoken] = useState(props.token);

	const navigate = useNavigate();
	const classes = useStyles();

	// useEffect to get current users' subscribers' channels
	useEffect(() => {
		const fetchData = async () => {
			if (!token) {
				navigate('/login');
			}
			const response = await fetch('http://localhost:5000/api/auth', {
				method: 'GET',
				headers: {
					'x-auth-token': token,
				},
			});
			const data = await response.json();
			setsubchannels(data.subscribers.map((e) => e.channel));
		};
		fetchData();
		return () => {
			console.log('useEffect cleanup');
		};
	}, []);

	// useEffect to get new channels
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:5000/api/users/new=5');
			const data = await response.json();
			console.log(data);
			setnewchannels(data.map((e) => e.channel));
		};
		fetchData();
		return () => {
			console.log('useEffect cleanup');
		};
	}, []);

	return (
		<>
			<Typography variant="h4" className={classes.heading}>
				New people to subscribe to
			</Typography>

			{newchannels.map((channelid) => (
				<Subscribe channel={channelid} />
			))}

			{subchannels.length ? (
				<>
					<Typography variant="h4" className={classes.heading}>
						People who subscribe to you
					</Typography>

					{subchannels.map((channelid) => (
						<Subscribe channel={channelid} />
					))}
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default SubscribeList;
