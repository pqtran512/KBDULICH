import React, {memo} from 'react';

const CheckedBox = ({value, label, setValue, keyValue}) => { 
    const [checked, setChecked] = React.useState(true);

    return (
        <div className='flex gap-1 items-center'>
            <input type="checkbox" value={value} className='w-5 h-5 accent-primary-1'
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
