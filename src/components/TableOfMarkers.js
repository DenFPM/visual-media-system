import React, {useEffect} from 'react';
import TableOfMarkersElement from "./TableOfMarkersElement"

const TableOfMarkers = ({markers,country})=>{
    return(
          <table className="table">
              <thead className="table-head">
              <tr>
                  <th>Країна</th>
                  <th>Технологiя</th>
                  <th>Рiк початку</th>
                  <th>Рiк закiнчення</th>
                  <th>Мiсто</th>
                  <th>Широта</th>
                  <th>Довгота</th>
              </tr>
              </thead>
              <tbody className="table-body">
              {
                markers.map(({ID,town,years,lat,lng})=><TableOfMarkersElement key={ID} country={country} startYear={years[0]} endingYear={years[1]} city={town} coord={[lat,lng]}/>)
              }
              </tbody>
          </table>
    )
}
export default TableOfMarkers;