import React, {memo} from 'react';
import loader from '../assets/img/home/loader.svg'

const Loading = ({loading}) => {
    return (
        <div className={`${loading? '' : 'hidden'} pt-5 w-[70px] mx-auto`}>
            <img src={loader} />
        </div>
    )
}

export default memo(Loading)
