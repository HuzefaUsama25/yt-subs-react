import {
	Avatar,
	Card,
	Typography,
	CardHeader,
	CardContent,
	Button,
	ButtonGroup,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';

const useStyles = makeStyles({
	subscribe: {
		margin: '1vh 0 0 0',
		width: '100%',
	},
});

const Subscribe = (props) => {
	const [apiKey, setapiKey] = useState('AIzaSyCGnHPKqunoQFw3pwCp19gYTBkBoGnXNsE');
	const [channelname, setchannelname] = useState('');
	const [channelid, setchannelid] = useState(props.channel);
	const [description, setdescription] = useState('');
	const [imgurl, setimgurl] = useState('');
	const [subcount, setsubcount] = useState('');

	const [subscribeClicked, setsubscribeClicked] = useState(false);

	const handleSubscribe = () => {
		setsubscribeClicked(true);
		console.log('Subscribe clicked');
	};
	const handleConfirm = () => {
		console.log('Confirm clicked');
		// add user as a subscriber (of the channel he clicked) to database
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				let data = await fetch(
					`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2Cstatistics&id=${channelid}&key=${apiKey}`
				);
				let json_data = await data.json();

				console.log(json_data);

				setchannelname(json_data.items[0].snippet.title);
				setchannelid(json_data.items[0].id);
				setdescription(json_data.items[0].snippet.description);
				setimgurl(json_data.items[0].snippet.thumbnails.default.url);
				setsubcount(json_data.items[0].statistics.subscriberCount);
			} catch (err) {
				setchannelname('No Name');
				setchannelid('No id');
				setdescription('No Description');
				setimgurl('No image');
				setsubcount(0);
				console.log(err);
			}
		};
		fetchData();

		return () => {
			console.log('useEffect cleanup');
		};
	}, []);

	const classes = useStyles();

	return (
		<Card variant="outlined" className={classes.subscribe}>
			<CardHeader
				avatar={<Avatar src={imgurl} alt={channelname}></Avatar>}
				title={channelname ? channelname : 'No Name'}
				subheader={`Subs: ${subcount}`}
				action={
					<ButtonGroup>
						<Button
							href={`https://www.youtube.com/channel/${channelid}?sub_confirmation=1`}
							target="_blank"
							onClick={handleSubscribe}
							variant="contained"
							color="secondary"
							disableElevation
						>
							Subscribe
						</Button>
						<Button
							disabled={!subscribeClicked}
							onClick={handleConfirm}
							target="_blank"
							variant="contained"
							color="default"
							disableElevation
						>
							Confirm
						</Button>
					</ButtonGroup>
				}
			/>
			<CardContent>
				<Typography variant="body2" color="textSecondary" noWrap>
					{description}
				</Typography>
			</CardContent>
		</Card>
	);
};

export default Subscribe;
