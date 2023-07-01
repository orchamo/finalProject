import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { flightsByCompanyAsync, selectFlights } from '../features/flight/flightSlice'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import jwtDecode from "jwt-decode";
import { Button, Card, CardMedia,  Grid, CardContent, CardActions, Typography, Alert, AlertTitle } from '@mui/material';
import { deleteFlightAsync } from '../features/flight/flightSlice';
const CompanyFlights = () => {
    const dispatch = useDispatch()
    const flightsarr = useSelector(selectFlights)
    const my_token = jwtDecode(localStorage.getItem("token"))
    const [render,setrender] = useState(true)
    const [open, setOpen] = useState(false);
    useEffect(()=> {dispatch(flightsByCompanyAsync(my_token.user_id))}, [render])
    const handleClose = () => {
        setOpen(false);
    };
  return (
    <div>
        <h1>these are all your companies flights</h1>
        {flightsarr.map((item, i) =>
                <Grid item xs={6} key={i}>

                    <Card key={i} sx={{ width: '80%', margin: 'auto', boxSizing: 'border-box', borderRadius: 2 }}>
                        <CardMedia
                            sx={{ height: 140 }}
                            image="https://picsum.photos/200"
                            title="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                origin : {item.origin_country}
                                <br></br>
                                destination:{item.destination_country}
                                <br></br>
                                price:{item.price}
                                <br></br>
                                tickets:{item.remaining_tickets}
                                <br></br>
                            </Typography>

                        </CardContent>
                        <CardActions>

                            <Button sx={{ margin: "auto", marginBottom: "10px", height: "60px", width: "70%", fontSize: "medium" }}
                                variant="contained"
                                onClick={async (e) => {
                                    e.preventDefault()
                                    await dispatch(deleteFlightAsync(
                                    { id: item.id }));
                                    setrender(!render);
                                    console.log(render)}}
                            >Cancel flight
                            </Button>

                            {/* } */}
                        </CardActions>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    <Alert severity="info">
                                        <AlertTitle>Info</AlertTitle>
                                        In order to book this flight you need to be logged in
                                        <Link to="/signup" className="btn btn-primary" color={'secondary'}><strong>click to sign in/register</strong></Link>
                                    </Alert>
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={handleClose} autoFocus>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </Card>

                </Grid>)}

    </div>
  )
}

export default CompanyFlights