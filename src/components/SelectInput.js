import React, {memo, useState } from 'react';
import Select from 'react-select';
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const SelectInput = ({myStyle, style2, style3, placeholder, options, defaultValue, setValue, setVar, keyPayload, invalidFields, setInvalidFields, path}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const navigate = useNavigate()
  const [paramsSeach] = useSearchParams()
  let entries = paramsSeach.entries()
  const append = (entries, value) => {
    let params = []
    paramsSeach.append('sort', value)
    for (let entry of entries) {
        params.push(entry);
    }
    let searchParamsObject = {}
    params?.map(i => {searchParamsObject = {...searchParamsObject, [i[0]]: i[1]}})
    return searchParamsObject
  }
  return (
    <>
      <Select
          styles={ style2?
            { control: (baseStyles, state) => ({
              ...baseStyles,
              cursor: 'pointer',
              borderColor: state.isFocused ? '#0AECB4' : 'grey',
              fontSize: '14px',
              minHeight: '30px',
              ':hover': {
                borderColor: state.isFocused ? '#0AECB4' : 'grey',
              },
              }),
              option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#363837' : 'transparent',
                color: state.isFocused ? 'white' : '#363837', // Change text color on hover
                ':hover': {
                  backgroundColor: '#363837', // Change hover color
                  color: 'white', // Change text color on hover
                },
              }),
              input: (provided, state) => ({
                ...provided,
                margin: '0',
                padding: '0', 
              }),
              dropdownIndicator: (provided, state) => ({ // Adjust the arrow
                ...provided,
                padding: '0px 4px', 
                width: '22px', 
                height: '20px',
              }),
              placeholder: (provided) => ({
                ...provided,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }),
            } 
          : 
          style3? {
            control: (baseStyles, state) => ({
              ...baseStyles,
              cursor: 'pointer',
              backgroundColor: '#FF8900',
              borderColor: state.isFocused ? 'black' : '',
              borderWidth: state.isFocused ? '2px' : '0px',
              boxShadow: 'none',
              fontWeight: 600,
              minHeight: '30px',
              ':hover': {
                borderColor: state.isFocused ? 'black' : '',
              },
            }),
            option: (provided, state) => ({
              ...provided,
              fontSize: '14px',
              backgroundColor: state.isFocused ? '#363837' : 'transparent',
              color: state.isFocused ? 'white' : '#363837', // Change text color on hover
              ':hover': {
                backgroundColor: '#363837', // Change hover color
                color: 'white', // Change text color on hover
              },
            }),
            input: (provided, state) => ({
              ...provided,
              margin: '0',
            }),
            dropdownIndicator: (provided, state) => ({ // Adjust the arrow
              ...provided,
              padding: '0px 4px', 
              width: '22px', 
              height: '20px',
              color: 'white'
            }),
            indicatorSeparator: (provided, state) => ({ // Adjust the arrow
              ...provided,
              backgroundColor: 'white'
            }),
            singleValue: (provided, state) => ({
              ...provided,
              color: 'white',
              fontWeight: 600,
              fontSize: '15px'
            }),
            placeholder: (provided) => ({
              ...provided,
              color: 'white', // Set the color for the default text
            }),
          }
          : {}
          }
          className={`cursor-pointer ${myStyle}`}
          defaultValue={selectedOption}
          value={selectedOption}
          onChange={(e) => {
            setSelectedOption(e);
            setValue && setValue(prev => ({...prev, [keyPayload]: e.value}))
            setVar && setVar(e.value)
            path && navigate({
                pathname: path,
                search: createSearchParams(append(entries, e.value)).toString()
            });
          }}
          onFocus={() => setInvalidFields && setInvalidFields([])}
          options={options}
          placeholder={placeholder? placeholder : 'Chọn...'}
      />
      {invalidFields &&
        (invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload)
          && <div className='pt-1 text-title-2 text-accent-3'>{invalidFields.find(i => i.name === keyPayload)?.message}</div>)
      }
    </>
  );
}

export default memo(SelectInput)
