import {Routes,Route} from "react-router-dom";
import { Auth, Login, ResetPass1, ResetPass2, Register, Home, Homepage, Search, TourDetail, TourBooking, TourBooking2, TourBooking3, News, NewsDetail, PersonalProfile, Contact, Instruction} from "./containers/Public";
import { SystemLogin, SystemResetPass1, SystemResetPass2, SystemHome, STourList, SysTourDetail, TourNew, RequestList, RequestDetail, MTourList, StaffDetail, StaffList, StaffNew, Report, Account, CustomerDetail, TourEdit, StaffEdit, SystemAuth } from "./containers/System";
import { path } from "./ultils/constant";
import * as actions from './store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

function App() {
  const dispatch = useDispatch()
  let [loading, setLoading] = useState(true)
  const { isLoggedIn, refresh_token, role, refresh_msg } = useSelector(state => state.auth)
  useEffect(()=> {
    if(loading){
      dispatch(actions.refreshToken({
        refresh_token: 'Bearer ' + refresh_token,
        role: role,
      }))
      if(loading){
          setLoading(false)
      }
    }
    let fourMinutes = 1000 * 60 * 4
    let interval =  setInterval(()=> {
        if(isLoggedIn){
          dispatch(actions.refreshToken({
            refresh_token: 'Bearer ' + refresh_token,
            role: role,
          }))
          if(loading){
              setLoading(false)
          }
        }
    }, fourMinutes)
    return () => clearInterval(interval)
  }, [isLoggedIn, loading]) 
  useEffect(() => {
    if (refresh_msg && refresh_msg !== '') alert(refresh_msg);
  }, [refresh_msg])
  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 300)
  }, [isLoggedIn, refresh_token])
  return (
    <div>
      <Routes>
        <Route path={path.AUTH} element={<Auth/>} >
          <Route path={path.INSTRUCTION} element={<Instruction/>} />
          <Route path={path.LOGIN} element={<Login/>} />
          <Route path={path.REGISTER} element={<Register/>} />
          <Route path={path.RESETPASS1} element={<ResetPass1/>} />
          <Route path={path.RESETPASS2_TOKEN} element={<ResetPass2/>} />
        </Route>
        <Route path={path.SYSTEM_AUTH} element={<SystemAuth/>} >
          <Route path={path.LOGIN} element={<SystemLogin/>} />
          <Route path={path.RESETPASS1} element={<SystemResetPass1/>} />
          <Route path={path.RESETPASS2} element={<SystemResetPass2/>} />
        </Route>
        <Route path={path.HOME} element={<Home/>} >
          <Route path='*' element={<Homepage/>} />
          <Route path={path.SEARCH} element={<Search/>} />
          <Route path={path.SEARCH__PAGE} element={<Search/>} />
          {/* <Route path={path.TOUR_DETAIL} element={<TourDetail/>} /> */}
          <Route path={path.TOUR_DETAIL_ID} element={<TourDetail/>} />
          <Route path={path.TOUR_BOOKING} element={<TourBooking/>} />
          <Route path={path.TOUR_BOOKING2} element={<TourBooking2/>} />
          <Route path={path.TOUR_BOOKING3} element={<TourBooking3/>} />
          <Route path={path.NEWS} element={<News/>} />
          <Route path={path.NEWS_DETAIL} element={<NewsDetail/>} />
          <Route path={path.PERSONAL_PROFILE} element={<PersonalProfile/>} />
          <Route path={path.CONTACT} element={<Contact/>} />
        </Route>
        <Route path={path.STAFF_HOME} element={<SystemHome/>} >
          <Route path='*' element={<STourList/>} />
          <Route path={path.TOUR_LIST} element={<STourList/>} />
          <Route path={path.SYSTEM_TOUR_DETAIL} element={<SysTourDetail/>} />
          <Route path={path.TOUR_EDIT} element={<TourEdit/>} />
          <Route path={path.TOUR_NEW} element={<TourNew/>} />
          <Route path={path.CUSTOMER_DETAIL} element={<CustomerDetail/>} />
          <Route path={path.REQUEST_LIST} element={<RequestList/>} />
          <Route path={path.REQUEST_DETAIL} element={<RequestDetail/>}>
            <Route path={path.REQUEST_DUP} element={<RequestDetail/>} />
          </Route>
          <Route path={path.ACCOUNT} element={<Account/>} />
        </Route>
        <Route path={path.MANAGER_HOME} element={<SystemHome/>} >
          <Route path='*' element={<MTourList/>} />
          <Route path={path.TOUR_LIST} element={<MTourList/>} />
          <Route path={path.SYSTEM_TOUR_DETAIL} element={<SysTourDetail/>} />
          <Route path={path.TOUR_EDIT} element={<TourEdit/>} />
          <Route path={path.REQUEST_LIST} element={<RequestList/>} />
          <Route path={path.REQUEST_DETAIL} element={<RequestDetail/>}>
            <Route path={path.REQUEST_DUP} element={<RequestDetail/>} />
          </Route>
          <Route path={path.STAFF_LIST} element={<StaffList/>} />
          <Route path={path.STAFF_DETAIL} element={<StaffDetail/>} />
          <Route path={path.STAFF_EDIT} element={<StaffEdit/>} />
          <Route path={path.STAFF_NEW} element={<StaffNew/>} />
          <Route path={path.REPORT} element={<Report/>} />
          <Route path={path.ACCOUNT} element={<Account/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;