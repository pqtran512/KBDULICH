import React, { memo, useState } from 'react'
import icons from '../ultils/icons'

const { BsEyeFill, FaEyeSlash } = icons

const InputForm = ({ width, label, asterisk, placeholder, type, value, setValue, keyPayload, invalidFields, setInvalidFields, min}) => {
    const [visible, setIsVisible] = useState(true);
    return (
        <div className='relative'>
            <label htmlFor={keyPayload} className='text-title-1 text-neutral-1-900'>{label}<span className='text-red-500'>{asterisk && ' *'}</span></label>
            <input 
                id={keyPayload}
                type={type === 'password'? (visible? 'text' : 'password') : (type || 'text')}
                className={`${width} rounded-md mt-1 p-3 bg-neutral-3-50 text-neutral-1-600`}  
                placeholder={placeholder}
                value={value}
                min={min? min : "0"}
                onChange={(e) => setValue(prev => ({...prev, [keyPayload]: e.target.value}))} // specify input by keyPayload -> change only that input
                onFocus={() => setInvalidFields([])}
            />
            {invalidFields.length > 0 && invalidFields.some(i => i.name === keyPayload)
                && <div className='pt-1 text-title-2 text-accent-3'>{invalidFields.find(i => i.name === keyPayload)?.message}</div>
            }
            {type === 'password' ?
                visible === true? 
                <FaEyeSlash className='absolute right-3 top-11 text-neutral-1-500 text-[20px] cursor-pointer' onClick={() => {setIsVisible(false)}}/>
                :
                <BsEyeFill className='absolute right-3 top-11 text-neutral-1-500 text-[20px] cursor-pointer' onClick={() => {setIsVisible(true)}}/>
            : ''} 
            
        </div>
    )
}

export default memo(InputForm)