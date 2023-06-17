import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { Box, Button, Card, CardMedia, Container, Grid, CardContent, CardActions, Typography, Alert, AlertTitle } from '@mui/material';
import { bookTicketAsync, customerTicketsAsync, deleteTicketAsync, selectTickets } from "../features/tickets/ticketSlice";
import { selectlogin } from "../features/login/loginSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import jwtDecode from "jwt-decode";
import { flightsByUserAsync, selectFlights } from "../features/flight/flightSlice";

const MyFlights = () => {
    const dispatch = useDispatch()
    const flightsarr = useSelector(selectFlights);
    const [open, setOpen] = useState(false);
    const [delet, setdelet] = useState(true);
    const my_token = jwtDecode(localStorage.getItem("token"))
    const handleClickOpen = () => {
        setOpen(true);
    };
    console.log(my_token.user_id)
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => { dispatch(flightsByUserAsync(my_token.user_id)) }, [delet]

    )
    return (
        <div>
            these are all of your booked flights

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
                                onClick={() => dispatch(deleteTicketAsync({ user_id: my_token.user_id, id: item.id }))}
                            >Book Flight
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

export default MyFlights