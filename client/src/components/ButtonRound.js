import React, {memo} from 'react';
import { Link } from 'react-router-dom'

const ButtonRound = ({text, textColor, bgColor, link, type, hoverType, width, height, textSize, border}) => {
    return (
        <Link 
            className={`${width} ${height} ${textColor} ${bgColor} ${type} ${hoverType} ${textSize} ${border} flex items-center justify-center relative shadow-shad1 rounded-[99px] hover-filled-slide-right md:font-semibold`}
            to={link}
        >
            <span className="relative z-10">{text}</span>
        </Link>
    )
}

export default memo(ButtonRound)
