import { Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Alert from '@material-ui/lab/Alert';
import { Link, useNavigate } from 'react-router-dom';

import { useState } from 'react';

const useStyles = makeStyles({
	loginPaper: {
		margin: '40px auto',
		height: 'fit-content',
		padding: '20px',
	},
	page: {
		margin: '0px auto',
	},
	field: {
		margin: '10px 0',
	},
});

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);
	const [jwt, setJwt] = useState('');
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = {
			email: email,
			password: password,
		};

		setEmail('');
		setPassword('');
		setErrors('');

		const response = await fetch('http://localhost:5000/api/auth', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		});
		const result = await response.json();

		if ('errors' in result) {
			setErrors(result.errors);
		} else {
			setJwt(result.token);
			console.log(jwt);
			navigate('/', { state: { token: result.token } });
		}
	};

	const classes = useStyles();
	return (
		<Grid item xs={9} sm={7} md={4} lg={5} className={classes.page}>
			<Paper className={classes.loginPaper} elevation={10}>
				<Grid container direction="column" alignItems="center" justifyContent="center">
					<Typography variant="h4" gutterBottom>
						Login
					</Typography>

					<form noValidate autoComplete="off">
						{errors ? (
							errors.map((error, index) => {
								return (
									<Alert
										severity="error"
										variant="filled"
										fullwidth="true"
										key={index}
									>
										{error.msg}
									</Alert>
								);
							})
						) : (
							<></>
						)}
						<TextField
							className={classes.field}
							fullWidth
							required
							variant="outlined"
							label="Email"
							type="text"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
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
								setPassword(e.target.value);
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
					<Typography color="textSecondary">OR</Typography>
					<Button
						className={classes.field}
						fullWidth
						variant="outlined"
						color="primary"
						component={Link}
						to="/register"
					>
						Create New Account
					</Button>
				</Grid>
			</Paper>
		</Grid>
	);
};

export default Login;
