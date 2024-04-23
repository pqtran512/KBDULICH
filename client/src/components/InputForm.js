import React, { memo, useState } from 'react'
import icons from '../ultils/icons'

const { BsEyeFill, FaEyeSlash } = icons

const InputForm = ({ width, label, asterisk, placeholder, type, value, setValue, keyPayload, invalidFields, setInvalidFields, min, max, style2}) => {
    const [visible, setIsVisible] = useState(false);
    const [focus, setFocus] = useState(false);
    return (
        <div className='relative'>
            <label htmlFor={keyPayload} className='text-title-1 text-neutral-1-900'>{label}<span className='text-red-500'>{asterisk && ' *'}</span></label>
            <input 
                id={keyPayload}
                type={type === 'password'? (visible? 'text' : 'password') : (type || 'text')}
                spellCheck="false"
                className={`rounded-md transition-all ${width} ${style2? 'outline-none bg-neutral-3-50 p-1 border-neutral-1-900 text-neutral-1-700' : 'rounded-md mt-1 p-3 bg-neutral-3-50 text-neutral-1-600'}`}  
                placeholder={placeholder}
                value={value}
                min={min || 0}
                max={max || null}
                onChange={(e) => {
                    if (type === 'number') {
                        setValue(prev => ({...prev, [keyPayload]: +e.target.value}))
                    }
                    else {
                        setValue(prev => ({...prev, [keyPayload]: e.target.value})) // specify input by keyPayload -> change only that input
                    }
                    
                }} 
                onFocus={() => {
                    setInvalidFields([])
                    setFocus(true)
                }}
                onBlur={() => setFocus(false)}
                autoComplete="off"
            />
            {style2? 
                <span className={`${focus? 'w-full' : 'w-0'} absolute bottom-0 left-0 h-[1px] bg-black transition-all duration-[0.4s]`}></span>
            : <></>}
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