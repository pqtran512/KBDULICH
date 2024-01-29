import React, {memo} from 'react';

const Button = ({text, textColor, bgColor, mt, onClick, wfull, redBtn}) => {
    return (
        <button
            type='button'
            className={`${textColor} ${bgColor}  ${mt && 'mt-3'} ${wfull && 'w-full'} py-2 px-8 rounded-[6px] shadow-shad1 ${redBtn? 'hover:bg-accent-2' : 'hover:bg-primary-1'}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default memo(Button)
