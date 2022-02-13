import { Avatar, Button, Card, Grid, Icon, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { LockOutlined } from '@material-ui/icons';
import { useState } from 'react';

const useStyles = makeStyles({
	loginPaper: {
		margin: '40px auto',
		width: '40vw',
		height: '50vh',
		padding: '20px',
	},
	lock: {
		margin: '20px 0px',
	},
	field: {
		margin: '10px 0',
	},
});

const Login = () => {
	const [userName, setuserName] = useState('');
	const [password, setpassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		if (userName && password) {
			console.log(userName, password);
			setuserName('');
			setpassword('');
		}
	};

	const classes = useStyles();
	return (
		<Grid>
			<Paper className={classes.loginPaper} elevation={10}>
				<Grid container direction="column" alignItems="center" justifyContent="center">
					<Avatar className={classes.lock}>
						<LockOutlined />
					</Avatar>
					<Typography variant="h4" gutterBottom>
						Login
					</Typography>
					<form noValidate autoComplete="off">
						<TextField
							className={classes.field}
							fullWidth
							required
							variant="outlined"
							label="Username"
							type="text"
							value={userName}
							onChange={(e) => {
								setuserName(e.target.value);
							}}
						/>
						<TextField
							className={classes.field}
							fullWidth
							required
							variant="outlined"
							label="Password"
							type="password"
							value={password}
							onChange={(e) => {
								setpassword(e.target.value);
							}}
						/>
						<Button
							className={classes.field}
							fullWidth
							variant="contained"
							color="primary"
							type="submit"
							onClick={(e) => handleSubmit(e)}
						>
							Submit
						</Button>
					</form>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Login;
