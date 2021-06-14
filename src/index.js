import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../src/assets/reset.css'
import reportWebVitals from './reportWebVitals';
import SelectCountry from './components/SelectCountry';
import InputYear from './components/InputYear';
import App  from "./App";
import axios from 'axios';

// function getCountries(){
//   return axios.get("http://localhost:3001/api/countries");
// }

// function getMarkersByCountry(country){
//   return axios.get("http://localhost:3001/api/markers/"+country);
// }

// function getYearsByCountry(country){
//   return axios.get("http://localhost:3001/api/years/"+country);
// }

// getCountries().then(res => {
//   console.log(res.data[0].coords);
//   changeCoords(res.data[0].coords, 5);
// })

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('main')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
