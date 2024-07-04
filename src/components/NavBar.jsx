import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          CosmoChat
        </Typography>
        {isMobile ? (
          <div>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} component={Link} to="/chatui">
                Chat
              </MenuItem>
              <MenuItem onClick={handleClose} component={Link} to="/activity">
                Activity
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <div>
            <Button color="inherit" component={Link} to="/chatui">
              Chat
            </Button>
            <Button color="inherit" component={Link} to="/activity">
              Activity
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
