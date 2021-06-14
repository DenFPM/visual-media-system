import React, { useEffect, useState } from 'react';
import * as L from 'leaflet';
import axios from 'axios';

let mymap;

const getMarker = async(targetCountry)=>{
	const {data} = await axios.get("http://localhost:3001/api/countries")
	let arrayCoords =[]
	data.forEach(element => arrayCoords.push(element.coords));
	if(targetCountry===undefined)
	{
		arrayCoords.forEach(element=>{
			L.marker(element).addTo(mymap)
		})
	}
	if(targetCountry!==undefined&&targetCountry.currentCountry!==""&&data[0].name!==targetCountry.currentCountry){
		//вставить логику на смену страны
	}
		
}
const renderMap =()=>{//вынес так как может пригодится ререндеринг для смены страны
	mymap = L.map('mapid').setView([5, 4], 2);
		L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2VybWFuMjAwMCIsImEiOiJja3BtdWJ4azQwOXVvMnZtd2F1MDZjcHd0In0.22JkAUl18uakPlq1VsXUfw', {
		maxZoom: 14,
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoiZ2VybWFuMjAwMCIsImEiOiJja3BtdWJ4azQwOXVvMnZtd2F1MDZjcHd0In0.22JkAUl18uakPlq1VsXUfw'
	}).addTo(mymap);
}
function Map(currentCountry){
	useEffect(() => {
		getMarker(currentCountry);
	}, [currentCountry]);

	useEffect(async() => {
		if(mymap===undefined){
			renderMap()
		}
		getMarker();
	},[])

    return(
        <div id="mapid" style={{ marginTop: "58px" }}/>
    )
}

export default Map;