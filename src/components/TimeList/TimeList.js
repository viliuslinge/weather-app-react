import React from 'react'

const TimeList = ({ timeList }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Temperature</th>
            <th>Wind</th>
            <th>Pressure</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {
            timeList.map((time, index) => {
              if ((/00:00:00$/).test(time.dt_txt)) {
                return (
                  <tr key={index}>
                    <td>{(time.dt_txt).replace(/.{8}$/, '')}</td>
                  </tr>
                )
              }
              return (
                <tr key={index}>
                  <td>{(time.dt_txt).replace(/^.{10}/, '')}</td>
                  <td>{Math.round(time.main.temp)}°</td>
                  <td>{Math.round(time.wind.speed)} m/s</td>
                  <td>{time.main.pressure} hPa</td>
                  <td>{time.weather[0].description}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default TimeList