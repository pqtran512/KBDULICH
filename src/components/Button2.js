import React, {memo} from 'react';

const Button2 = ({text, textColor, bgColor, onClick}) => {
    return (
        <button
            type='button'
            className={`relative inline-block w-auto h-auto bg-transparent border-none cursor-pointer min-w-[120px] btn-3 hover-border-2`}
            onClick={onClick}
        >   <span className={`relative inline-block text-button1 ${textColor} ${bgColor} font-semibold top-0 left-0 w-full py-2 px-4 xl:text-button xl:py-2 xl:px-5 duration-300`}>{text}</span>
        </button>
    )
}
export default memo(Button2)
