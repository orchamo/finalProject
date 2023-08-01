import React from 'react'
import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { getAllCountriesAsync, selectCountries } from "../features/countries/countriesSlice";
import { flightByDestOrigAsync, flightByDestinationAsync, flightByOriginAsync, printDataAsync } from "../features/flight/flightSlice"
import { FormControl, InputLabel, MenuItem, Select, Box, Button, Container, Checkbox, Switch } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';


const SearchFlights = () => {

    const countriesarr = useSelector(selectCountries);

    const [origin, setorigin] = useState("");
    const [destination, setdestination] = useState("");
    const [date, setdate] = useState("");
    const [tickets, settickets] = useState("");
    const dispatch = useDispatch();
    const [oneWay, setoneWay] = useState(false);

    const handleOrigin = (event) => {
        setorigin(event.target.value);
    };

    const handleOneWay = (event) => {
        setoneWay(event.target.checked);
    };

    const handleDestination = (event) => {
        setdestination(event.target.value);
    };

    useEffect(() => {
        console.log(date);
        printDataAsync({date : date})},[date]
    )

    useEffect(() => {
        dispatch(getAllCountriesAsync())
    }, [])
    function searchDetect() {
        console.log(destination);
        console.log(origin);
        if (destination == "" && origin != "") {
            dispatch(flightByOriginAsync({ origin: origin }))
        }
        else if (origin == "" && destination != "") {
            dispatch(flightByDestinationAsync({ destination: destination }))
        }
        else { dispatch(flightByDestOrigAsync({ origin: origin, destination: destination })) }
    };

    return (<div>

        <Container sx={{ bgcolor: '#257DA1', marginTop: '20px', borderRadius: 2, boxShadow: 1, boxSizing: 'border-box', padding: '10px', width: '70%' }}>
            <h4 style={{ textAlign: 'center', paddingBottom: '10px' }}>
                Book your next vecation!
            </h4>
            <FormGroup>
                <FormControlLabel control={<Switch checked={oneWay}
                    onChange={handleOneWay} />} label="One way" />
            </FormGroup>
            <Box sx={{ maxWidth: 280, margin: 'auto' }} >
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">select origin</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={origin}
                        label="destination"
                        onChange={handleOrigin}
                    >   {countriesarr.map((item, i) =>
                        <MenuItem value={item.name} key={i} >{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>
            <br></br>
            {!oneWay && <Box sx={{ maxWidth: 280, margin: 'auto' }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">select destination</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={destination}
                        label="destination"
                        onChange={handleDestination}
                    >   {countriesarr.map((item, i) =>
                        <MenuItem value={item.name} key={i} >{item.name}</MenuItem>)}
                    </Select>
                </FormControl>
            </Box>}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} >
                    <DatePicker sx={{ p: 2, margin: 'auto' }} value={date} onChange={(newdate) => setdate(newdate)} />
                </DemoContainer>
            </LocalizationProvider>
            <Button sx={{ marginLeft: '80%' }} variant='contained' onClick={() => { searchDetect() }}> Search Flights</Button>
        </Container>

        {/* <input type={'date'} onChange={(e) => setdate(e.target.value)}></input> */}
    </div>
    )
}

export default SearchFlights