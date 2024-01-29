import React, {memo} from 'react';

const SearchBar = ({placeholder, width}) => {
    return (
        <div action="" className={`${width} flex justify-end items-center relative`}>
            <input type="search"  placeholder={placeholder} className="hidden xl:block w-full h-[34px] px-4 border border-neutral-1-500 rounded-[999px]"/>
            <button type="button" className="absolute right-[11px] flex">
                <i className="twi-22-search-line text-[20px] leading-5 text-neutral-1-500"></i></button>
        </div>
    )
}

export default memo(SearchBar)
