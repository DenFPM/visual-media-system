import SelectCountry from './components/SelectCountry';
import InputYear from './components/InputYear';
import Map  from "./components/Map";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TableOfMarkers from "./components/TableOfMarkers"
import './assets/style.scss'

function App() {
  const [countries, setCountries] = useState([])
  const [currentCountry,setCurrentCountry] = useState("")
  const [markers, setMarkers] = useState([]);

  const getMarkers = async (country) => axios.get(`http://localhost:3001/api/markers/${country}`)
  const getCountries = async () => axios.get(`http://localhost:3001/api/countries`)
  const handleOnSelectCountry = (countryName)=> setCurrentCountry(countryName);
  const randomId =  () =>'_' + Math.random().toString(36).substr(2, 9);

  useEffect(()=>{
    (async () => {
      try{
        const {data: countriesData} = await getCountries()
        let tempArr =[]
        let countryNames = [];
        countriesData.forEach(element => {
          if(!countryNames.includes(element.name)){
            countryNames.push(element.name)
            tempArr.push({id:randomId(),name:element.name});
          }
        });
        const {data: markersData} = await getMarkers(tempArr[0].name)
        setMarkers(markersData)

        setCurrentCountry(tempArr[0].name)
        setCountries(tempArr);
      }
      catch(e){
        console.log("some error: ", e)
      }
    })()
  },[])

    return (
      <div className="container">
        <SelectCountry currentCountry={currentCountry} countries = {countries} handleOnSelectCountry={handleOnSelectCountry}/>
        <InputYear currentCountry={currentCountry}/>
        <Map currentCountry={currentCountry}/>
        <TableOfMarkers markers ={markers} country={currentCountry}/>
      </div>
    );
}

export default App;
