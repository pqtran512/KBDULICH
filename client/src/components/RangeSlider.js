import React, {memo} from 'react';
import Slider from 'react-slider'

const MIN = 1000000
const MAX = 20000000
const RangeSlider = ({values, setValues}) => {
    return (
        <>
        <Slider value={values} min={MIN} max={MAX} onChange={setValues}
            className='w-full h-[3px] bg-neutral-1-300' 
            thumbClassName='w-1 h-3 cursor-pointer bg-primary-2 -top-1'
            trackClassName='track'
            step={500000}
        />
        <div className="pt-3 text-body-2 flex justify-between items-center">
            <div id="range-value" className="text-black">{'Từ ' + Number(values[0]).toLocaleString() +  " - " + Number(values[1]).toLocaleString() + "  vnđ"}</div>
            <div className="text-primary-2">Filter</div>
        </div>
        </>
    )
}

export default memo(RangeSlider)
