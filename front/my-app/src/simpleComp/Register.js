import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAsync } from '../features/register/registerSlice';
import {  Link, Grid, Avatar, Typography, CssBaseline, MenuItem,  Box, Button, Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
const defaultTheme = createTheme();

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [pwd, setpwd] = useState("")
    const [usertype, setusertype] = useState("")
    const dispatch = useDispatch()
    const [companyname, setcompanyname] = useState("")
    const [firstname, setfirstname] = useState("")
    const handleUserType = (event) => {
        setusertype(event.target.value)
        console.log(usertype)
    }
    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" noValidate sx={{ mt: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    autoFocus
                                    value={username}
                                    onChange={(e) => { setusername(e.target.value) }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={pwd}
                                    onChange={(e) => { setpwd(e.target.value) }}
                                />

                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={(e) => { setemail(e.target.value) }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField select
                                    value={usertype}
                                    label={"User Type"}
                                    id="user-type-select"
                                    onChange={handleUserType}
                                    fullWidth
                                    variant="outlined"
                                    required
                                >
                                    <MenuItem value="Customer" key="Customer" >Customer</MenuItem>
                                    <MenuItem value="Aviation" key="Aviation Company" >Aviation Company</MenuItem>
                                </TextField>


                            </Grid>
                            <Grid item xs={12} sm={6}>
                                {(usertype == "Aviation") ? <TextField required id="companyname" label="company name" variant="outlined" value={firstname} onChange={(e) => { setfirstname(e.target.value) }} />
                                    : (usertype == "Customer") ? <TextField required id="firstname" label="first name" variant="outlined" value={firstname} onChange={(e) => { setfirstname(e.target.value) }} />
                                        : undefined}
                            </Grid>
                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={(e) => dispatch(registerAsync({ username: username, email: email, pwd: pwd, role: usertype, firstname: firstname }, e.preventDefault()))}
                            >
                                Sign up
                            </Button>
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                            
                        </Grid>
                    </Box>
                </Box>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    

                </Box>
            </Container>
        </ThemeProvider >
    );
}
export default Register