import React, {useState,useEffect} from 'react';
import { FormControl,Select,MenuItem,Card, CardContent } from '@material-ui/core';
import './App.css';

import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import {sortData}  from './utill';
import LineGraph from './LineGraph';


//"https://disease.sh/v3/covid-19/countries"

function App() {


  const [Countries, setCountries] =useState(["sri lanka", "UK", "India"]);

  const [country,setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect( ()=>{
    fetch("https://disease.sh/v3/covid-19/all").then((response) => response.json()).then((data)=>{
      setCountryInfo(data);
    });
  },[]);


  useEffect(() => {

    const getCountiesData = async()=>{
      await fetch ("https://disease.sh/v3/covid-19/countries").then((response)=> response.json()).then((data)=>{
        const countries = data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2,
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          
          setCountries(countries);
      });
    };

    getCountiesData();
    
  }, []);

  const onCountryChange = async (event)=>{
    const countryCode = event.target.value;
    
    setCountry(countryCode);

    const url = countryCode==='worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    console.log("URL>>>>>>>>>>>>>>>>>>>>",url);

    await fetch(url).then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
};

console.log("here the data object",tableData);
console.log("country:",countryInfo);

  return (
    <div className="App">
      <div className="app__left">
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

            
            </Select>  

          </FormControl> 
        </div>

        <div className="app_stats">
          
          <InfoBox titile="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox titile="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox titile="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>


        </div>
        {/*Map*/}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
              <h3>Live cases by country</h3>
              <Table countires={tableData}/>
              <h3>World wide new cases </h3>
              <LineGraph />

        </CardContent>
        
      </Card>  
    </div>
  );
}

export default App;
