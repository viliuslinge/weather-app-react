import React from 'react'
import theme from '../../utils/theme.scss'

const SelectCounty = (props) => (
  <select
    disabled={!props.counties}
    className={[theme.input, theme.select].join(' ')}
    name={props.name}
    value={props.county}
    onChange={props.onDropdownSelect}>

    <option
      hidden
      value=''>
      Select region
    </option>
    
    {
      Object.values(props.counties).map(county => {
        if (typeof county !== 'object') {
          return null
        }
        return (
          <option
            key={county.value}
            value={county.value}>
            {county.label}
          </option>
        )
      })
    }

  </select>
)

export default SelectCounty