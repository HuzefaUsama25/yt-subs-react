import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
	return (
		<AppBar position="static" elevation={0} className="appbar">
			<Toolbar variant="regular">
				<Typography variant="h6" color="inherit" component="div" style={{ flex: 1 }}>
					Sub4Sub
				</Typography>
				<Button color="inherit" component={Link} to="/login">
					Login
				</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
