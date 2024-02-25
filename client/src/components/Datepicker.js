import React, {memo, useState} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Datepicker = ({width, setValue, keyPayload, bgColor, textColor, outline, min}) => {
    const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
        selected={startDate} 
        // onChange={(date) => setStartDate(date)}
        onChange={(date) => {
          setStartDate(date)
          setValue && setValue(prev => ({...prev, [keyPayload]: date}))
        }}
        dateFormat='dd/MM/yyyy'
        minDate={min ? new Date() : null}
        className={`${width} cursor-pointer p-1 ${outline && 'outline'} outline-2 outline-[#DAE0E6] ${bgColor} ${textColor} rounded focus:outline-[#5E9ED6]`}
    />
  );
}

export default memo(Datepicker)
