import React from 'react'

const SelectCityElement = ({name})=>{
    
    return(
        <option value={name} className="cities-option">{name}</option>
    )
}
export default SelectCityElement;