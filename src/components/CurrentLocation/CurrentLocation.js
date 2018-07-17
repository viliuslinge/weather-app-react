import React, { Component } from 'react'
import City from '../City/City'

class CurrentLocation extends Component {

  state = {
    currentLocation: null,
    message: null
  }

  success = (position) => {
    this.setState({
      currentLocation: position
    })
  }

  error = (positionError) => {
    this.setState({ message: positionError.message })
    console.log(positionError)
  }

  getCurrentLocation = () => {
    if (navigator.geolocation) {
      return navigator.geolocation.getCurrentPosition(this.success, this.error)
    } else {
      this.setState({ message: 'Geolocation is not supported by this browser' })
    }
  }

  componentDidMount() {
    this.getCurrentLocation()
  }

  render() {
    return (
      <div>
        {
          this.state.message &&
          <p>{this.state.message}</p>
        }
        {
          this.state.currentLocation &&
          <City currentLocation={this.state.currentLocation}/>
        }
      </div>
    )
  }
}

export default CurrentLocation