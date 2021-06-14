import React from 'react';
import { Range } from "react-range";
import { useState,useRef,useEffect } from "react";
import prevYearsIcon from '../assets/image/prev_year.svg';
import axios from 'axios';

const InputYear = (currentCountry) => {
    const prevYearBtn = useRef(null);
    const [maxRange, setMaxRange] = useState([4000]);
    const [minRange, setMinRange] = useState([0]);
    const [rangeValue, setRangeValue] = useState([new Date().getFullYear()]);
    const [dataFromRequest, setDataFromRequest] = useState([])

    const handleRangeController = (side) =>{
      try{
        
      if (
        (side === "left" && rangeValue[0] - 1 < minRange) ||
        (side === "right" && rangeValue[0] + 1 > maxRange)
      )
        return null;
        if(side==="left"){

        }
      side === "left"
      ? setRangeValue((prevRangeValue) => [dataFromRequest.find(element=>element<rangeValue)])
      : setRangeValue( (prevRangeValue) => [dataFromRequest.find(element=>element>rangeValue)] );
      console.log(rangeValue)
      }
      catch(e){
        console.log(e)
      }
    }

    // const getClosestNumber=(number)=>{
    //   let resultArr =[];
    //   let closestRight,closestLeft;
    //   let current;
    //   for (var i = 0; i < dataFromRequest.length; i++) {
    //     current = dataFromRequest[i];
    //     if (current < number && (typeof resultArr === 'undefined' || closestLeft < current)) {
    //       closestLeft = current;
    //     } else if (current > number && (typeof closestRight === 'undefined' || closestRight > current)) {
    //       closestRight = current;
    //     }
    //   }
    //   resultArr.push(closestLeft);
    //   resultArr.push(closestRight);
    //   return resultArr;
    // }

    useEffect(()=>{
      (async () => {
        const {data} = await axios.get(`http://localhost:3001/api/years/${currentCountry}}`)
        setDataFromRequest(data);
        setMinRange(data[0])
        setMaxRange(data[data.length-1])
      })()
    },[currentCountry])
        
    return (
        <div style={{
            width: '100%',
            display: "flex",
            justifyContent:"space-between",
            marginTop: "58px",
            position: "relative"
        }}>
            <button onClick={(e) => handleRangeController("left")} ref={prevYearBtn} id="prev-year-btn" style={{background:"transparent",border:"none",outline:"none"}}><img src={prevYearsIcon} alt=""style={{height:"20px",width:"20px"}}/></button>
            <Range
          step={1}
          min={minRange}
          max={maxRange}
          values={rangeValue}
          onChange={(values) =>setRangeValue(values)}
          renderTrack={({ props, children }) => (
            <div
            {...props}
            style={{
              ...props.style,
              height: '64px',
              width: '100%',
              backgroundColor: '#ccc',
              borderRadius:"30px",
              margin:"0px 80px"
            }}
          >
              {children}
            </div>
          )}
            
        renderThumb={({ props }) => (
          <div
          {...props}
            style={{
                ...props.style,
              height: '128px',
              width: '128px',
              fontSize:"48px",
              backgroundColor: '#999',
              display: "flex",
              justifyContent: "center",
              alignItems:'center',
              borderRadius:"50%",
              outline:"none",
              PointerEvent:"none"
            }}
          >
              
        {rangeValue}</div>
        )}
      />
      <button onClick={(e) => handleRangeController("right")} style={{background:"transparent",border:"none",outline:"none"}}><img src={prevYearsIcon} alt=""style={{height:"20px",width:"20px",transform:"rotate(180deg"}}/></button>
        </div>
      
    );
  
}
export default InputYear;