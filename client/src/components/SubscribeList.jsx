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
	const [myData, setmyData] = useState({});
	const [channelsToSubscribeBack, setchannelsToSubscribeBack] = useState([]);
	const [newchannels, setnewchannels] = useState([]);
	const [mychannelid, setmychannelid] = useState('');
	const [token, settoken] = useState(props.token);

	const navigate = useNavigate();
	const classes = useStyles();

	// useEffect to get current users' data
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
			const res = await response.json();
			setmyData(res);
			setmychannelid(myData.channel);

			const mySubscribers = myData.subscribers.filter((subscriber) => {
				return myData.subscribedto.includes(subscriber);
			});

			setchannelsToSubscribeBack(mySubscribers.map((subscriber) => subscriber.channel));
		};

		fetchData();
		return () => {
			console.log('useEffect cleanup');
		};
	}, [mychannelid]);

	// useEffect to get new channels
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://localhost:5000/api/users/new=5');
			const newChannels = await response.json();
			console.log(newChannels);
			const filtered_data = newChannels.filter((newChannel) => {
				return (
					newChannel.channel !== mychannelid &&
					!channelsToSubscribeBack.includes(newChannel.channel) &&
					!myData.subscribers.map((i) => i.channel).includes(newChannel.channel)
				);
			});
			console.log(filtered_data);
			setnewchannels(filtered_data.map((e) => e.channel));
		};
		fetchData();
		return () => {
			console.log('useEffect cleanup');
		};
	}, [mychannelid, channelsToSubscribeBack]);

	return (
		<>
			<Typography variant="h4" className={classes.heading}>
				New people to subscribe to
			</Typography>

			{newchannels.map((channelid) => (
				<Subscribe
					channel={channelid}
					key={channelid}
					mychannelid={mychannelid}
					token={token}
				/>
			))}

			{channelsToSubscribeBack.length ? (
				<>
					<Typography variant="h4" className={classes.heading}>
						People who subscribe to you
					</Typography>

					{channelsToSubscribeBack.map((channelid) => (
						<Subscribe
							channel={channelid}
							key={channelid}
							mychannelid={mychannelid}
							token={token}
						/>
					))}
				</>
			) : (
				<></>
			)}
		</>
	);
};

export default SubscribeList;
