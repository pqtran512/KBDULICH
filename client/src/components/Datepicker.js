import React, {memo, useState, useEffect} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import icons from '../ultils/icons'

const { MdCalendarToday } = icons

const Datepicker = ({width, height, top, defaultValue, setValue, keyPayload, bgColor, textColor, outline, min, format}) => {
    const [startDate, setStartDate] = useState(null);
    // const day = startDate.getDate();
    // const month = startDate.getMonth() + 1; // Months are zero-based, so add 1
    // const year = startDate.getFullYear();
    // const parsedDate = initialDate ? new Date(initialDate) : null;
  // useEffect(() => {
  //     startDate
  //     defaultValue && startDate -> startDate
  // }, [])
  return (
    <div className='relative'>
      <DatePicker
          placeholderText="Chọn ngày"
          selected={startDate? startDate : (defaultValue? defaultValue : startDate)}
          onChange={(date) => {
            setStartDate(date)
            if (date) {
              if (format === 'yyyy') {
                setValue && setValue(prev => ({...prev, [keyPayload]: date.getFullYear()}))
              }
              else {
                setValue && setValue(prev => ({...prev, [keyPayload]: date.getFullYear() + '_' + (date.getMonth()+1).toString().padStart(2, '0') + '_' + date.getDate().toString().padStart(2, '0') }))
              }
            }
          }}
          dateFormat={format || 'dd/MM/yyyy'}
          showYearPicker={format === 'yyyy'}
          minDate={min ? new Date() : null}
          className={`${width} ${height} cursor-pointer p-2 ${outline && 'outline'} outline-2 outline-[#DAE0E6] ${bgColor} ${textColor} rounded focus:outline-[#5E9ED6]`}
          wrapperClassName='text-body-2 xl:text-body-1 text-neutral-1-600'
          calendarClassName='text-caption-2'
      />
      <MdCalendarToday className={`${top} absolute right-9 text-[16px] text-neutral-1-600 xl:right-1 xl:text-[18px]`}/>
    </div>
    // <input className={`${width} cursor-pointer p-1 ${outline && 'outline'} outline-2 outline-[#DAE0E6] ${bgColor} ${textColor} rounded focus:outline-[#5E9ED6] placeholder:text-neutral-1-600`}
    //       type="date" id="datemin" name="datemin" min={year + '-' + month + '-' + day} placeholder='Chọn'/>
      
  );
}

export default memo(Datepicker)
