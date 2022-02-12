import {
	Avatar,
	Card,
	Typography,
	CardHeader,
	CardContent,
	IconButton,
	Button,
	ButtonGroup,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
	subscribe: {
		margin: '1vh 0 0 0',
	},
});

const Subscribe = ({ channelName, channelId, description, imgUrl, subCount }) => {
	const classes = useStyles();

	return (
		<Card variant="outlined" className={classes.subscribe}>
			<CardHeader
				avatar={<Avatar src={imgUrl} alt={channelName}></Avatar>}
				title={channelName ? channelName : 'No Name'}
				subheader={`Subs: ${subCount}`}
				action={
					<ButtonGroup>
						<Button
							href={`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`}
							target="_blank"
							variant="contained"
							color="secondary"
							disableElevation
						>
							Subscribe
						</Button>
						<Button
							href={`https://www.youtube.com/channel/${channelId}?sub_confirmation=1`}
							target="_blank"
							variant="contained"
							color="disabled"
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
