import React, {memo} from 'react';

const ButtonRound = ({text, textColor, bgColor, onClick, type, hoverType, width, height, textSize, border}) => {
    return (
        <div 
            className={`${width} ${height} ${textColor} ${bgColor} ${type} ${hoverType} ${textSize} ${border} cursor-pointer flex items-center justify-center relative shadow-shad1 rounded-[99px] hover-filled-slide-right md:font-semibold`}
            onClick={onClick}
        >
            <span className="relative z-10">{text}</span>
        </div>
    )
}

export default memo(ButtonRound)
