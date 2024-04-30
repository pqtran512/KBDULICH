import React, {memo} from 'react';

const CheckedBox = ({value, label, setValue, keyValue, color}) => { 
    const [checked, setChecked] = React.useState(true);

    return (
        <div className='flex gap-1 items-center'>
            <input type="checkbox" value={value} className={`w-3 h-3 xl:w-4 xl:h-4 ${color}`}
            defaultChecked={checked}
            onChange={(e) => {
                setChecked((state) => !state)
                setValue(keyValue.filter(item => item !== e.target.value))
            }}
            />
            <div>{label}</div>
        </div>
    )
}

export default memo(CheckedBox)
