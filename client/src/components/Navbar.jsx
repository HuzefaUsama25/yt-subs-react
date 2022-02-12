import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Navbar = () => {
	return (
		<AppBar position="sticky" elevation={0}>
			<Toolbar variant="regular">
				<Typography variant="h6" color="inherit" edge={'start'}>
					Sub4Sub
				</Typography>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
