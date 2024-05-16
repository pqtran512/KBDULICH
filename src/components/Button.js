import React, {memo} from 'react';

const Button = ({type, text, textColor, bgColor, mt, onClick, wfull, redBtn}) => {
    return (
        <button
            type={type || 'button'}
            className={`${textColor} ${bgColor}  ${mt && 'mt-3'} ${wfull && 'w-full'} py-2 px-8 rounded-[6px] shadow-shad1 text-body-2 xl:text-body-1 ${redBtn? 'hover:bg-accent-2' : 'hover:bg-primary-1'}`}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default memo(Button)
