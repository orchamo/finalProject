import { useEffect, useState } from "react";
import { useDispatch, useSelector, } from "react-redux";
import {getAllCountriesAsync, selectCountries,} from "../features/countries/countriesSlice"

const AllCountires = () =>{
    const countriesarr = useSelector(selectCountries);
    const countriesArr = []
    const dispatch = useDispatch()
    useEffect(()=> {
             dispatch(selectCountries())
         });

    return(
        <div>
            <button onClick={(() => dispatch(getAllCountriesAsync()))}>click here</button>
        </div>
    )

    
    // const countriesArr = useSelector(selectCountries);
    // const dispatch = useDispatch();

    // useEffect(()=> {
    //     dispatch(getAllCountriesAsync())
    // });

    // return (<div>
    //     {countriesArr.map((item, i) =>
    //     <div key = {i}>
    //         name : {item.name}
    //     </div>)}
    // </div>)
}

export default AllCountires