import React, { useEffect } from 'react';

const Pagination = ({number, length}) => {
    return (
        <ul className="pt-8 flex items-center justify-end gap-2 ">
            <li><div className="flex items-center justify-center w-10 h-10 rounded-[4px] text-[14px] leading-[22px] bg-neutral-1-300 text-primary-2 font-semibold transition-all group hover:bg-none hover:text-white hover:font-semibold xl:bg-blue-grad">
                <a href="/" className="flex items-center justify-center w-9 h-9 rounded-[4px] bg-neutral-1-300 transition-all group-hover:bg-primary-2 xl:bg-white">1</a></div>
            </li>
            <li><div className="flex items-center justify-center w-10 h-10 rounded-[4px] text-[14px] leading-[22px] bg-neutral-1-300 text-primary-2 font-semibold transition-all group hover:bg-none hover:text-white hover:font-semibold xl:bg-blue-grad">
                <a href="/" className="flex items-center justify-center w-9 h-9 rounded-[4px] bg-neutral-1-300 transition-all group-hover:bg-primary-2 xl:bg-white">2</a></div>
            </li>
            <li><div className="flex items-center justify-center w-10 h-10 rounded-[4px] text-[14px] leading-[22px] bg-neutral-1-300 text-primary-2 transition-all group hover:bg-none hover:text-white hover:font-semibold xl:bg-blue-grad">
                <a href="/" className="flex items-center justify-center w-9 h-9 rounded-[4px] bg-neutral-1-300 transition-all group-hover:bg-primary-2 xl:bg-white"><i className="twi-22-chevron-line text-[12px] font-semibold text-center group-hover:font-semibold"></i></a>
                </div>
            </li>
        </ul>
    )
}

export default Pagination
