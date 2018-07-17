import React from 'react'
import { CountryList } from '../../utils/CountryList'
import theme from '../../utils/theme.scss'

const SelectCountry = (props) => (
  <select
    className={[theme.input, theme.select].join(' ')}
    name={props.name}
    value={props.country}
    onChange={props.onDropdownSelect}>
    {
      CountryList.map(country => {
        return (
          <option
            hidden={country.symbol === ''}
            key={country.symbol}
            value={country.symbol}>
            {country.name}
          </option>
        )
      })
    }
  </select>
)

export default SelectCountry