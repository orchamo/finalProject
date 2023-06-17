import axios from 'axios'

const COUNTRIES_SERVER = 'http://127.0.0.1:8000/'


export function getAllCountries(){
    return new Promise((resolve) =>
    axios(COUNTRIES_SERVER+ "allcountries/")
    .then((res) => resolve({data: res.data}, console.log(res.data)))
    )
}

export function getOneCounry(id){
    return new Promise((resolve) =>
    axios(COUNTRIES_SERVER+ 'onecountry/' + id).then((res) => resolve({data: res.data}))
    )
}

