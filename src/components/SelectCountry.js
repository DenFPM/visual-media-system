import React from 'react'
import dropDownIcon from '../assets/image/dropdown-icon.svg';
import SelectCityElement from "./SelectCityElement"

function SelectCountry ({countries,handleOnSelectCountry, currentCountry}){
    return (
        <div className="dropdown-cities">
            <select id="cities" onChange={(e)=>{(handleOnSelectCountry(e.target.value))}} >
                {
                    countries.map(({id,name})=><SelectCityElement  key={id}  name={name} />)
                }
            </select>
            <img src={dropDownIcon} alt="" className="dropdown-cities-icon"/>
        </div>
    )
}
export default SelectCountry;