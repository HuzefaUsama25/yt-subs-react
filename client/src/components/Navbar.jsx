import { AppBar, Toolbar, Typography, Button, Box, IconButton, Accordion } from '@material-ui/core';

const Navbar = () => {
	return (
		<AppBar position="static" elevation={0} className="appbar">
			<Toolbar variant="regular">
				<IconButton
					size="large"
					edge="start"
					color="inherit"
					aria-label="menu"
					sx={{ mr: 2 }}
				></IconButton>
				<Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
					Sub4Sub
				</Typography>
				<Button color="inherit">Login</Button>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
