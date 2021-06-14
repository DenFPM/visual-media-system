import React from 'react';

const TableOfMarkersElement = ({technologie, country, startYear,endingYear,city, coord})=>{
   return(
       <tr>
            <td>{country}</td>
            <td>{technologie}</td>
            <td>{startYear}</td>
            <td>{endingYear}</td>
            <td>{city}</td>
            <td>{(coord[0]).toFixed(2)}</td>
            <td>{(coord[1]).toFixed(2)}</td>
       </tr>
   );
}
export default TableOfMarkersElement;