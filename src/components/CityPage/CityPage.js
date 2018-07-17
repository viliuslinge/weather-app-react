import React, { Component } from 'react'
import GoogleMap from '../GoogleMap/GoogleMap'
import TimeList from '../TimeList/TimeList'
import { WEATHER_API_KEY } from '../../utils/ApiKeys' 

class CityPage extends Component {
  state = {
    weather: null
  }

  getFiveDayForecast = () => {
    const city = this.props.match.params.id
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => this.setState({ weather: res }))
  }
  
  componentDidMount() {
    this.getFiveDayForecast()
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.weather &&
          <div>
            <GoogleMap
              icon={this.state.weather.list[0].weather[0].icon}
              temp={this.state.weather.list[0].main.temp}
              lat={this.state.weather.city.coord.lat}
              lon={this.state.weather.city.coord.lon}/>
            <TimeList timeList={this.state.weather.list}/>
          </div>
        }
      </React.Fragment>
    )
  }
}

export default CityPage