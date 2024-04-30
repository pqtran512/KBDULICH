import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import PageNumber from './PageNumber';

const Pagination = ({limit, blackStyle, count}) => {
    const [searchParams] = useSearchParams()
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    useEffect(() => {
        let page = searchParams.get('page')
        page && +page !== currentPage && setCurrentPage(+page)
        !page && setCurrentPage(1)
    }, [searchParams])
    useEffect(() => {
        let maxPage = Math.ceil(count / limit)
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1)
        let temp = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)
        // 3 => 1 2 3 (1 ... 2 3)
    }, [count, currentPage])

    return (
        <div className="flex items-end justify-end gap-2 ">
            {!isHideStart && <PageNumber icon={<i className="twi-22-chevron-line rotate-180 text-[12px] font-semibold text-center group-hover:font-semibold"></i>} blackStyle={blackStyle} text={1} setCurrentPage={setCurrentPage} />}
            {!isHideStart && <div className={`${blackStyle? 'text-black' : 'text-primary-2'} text-body-2 font-semibold`}>. . .</div>}
            {arrPage.length > 0 && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                        blackStyle={blackStyle}
                    />
                )
            })}
            {!isHideEnd && <div className={`${blackStyle? 'text-black' : 'text-primary-2'} text-body-2 font-semibold`}>. . .</div>}
            {!isHideEnd &&<PageNumber icon={<i className="twi-22-chevron-line text-[12px] font-semibold text-center group-hover:font-semibold"></i>} blackStyle={blackStyle} setCurrentPage={setCurrentPage} text={Math.ceil(count / limit)} />}
        </div>
    )
}

export default Pagination
