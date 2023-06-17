import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { allFlightsAsync, deleteFlightt, selectFlights, selectFlightstat } from "../features/flight/flightSlice";
import { Box, Button, Card, CardMedia, Container, Grid, CardContent, CardActions, Typography, Alert, AlertTitle } from '@mui/material';
import { bookTicketAsync, deleteTicketAsync } from "../features/tickets/ticketSlice";
import { selectlogin } from "../features/login/loginSlice";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import jwt_decode from "jwt-decode";

const FlightCards = () => {
        const my_token = (jwt_decode(localStorage.getItem("token")))
        const flightarr = useSelector(selectFlights);
        const flightstat = useSelector(selectFlightstat);
        let [loginalert, setloginalert] = useState(false)
        let [delet, setdelet] = useState(true);
        const [open, setOpen] = useState(false);

        const handleClickOpen = () => {
                setOpen(true);
        };

        const handleClose = () => {
                setOpen(false);
        };

        const dispatch = useDispatch();
        useEffect(() => {
                dispatch(allFlightsAsync()); console.log(flightstat)
        }, [delet]);
        const islogged = useSelector(selectlogin)
        return (<div>
                <Grid container rowSpacing={3} sx={{ margin: 'auto' }}>
                        {flightarr.map((item, i) =>
                                <Grid item xs={6}>

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
                                                        {/* {islogged = true ? <Button sx={{margin:"auto",marginBottom:"10px", height : "60px", width:"70%", fontSize : "medium"}}
                                                variant="contained"
                                                onClick={(() => dispatch(bookTickett({ id: item.id }), setdelet(!delet)))}
                                                >Book Flight
                                                </Button>
                                                :  */}
                                                        <Button sx={{ margin: "auto", marginBottom: "10px", height: "60px", width: "70%", fontSize: "medium" }}
                                                                variant="contained"
                                                                onClick={()=>dispatch(bookTicketAsync({user_id : my_token.user_id, id : item.id}))}
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
                                                                {"Not Logged In"}
                                                        </DialogTitle>
                                                        <DialogContent>
                                                                <DialogContentText id="alert-dialog-description">
                                                                        <Alert severity="info">
                                                                                <AlertTitle>In order to book this flight you need to be logged in</AlertTitle>
                                                                                <Link to="/signup" className="btn btn-primary" color={'white'}><strong>click to sign in/register</strong></Link>
                                                                        </Alert>
                                                                </DialogContentText>
                                                        </DialogContent>
                                                        <DialogActions>
                                                                <Button onClick={handleClose}>Close</Button>
                                                        </DialogActions>
                                                </Dialog>

                                        </Card>

                                </Grid>)}
                </Grid>
                {/* <Container sx={{marginTop : '15px', alignItems : 'center' , boxSizing: 'border-box', width: '80%'}}>
                        <Button  variant="contained" color="inherit" onClick={() => setdelet(!delet) } > Show all flights </Button>
                        
                        

                        <Grid >
                                {flightarr.map((item, i) =>
                                        <div key={i}>
                                                <Card elevation={3} sx={{maxWidth : '250px', marginTop : '15px'}}>
                                                        <CardMedia component='img' image="https://picsum.photos/200" height='100' width='100' ></CardMedia>
                                                        origin : {item.origin_country}
                                                        <br></br>
                                                        destination:{item.destination_country}
                                                        <br></br>
                                                        price:{item.price}
                                                        <br></br>
                                                        tickets:{item.remaining_tickets}
                                                        <br></br>
                                                        <Button variant="contained" onClick={(() => dispatch(bookTickett({ id: item.id }), setdelet(!delet)))}>Book Flight</Button>
                                                        <Button variant="contained" color="error" onClick={(() => dispatch(deleteTickett({ id: item.id }), setdelet(!delet)))}>delete ticket</Button>

                                                        <Button variant="contained" color="error" onClick={(() => dispatch(deleteFlightt({ id: item.id }), setdelet(!delet)))}>Delete Flight</Button>

                                                </Card>
                                                
                                        </div>)}


                        </Grid>
                        
                </Container> */}
        </div>
        )
}
export default FlightCards