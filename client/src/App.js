import {Routes,Route} from "react-router-dom";
import { Auth, Login, ResetPass, Register, Home, Homepage, Search, TourDetail, TourBooking, TourBooking2, TourBooking3, News, NewsDetail, PersonalProfile, Contact} from "./containers/Public";
import { SystemHome, SHomepage, SysTourDetail, NewTour, RequestList } from "./containers/System";
import { path } from "./ultils/constant";

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.HOME} element={<Home/>} >
          <Route path='*' element={<Homepage/>} />
          <Route path={path.SEARCH} element={<Search/>} />
          <Route path={path.TOUR_DETAIL} element={<TourDetail/>} />
          <Route path={path.TOUR_BOOKING} element={<TourBooking/>} />
          <Route path={path.TOUR_BOOKING2} element={<TourBooking2/>} />
          <Route path={path.TOUR_BOOKING3} element={<TourBooking3/>} />
          <Route path={path.NEWS} element={<News/>} />
          <Route path={path.NEWS_DETAIL} element={<NewsDetail/>} />
          <Route path={path.PERSONAL_PROFILE} element={<PersonalProfile/>} />
          <Route path={path.CONTACT} element={<Contact/>} />
        </Route>
        <Route path={path.SYSTEM_HOME} element={<SystemHome/>} >
          <Route path='*' element={<SHomepage/>} />
          <Route path={path.SYSTEM_TOUR_DETAIL} element={<SysTourDetail/>} />
          <Route path={path.NEW_TOUR} element={<NewTour/>} />
          <Route path={path.REQUEST_LIST} element={<RequestList/>} />
          <Route path={path.REQUEST_DETAIL} element={<SysTourDetail/>} />
        </Route>
        <Route path={path.AUTH} element={<Auth/>} >
          <Route path={path.LOGIN} element={<Login/>} />
          <Route path={path.REGISTER} element={<Register/>} />
          <Route path={path.RESETPASS} element={<ResetPass/>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
