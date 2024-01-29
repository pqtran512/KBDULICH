import React, {memo, useState} from 'react';
import Select from 'react-select';

const SelectInput = ({myStyle, placeholder, options, defaultValue}) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  return (
    <Select
        className={`cursor-pointer ${myStyle}`}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        placeholder={placeholder? placeholder : 'Chọn...'}
    />
  );
}

export default memo(SelectInput)
