import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import * as actions from '../../store/actions';
import '../../index.scss';

const Home = () => {
    const dispatch = useDispatch()

    return (
        <div className='font-segoe'>
            <Header/>
            <div className='w-full'>
                <Outlet/>
            </div>
            <Footer/>
        </div>
    )
}

export default Home
