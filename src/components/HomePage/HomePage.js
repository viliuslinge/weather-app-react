import React, { Component } from 'react'
import SelectCountry from '../Select/SelectCountry'
import SelectCounty from '../Select/SelectCounty'
import CityList from '../CityList/CityList'
import CurrentLocation from '../CurrentLocation/CurrentLocation'
import { COUNTRY_API_KEY } from '../../utils/ApiKeys'
import styles from './HomePage.scss'
import theme from '../../utils/theme.scss'

class App extends Component {

  state = {
    country: '',
    countryList: null,
    county: '',
    countyList: null,
    city: ''
  }

  onInputChange = (e) => {
    this.setState({ city: e.target.value })
  }

  onSearchSubmit = (e) => {
    e.preventDefault()
    this.props.history.push(`/city/${this.state.city}`)
  }

  onDropdownSelect = (e) => {
    const selectorName = e.target.name
    if (selectorName === 'country') {
      this.setState({
        country: e.target.value,
        countryList: null,
        county: '',
        countyList: null,
        city: ''
      }, () => this.getDropdownOptions(selectorName))
    } else if (selectorName === 'county') {
      this.setState({
        county: e.target.value,
        countyList: null,
        city: ''
      }, () => this.getDropdownOptions(selectorName))
    }
  }

  getDropdownOptions = (selectorName) => {
    let url = `https://ezcmd.com/apps/api_ezhigh/get_hierarchy/${COUNTRY_API_KEY}/287?country_code=${this.state.country}`
    url = selectorName === 'country' ?
      `${url}&level=1` :
      `${url}&parent_id=${this.state.county}&level=2`
    const stateName = `${selectorName}List`
    fetch(url)
      .then(res => res.json())
      .catch(err => console.log(err))
      .then(res => this.setState({
        [stateName]: res
      }))
  }

  setLocalStorage = () => {
    localStorage.setItem('searchState', JSON.stringify(this.state))
  }

  getLocalStorage = () => {
    if (localStorage.getItem('searchState') !== null) {
      const searchState = localStorage.getItem('searchState')
      this.setState({ ...JSON.parse(searchState) })
    }
  }

  componentDidMount() {
    this.getLocalStorage()
  }

  componentWillUnmount() {
    this.setLocalStorage()
  }

  render() {
    return (
      <div className={styles.container}>

        <h1 className={styles.title}>Weather App</h1>

        <div className={styles.searchContainer}>
          <form
            className={styles.form}
            onSubmit={this.onSearchSubmit}>
            <input
              className={theme.input}
              type="text"
              placeholder="Enter city name"
              value={this.state.city}
              onChange={this.onInputChange}/>
            <button
              className={[theme.button, styles.button].join(' ')}
              type="submit">
              Search
            </button>
          </form>

          <p className={styles.hintText}>Or choose by Country</p>

          <SelectCountry
            name="country"
            country={this.state.country}
            onDropdownSelect={this.onDropdownSelect}/>

          <SelectCounty
            name="county"
            county={this.state.county}
            counties={this.state.countryList ? this.state.countryList : false}
            onDropdownSelect={this.onDropdownSelect}/>
        </div>

        <div className={styles.resultContainer}>
          {
            !this.state.countyList &&
            <React.Fragment>
              <p>Weather in current location</p>
              <CurrentLocation />       
            </React.Fragment>
          }
          {
            this.state.countyList &&
            <CityList
              {...this.props}
              cities={this.state.countyList}
              country={this.state.country}/>
          }
        </div>

      </div>
    )
  }
}

export default App



