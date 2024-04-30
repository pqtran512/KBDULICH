import React, {memo} from 'react';
import { createSearchParams, useNavigate, useLocation, useSearchParams } from "react-router-dom";

const notActiveBorder = "cursor-pointer flex items-center justify-center w-10 h-10 rounded text-[14px] leading-[22px] bg-blue-grad text-primary-2 font-semibold transition-all group hover:bg-none hover:text-white hover:font-semibold"
const activeBorder = "cursor-pointer flex items-center justify-center w-10 h-10 rounded text-[14px] leading-[22px] text-white font-semibold transition-all group bg-background-8"
const notActiveBg = "flex items-center justify-center w-9 h-9 rounded bg-white transition-all group-hover:bg-primary-2"
const activeBg = "flex items-center justify-center w-9 h-9 rounded transition-all bg-accent-8 group-hover:opacity-70"
const notActiveBStyle = 'flex items-center justify-center cursor-pointer rounded bg-white border-2 border-[#363837] text-[12px] text-black font-semibold transition-all hover:bg-[#363837] hover:text-white w-6 h-6 xl:w-8 xl:h-8 xl:text-[14px]'
const activeBStyle = 'flex items-center justify-center cursor-pointer rounded border-2 border-[#363837] font-semibold transition-all bg-[#363837] text-[12px] text-white w-6 h-6 xl:w-8 xl:h-8 xl:text-[14px]'

const PageNumber = ({ text, currentPage, icon, setCurrentPage, blackStyle}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const [paramsSeach] = useSearchParams()
    let entries = paramsSeach.entries()

    const append = (entries) => {
        let params = []
        paramsSeach.append('page', +text)
        for (let entry of entries) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.map(i => {searchParamsObject = {...searchParamsObject, [i[0]]: i[1]}})
        return searchParamsObject
    }
    const handleChangePage = () => {
        setCurrentPage(+text)
        navigate({
            pathname: location?.pathname,
            search: createSearchParams(append(entries)).toString()
        });
    }
    return (
    <>
    { blackStyle? 
        <div className={+text === +currentPage ? `${activeBStyle}` : `${notActiveBStyle}`}
             onClick={handleChangePage}>{icon || text}
        </div>
        :
        <div className={+text === +currentPage ? `${activeBorder}` : `${notActiveBorder}`}
            onClick={handleChangePage}>
            <div className={+text === +currentPage ? `${activeBg}` : `${notActiveBg}`}>{icon || text}</div>
        </div>
    }
    </>
    )
}

export default memo(PageNumber)
