import axios from "axios"
const api_key = import.meta.env.VITE_API_KEY


const getAll = () => {
    const request = axios.get("https://studies.cs.helsinki.fi/restcountries/api/all")
    return request.then(response => response.data)
}

const getOne = (name) => {
    const request = axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    return request.then(response => response.data)
}


const getWeather = (city) => {
    const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
    return request.then(response => response.data)
}


export default {getAll,getOne,getWeather}