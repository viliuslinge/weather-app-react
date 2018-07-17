import React from 'react'
import City from '../City/City'

const CityList = (props) => (
  <div>
    {
      Object.values(props.cities).map((city, index) => {
        if (typeof city !== 'object') {
          return null
        }
        return (
          <City
            key={index}
            city={city}
            country={props.country}
            history={props.history}/>
        )
      })
    }
  </div>
)

export default CityList