import React, {useState, useEffect} from 'react';
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { SelectInput, Datepicker } from '../../components'
import { Bar, Line } from "react-chartjs-2";
import icons from '../../ultils/icons';
import { getToursRating } from '../../store/actions/tourPlaceAction';
import { useDispatch, useSelector } from 'react-redux'
import { ratingClassifier } from '../../ultils/ratingClassifier';
import { reportTour, reportCustomer, reportIncome } from '../../store/actions/reportAction';
import { dataReportArr, getDataForCurrentTime, increaseRate } from '../../ultils/reportArr';

const { VscTriangleLeft, HiMiniFire, FaStar } = icons

const Report = () => {
    const dispatch = useDispatch()
    const { tours_rating } = useSelector(state => state.tour)
    const { tour_data, customer_data, income_data } = useSelector(state => state.report)
    const startDate = new Date();
    const [selectedYear, setSelectedYear] = useState({
        year: startDate.getFullYear(),
    });
    const [selectedOption, setSelectedOption] = useState({
        option: 'Theo tháng',
    });
    const [loadingTour, setLoadingTour] = useState(true);
    const [loadingCustomer, setLoadingCustomer] = useState(true);
    const [loadingIncome, setLoadingIncome] = useState(true);
    const chartOption = [
        { value: 'Theo tháng', label: 'Theo tháng' },
        { value: 'Theo quý', label: 'Theo quý' }
      ]
    const showIncreaseRate = (data, key, option) => {
        var indents = [];
        const rate = increaseRate(data, key, option)
        console.log(rate)
        if (rate === '-') {
            indents.push(<div key={'rate'} className='bg-accent-5 w-4 h-1'></div>);
        }
        else if (rate > 0) {
            indents.push(
                <div key={'rate'} className='text-accent-6 flex gap-0.5 items-center'>
                    <VscTriangleLeft size={17} className='rotate-90'/>
                    <div className=' text-body-1 font-semibold'>{rate}%</div>
                </div>
            );
        }
        else {
            indents.push(
            <div key={'rate'} className='text-accent-3 flex gap-0.5 items-center'>
                <VscTriangleLeft size={17} className='-rotate-90'/>
                <div className=' text-body-1 font-semibold'>{Math.abs(rate)}%</div>
            </div>
            )
        }
        return indents;
    };
    useEffect(() => {
        setLoadingTour(true);
        setLoadingCustomer(true);
        setLoadingIncome(true);
        dispatch(reportTour({year: selectedYear.year}))
            .then(() => {
                setLoadingTour(false);
            })
        dispatch(reportCustomer({year: selectedYear.year}))
            .then(() => {
                setLoadingCustomer(false);
            })
        dispatch(reportIncome({year: selectedYear.year}))
            .then(() => {
                setLoadingIncome(false);
            })
        dispatch(getToursRating())
    }, [dispatch, selectedYear.year])
    return (
        <div className='w-full px-6 pt-20 xl:pt-7 pb-20 xl:px-0 xl:pr-10 overflow-x-hidden'>
            <div className='pb-6 font-prata text-neutral-1-900 font-semibold text-header-1 md:text-heading-4'>Báo cáo và Thống kê</div>
            <div className='pb-5 flex gap-2 justify-end'>
                <SelectInput options={chartOption} style2={true} placeholder='Theo tháng' myStyle='w-[118px]' keyPayload='option' setValue={setSelectedOption} />
                <Datepicker width='w-40' height='h-7' top='top-[6px]' outline format='yyyy' keyPayload='year' setValue={setSelectedYear} />
            </div>
            <div className='pb-4 text-body-2 text-center uppercase tracking-wide text-neutral-1-600 md:text-body-1'>Báo cáo tổng quan năm <span className='font-semibold bg-neutral-1-500 rounded-md p-1 text-white'>{selectedYear.year}</span></div>
            <div className='pb-10 flex flex-col justify-center items-center gap-4 md:items-start md:gap-16 md:flex-row'>
                <div className='text-white text-center font-semibold w-48 h-[100px] rounded-md flex flex-col justify-center items-center bg-gradient-to-tr from-[#74276C] via-[#C53364] to-[#FD8263] md:w-52'>
                    <div className='text-caption-1 md:text-body-2'>Thu nhập</div>
                    <div className='text-heading-3 md:text-heading-2'>{(income_data?.orders_by_year / 1000000000).toFixed(2)}</div>
                    <div className='text-caption-1 md:text-body-2 font-normal'>tỷ VNĐ</div>
                </div>
                <div className='text-white text-center font-semibold w-48 h-[100px] rounded-md flex flex-col justify-center items-center bg-gradient-to-tr from-[#74276C] via-[#C53364] to-[#FD8263] md:w-52'>
                    <div className='text-caption-1 md:text-body-2'>Số Tour khởi hành</div>
                    <div className='text-heading-3 md:text-heading-2'>{tour_data?.tours_by_year}</div>
                </div>
                <div className='text-white text-center font-semibold w-48 h-[100px] rounded-md flex flex-col justify-center items-center bg-gradient-to-tr from-[#74276C] via-[#C53364] to-[#FD8263] md:w-52'>
                    <div className='text-caption-1 md:text-body-2'>Số khách hàng</div>
                    <div className='text-heading-3 md:text-heading-2'>{customer_data?.orders_by_year}</div>
                </div>
            </div>
            <div className='pb-10 w-full mx-auto flex flex-col gap-5 xl:flex-row'>
                <div className='w-full xl:w-[34%] shadow-shad1 p-4'>
                    <div className='pb-1 text-caption-1 text-neutral-1-300 font-semibold tracking-wide md:text-body-2'>Thống kê thu nhập hằng {selectedOption.option === 'Theo tháng'? 'tháng' : 'quý'} (VNĐ)</div>
                    <div className='pb-2 flex justify-between items-center'>
                        <div className='text-heading-4 font-semibold md:text-heading-3'>{!loadingIncome && selectedOption.option === 'Theo tháng'? Number(getDataForCurrentTime(income_data.orders_by_month, 'total', 'month')).toLocaleString() : Number(getDataForCurrentTime(income_data.orders_by_quarter, 'total', 'quarter')).toLocaleString()}</div>
                        {selectedOption.option === 'Theo tháng'?
                            showIncreaseRate(income_data.orders_by_month, 'total', 'month')
                        :   showIncreaseRate(income_data.orders_by_quarter, 'total', 'quarter')
                        }
                    </div>
                    <div className='h-60'>
                        {!loadingIncome && selectedOption.option === 'Theo tháng'? 
                            <Line 
                                data={{
                                    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                                    datasets: [
                                        {
                                            label: 'Tổng thu nhập (VNĐ)',
                                            data: dataReportArr(income_data.orders_by_month, 'month', 'total'),
                                            backgroundColor: '#D7E8FF',
                                            borderColor: '#034A93',
                                            pointRadius: 4, 
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            display: true,
                                            title: {
                                                display: true,
                                                text: 'Tháng'
                                            }
                                        },
                                        y: {
                                            ticks: {
                                            callback: function (value, index, values) {
                                                // Convert large numbers to "X tỷ" format
                                                return (value / 1000000000).toFixed(1) + ' tỷ';
                                            }
                                            },
                                            display: true,
                                        }
                                    }
                                }}
                            />
                        : !loadingIncome && 
                            <Line 
                                data={{
                                    labels: ['1', '2', '3', '4'],
                                    datasets: [
                                        {
                                            label: 'Tổng thu nhập (VNĐ)',
                                            data: dataReportArr(income_data.orders_by_quarter, 'quarter', 'total'),
                                            backgroundColor: '#D7E8FF',
                                            borderColor: '#034A93',
                                            pointRadius: 4, 
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            display: true,
                                            title: {
                                                display: true,
                                                text: 'Quý'
                                            }
                                        },
                                        y: {
                                            ticks: {
                                            callback: function (value, index, values) {
                                                // Convert large numbers to "X tỷ" format
                                                return (value / 1000000000).toFixed(1) + ' tỷ';
                                            }
                                            },
                                            display: true,
                                        }
                                    }
                                }}
                            />
                        }
                    </div>
                </div>
                <div className='flex flex-col gap-5 md:flex-row xl:w-[65%]'>
                    <div className='w-full md:w-1/2 shadow-shad1 p-4'>
                        <div className='pb-1 text-caption-1 text-neutral-1-300 font-semibold tracking-wide md:text-body-2'>Thống kê Tour khởi hành hằng {selectedOption.option === 'Theo tháng'? 'tháng' : 'quý'}</div>
                        {!loadingTour &&
                        <>  <div className='pb-2 flex justify-between items-center'>
                                <div className='text-heading-4 font-semibold md:text-heading-3'>{selectedOption.option === 'Theo tháng'? getDataForCurrentTime(tour_data.tours_by_month, 'count', 'month') : getDataForCurrentTime(tour_data.tours_by_quarter, 'count', 'quarter')}</div>
                                {selectedOption.option === 'Theo tháng'?
                                    showIncreaseRate(tour_data.tours_by_month, 'count', 'month')
                                :   showIncreaseRate(tour_data.tours_by_quarter, 'count', 'quarter')
                                }    
                            </div>
                            <div className='h-60'>
                                {selectedOption.option === 'Theo tháng'? 
                                    <Bar
                                        data={{
                                            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                                            datasets: [
                                                {
                                                    label: 'Số Tour khởi hành',
                                                    data: dataReportArr(tour_data.tours_by_month, 'month','count'),
                                                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                                    borderColor: 'rgb(255, 159, 64)',
                                                    borderWidth: 1,
                                                    barThickness: 17,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: {
                                                    display: true,
                                                    title: {
                                                        display: true,
                                                        text: 'Tháng'
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                : 
                                    <Bar
                                        data={{
                                            labels: ['1', '2', '3', '4'],
                                            datasets: [
                                                {
                                                    label: 'Số Tour khởi hành',
                                                    data: dataReportArr(tour_data.tours_by_quarter, 'quarter', 'count'),
                                                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                                                    borderColor: 'rgb(255, 159, 64)',
                                                    borderWidth: 1,
                                                    barThickness: 45,
                                                },
                                            ],
                                        }}
                                        options={{
                                            responsive: true,
                                            maintainAspectRatio: false,
                                            scales: {
                                                x: {
                                                    display: true,
                                                    title: {
                                                        display: true,
                                                        text: 'Quý'
                                                    }
                                                }
                                            }
                                        }}
                                    />
                                }
                            </div>
                        </>}
                    </div>
                    <div className='w-full md:w-1/2 shadow-shad1 p-4'>
                        <div className='pb-1 text-caption-1 text-neutral-1-300 font-semibold tracking-wide md:text-body-2'>Thống kê lượng khách hàng hằng {selectedOption.option === 'Theo tháng'? 'tháng' : 'quý'}</div>
                        {!loadingCustomer &&
                        <>  <div className='pb-2 flex justify-between items-center'>
                                <div className='text-heading-4 font-semibold md:text-heading-3'>{selectedOption.option === 'Theo tháng'? getDataForCurrentTime(customer_data.orders_by_month, 'total', 'month') : getDataForCurrentTime(customer_data.orders_by_quarter, 'total', 'quarter')}</div>
                                {selectedOption.option === 'Theo tháng'?
                                    showIncreaseRate(customer_data.orders_by_month, 'total', 'month')
                                :   showIncreaseRate(customer_data.orders_by_quarter, 'total', 'quarter')
                                } 
                            </div>
                            <div className='h-60'>
                            {selectedOption.option === 'Theo tháng'? 
                                <Bar
                                    data={{
                                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                                        datasets: [
                                            {
                                                label: 'Số khách hàng',
                                                data: dataReportArr(customer_data.orders_by_month, 'month', 'total'),
                                                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                                borderColor: 'rgb(153, 102, 255)',
                                                borderWidth: 1,
                                                barThickness: 17
                                            },
                                        ],
                                    }}
                                    options={{
                                        responsive: true,
                                        maintainAspectRatio: false,
                                        scales: {
                                            x: {
                                                display: true,
                                                title: {
                                                    display: true,
                                                    text: 'Tháng'
                                                }
                                            }
                                        }
                                    }}
                                />
                            : customer_data &&
                            <Bar
                                data={{
                                    labels: ['1', '2', '3', '4'],
                                    datasets: [
                                        {
                                            label: 'Số khách hàng',
                                            data: dataReportArr(customer_data.orders_by_quarter, 'quarter', 'total'),
                                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                            borderColor: 'rgb(153, 102, 255)',
                                            borderWidth: 1,
                                            barThickness: 45
                                        },
                                    ],
                                }}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        x: {
                                            display: true,
                                            title: {
                                                display: true,
                                                text: 'Quý'
                                            }
                                        }
                                    }
                                }}
                            />
                            }
                            </div>
                        </>}
                    </div>
                </div>
            </div>
            <div className='flex gap-10'>
                <div className='w-full shadow-shad1 p-4 overflow-x-auto'>
                    <div className='pb-6 flex gap-1 items-center'>
                        <div className='uppercase tracking-wide text-neutral-1-600 text-body-2'>Tour thịnh hành</div>
                        <HiMiniFire size={20} className='text-accent-3'/>
                    </div>
                    <table className="mb-8 mytable2 w-full text-body-2 xl:text-body-1">
                        <thead>
                            <tr className="h-10 font-semibold tracking-wider bg-neutral-3-100">
                                <td className="xl:min-w-[66px]">Mã</td>
                                <td>Tên Tour</td>
                                <td>Rating</td>
                            </tr>
                        </thead>
                        <tbody>
                            {tours_rating?.slice(0, 5).map((tour, idx) => {
                                return ( 
                                    <tr key={idx} className='h-12 border-b-2 border-neutral-2-200'>
                                    <td>{tour.row.tour_ID.split('_')[0]}</td>
                                    <td><div className=''>{tour.row.name}</div></td>
                                    <td>
                                        <div className={`${ratingClassifier(tour.average_rating) < 3? 'bg-[#1ABB9C]' : 'bg-accent-3'} flex items-center gap-1 bg-[#1ABB9C] w-fit px-2 rounded-full`}>
                                            <div className='text-white'>{tour.average_rating.toFixed(1)}</div>
                                            <FaStar size={15} className='text-secondary-2'/> 
                                        </div>
                                    </td>
                                </tr>
                            )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Report