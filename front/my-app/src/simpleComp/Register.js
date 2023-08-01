import * as React from 'react';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { assignAviationAsync, assignCustomerAsync, registerAsync } from '../features/register/registerSlice';
import { Link, Grid, Avatar, Typography, CssBaseline, MenuItem, Box, Button, Container, ThemeProvider } from '@mui/material';
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
    const [lastname, setlastname] = useState("")
    const [adress, setadress] = useState("")
    const [phonenum, setphonenum] = useState("")
    const [creditcardnum, setcreditcardnum] = useState("")
    const [countryname, setcountryname] = useState("")
    const handleUserType = (event) => {
        setusertype(event.target.value)
        console.log(usertype)
    }
    const handleRegistration = async (event) => {
        if (usertype == "Aviation") {
            await dispatch(registerAsync({
                username: username,
                email: email,
                pwd: pwd,
                role: usertype,
                firstname: firstname
            }));
            dispatch(assignAviationAsync({
                companyname: companyname,
                country: countryname,
                username: username
            }
            ))
        }
        else if (usertype == "Customer") {
            await dispatch(registerAsync({
                username: username,
                email: email,
                pwd: pwd,
                role: usertype,
                firstname: firstname
            }));

            dispatch(assignCustomerAsync({
                username: username,
                firstname: firstname,
                lastname: lastname,
                adress: adress,
                phone: phonenum,
                credit: creditcardnum
            }))

        }
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

                            {(usertype == "Aviation") ?
                                <Grid container item spacing={2} >
                                    <Grid item xs={6}><TextField required id="companyname" label="company name" variant="outlined" value={firstname} onChange={(e) => { setcompanyname(e.target.value) }} /></Grid>
                                    <Grid item xs={6}><TextField required id="countryname" label="country name" variant="outlined" value={countryname} onChange={(e) => { setcountryname(e.target.value) }} /></Grid>
                                </Grid>
                                : (usertype == "Customer") ?
                                    <Grid container item spacing={2} >
                                        <Grid item xs={6}> <TextField required id="firstname" label="first name" variant="outlined" value={firstname} onChange={(e) => { setfirstname(e.target.value) }} /> </Grid>
                                        <Grid item xs={6}> <TextField required id="lastname" label="last name" variant="outlined" value={lastname} onChange={(e) => { setlastname(e.target.value) }} /> </Grid>
                                        <Grid item xs={6}> <TextField required id="adress" label="adress" variant="outlined" value={adress} onChange={(e) => { setadress(e.target.value) }} /> </Grid>
                                        <Grid item xs={6}> <TextField required id="phonenum" label="phone num" variant="outlined" value={phonenum} onChange={(e) => { setphonenum(e.target.value) }} /> </Grid>
                                        <Grid item xs={6}> <TextField required id="creditcardnum" label="credit card num" variant="outlined" value={creditcardnum} onChange={(e) => { setcreditcardnum(e.target.value) }} /></Grid>
                                    </Grid>
                                    : undefined}


                        </Grid>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={(e) => dispatch(handleRegistration)}
                        >
                            Sign up
                        </Button>
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