import React, {useState,useEffect} from 'react';
import { FormControl,Select,MenuItem } from '@material-ui/core';
import './App.css';

//"https://disease.sh/v3/covid-19/countries"

function App() {


  const [Countries, setCountries] =useState(["sri lanka", "UK", "India"]);

  const [country,setCountry] = useState("worldwide");


  useEffect(() => {

    const getCountiesData = async()=>{
      await fetch ("https://disease.sh/v3/covid-19/countries").then((response)=> response.json()).then((data)=>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2,
          }));
          setCountries(countries);
      });
    };

    getCountiesData();
    
  }, [Countries])

  const onCountryChange = (event)=>{
    const countryCode = event.target.value;
    console.log("YOOOO>>>",countryCode);
    setCountry(countryCode);

  }

  return (
    <div className="App">
      <div className="app__header">
         <h1>COVID-19 TRACKER</h1>

       <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
            <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                Countries.map(country=>(
                  <MenuItem value={country.name}>{country.name}</MenuItem>
                ))
              }

          {/*<MenuItem value="worldwide">Worldwide</MenuItem>
            <MenuItem value="worldwide">Option two</MenuItem>
            <MenuItem value="worldwide">Option three</MenuItem>
            <MenuItem value="worldwide">Option four</MenuItem>*/}
          </Select>  

        </FormControl> 
      </div>

      {/*Header */}
      {/*Title + select input dropdown field */}
      {/* InfoBoxes */}
      {/*InfoBoxes*/}
      {/*InfoBoxes*/}

      {/*Table*/}
      {/*Graph*/}
      {/*Map*/}
    </div>
  );
}

export default App;
