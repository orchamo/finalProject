import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from 'react-router-dom';
import {selectlogin} from "../features/login/loginSlice"
import { useDispatch, useSelector } from "react-redux";
import { Icon } from '@mui/material';

const pages = ['Flights', 'about'];

const BaseNav = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const dispatch = useDispatch()
  const loginStatus = useSelector(selectlogin);
  
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    // <div>
      
    //   <nav className="navbar navbar-expand-lg navbar-light bg-dark">
    //     <div className="container-fluid">
    //       <script className="nav-link active"><Link to={'/'}>Home page ||  </Link></script>
    //       <script className="nav-link active"><Link to={'/about'}>About us ||  </Link></script>
    //       <script className="nav-link"><Link to={'/flights'}>Search flights ||  </Link></script>
    //       {(loginStatus == false) &&
    //       <script className="nav-link"><Link to={'/login'}>Login ||  </Link></script>}
          
    //       {(loginStatus == false) &&
    //       <script className="nav-link"><Link to={'/register'}>Register ||  </Link></script>}
                    
    //       <script className="nav-link"><Link to={'/addflight'}>AddFlight ||  </Link></script>
    //       {userType == 2 && <script className="nav-link"><Link to={'/counter'}>Counter ||  </Link></script>}
          
    //     </div>
    //   </nav>
      
    // </div>
    <AppBar position="static">
    <Container maxWidth="xl">
      <Toolbar disableGutters>
        <Icon>
          <img src={require('../projectPics/easyflights-white.png')}></img>
        </Icon>
        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography> */}

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center" component={Link}
                sx={{ textDecoration: 'none' }}
                to = {`/${(page).toLowerCase()}`} >
                  {page}
                </Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          LOGO
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              <Link style={{textDecoration:'none', color: 'white'}} 
              to= {`/${(page).toLowerCase()}`}>{page}
              </Link>
            </Button>
          ))}
        </Box>

        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          ><MenuItem>
            <Typography textAlign="center" component={Link} to = "/signin"
             sx = {{ textDecoration: 'none'}}
             >Sign in
              </Typography>
            </MenuItem>
            <MenuItem>
            <Typography textAlign="center" component={Link} to = "/register"
             sx = {{ textDecoration: 'none'}}
             >Register
              </Typography>
              </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);
}
  


export default BaseNav