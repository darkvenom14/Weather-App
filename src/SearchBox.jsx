import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

export default function SearchBox({ updateInfo }){
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);
    
    const API_URL = "https://api.openweathermap.org/data/2.5/weather";
    const API_KEY = "77303874dc65b755c0af4874f8ef22df";

    let getWeatherInfo = async () =>{
        try{

            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let result = {
                city : city,
                temp : jsonResponse.main.temp_min,
                tempMin : jsonResponse.main.temp_min,
                tempMax : jsonResponse.main.temp_min,
                humidity : jsonResponse.main.humidity,
                feelsLike : jsonResponse.main.feels_like,
                weather : jsonResponse.weather[0].description,
            };
            console.log( result );
            return result
        } catch(err) {
            throw err;
        }
    }


    let handleChange = (evt) =>{
       setCity(evt.target.value); 
    };

    let handleSubmit = async (evt) => {
        try{
            evt.preventDefault();
            console.log(city);
            setCity("");
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo); 
        } catch(err){
            setError(true);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
               <TextField id="city" label=" City Name" variant="standard" required value={city} onChange={handleChange}/>
               <br /><br />
               <Button variant='contained' type='submit' color="secondary">Search</Button>
               { error && <p style={{color: "red"}}>No such place exists!</p>}
               {/* { !error && setError(true)} */}
            </form>
        </div>
    )
}