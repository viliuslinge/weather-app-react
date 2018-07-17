import React, { Component } from 'react'

const google = window.google

class GoogleMap extends Component {

  generateMap = () => {
    const coords = {
      lat: this.props.lat + 0.005,
      lng: this.props.lon
    }
    const map = new google.maps.Map(this.refs.map, {
      zoom: 12,
      center: coords
    })
    new google.maps.Marker({
      position: coords,
      label: {
        text: String(Math.round(this.props.temp)),
        fontWeight: 'bold',
        fontSize: '35px',
        color: 'black'
      },
      icon: {
        url: `http://openweathermap.org/img/w/${this.props.icon}.png`,
        anchor: new google.maps.Point(60, 40),
        scaledSize: new google.maps.Size(60, 60),
        labelOrigin: new google.maps.Point(90, 28)
      },
      map: map
    });
  }

  componentDidMount() {
    this.generateMap()
  }

  render() {
    return (
      <div
        ref="map"
        style={{
          height: '300px',
          width: '600px'
        }} />
    )
  }
}

export default GoogleMap