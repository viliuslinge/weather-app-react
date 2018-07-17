import React, { Component } from 'react'
import styles from './City.scss'
import { WEATHER_API_KEY } from '../../utils/ApiKeys'

class City extends Component {
  state = {
    weatherFetched: false
  }

  onCitySelect = () => {
    this.props.history.push(`/city/${this.state.name}`)
  }

  getCurrentWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${WEATHER_API_KEY}`
    if (this.props.currentLocation) {
      const lat = this.props.currentLocation.coords.latitude
      const lon = this.props.currentLocation.coords.longitude
      url = `${url}&lat=${lat}&lon=${lon}`
    } else {
      url = `${url}&q=${this.props.city.label},${this.props.country}`
    }
      
    fetch(url)
      .then(res => {
        return !res.ok ?
          Promise.reject('Could not find weather') :
          res.json()
      })
      .then(res => this.setState({
        weatherFetched: true,
        name: res.name,
        icon: `http://openweathermap.org/img/w/${res.weather[0].icon}.png`,
        temp: res.main.temp,
        wind: res.wind.speed,
        pressure: res.main.pressure,
        description: res.weather[0].description
      }))
      .catch(err => console.log(err))
  }
  
  componentDidMount() {
    this.getCurrentWeather()
  }

  render() {
    return (
      <React.Fragment>
        {
          this.state.weatherFetched &&
          <div
            className={styles.container}
            onClick={this.onCitySelect}>
            <div className={[styles.item, styles.city].join(' ')}>
              <p>{this.state.name}</p>
            </div>

            <div className={styles.item}>
              <img src={this.state.icon} alt=""/>
            </div>

            <div className={styles.item}>
              <p>{this.state.temp}°</p>
            </div>

            <div className={styles.item}>
              <p>{this.state.wind} m/s</p>
            </div>

            <div className={styles.item}>
              <p>{this.state.pressure} hPa</p>
            </div>

            <div className={styles.item}>
              <p>{this.state.description}</p>
            </div>

          </div>
        }
      </React.Fragment>
    )
  }
}

export default City