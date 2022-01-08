import Header from './Header'
import Display from './Display'
import Footer from './Footer'

import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import {UserContext} from './UserContext'
import React, {useState, useEffect, useContext, useReducer} from 'react';

import Login from './Login';
import Logout from './Logout';
import Registration from './Registration';
import AdsCategory from './AdsCategory';
import AddClassifieds from './AddClassifieds';
import AddCategory from './AddCategory';
import AddStatus from './AddStatus';
import DashBoard from './DashBoard';
import AddState from './AddState';
import AddDistrict from './AddDistrict';
import UpdateClassified from './UpdateClassified';
import EditDashBoard from './EditDashBoard';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import ViewClassified from './ViewClassified';
import ForgotPassword from './ForgotPassword';
import AdsBulkUpdate from './AdsBulkUpdate';
import UserReport from './UserReport';

// import { UserContext } from "./UserContext.js";

import {initialState, reducer} from '../components/reducer/UseReducer'

function Index(props) {
    const [contextState, contextDispatch] = useReducer(reducer, initialState)
    return (
        <div>
            <BrowserRouter basename={'/demo/sajan/adsfrontend'}>
                <UserContext.Provider value={{contextState, contextDispatch}}>
                <Header></Header>
                <Routes>
                    <Route exact path='/category-view/:categoryId' element={<AdsCategory />}></Route>
                    <Route exact path='/classified-view/:addId' element={<ViewClassified />}></Route>
                    <Route exact path='/classified-edit/:addId' element={<UpdateClassified />}></Route>
                    <Route exact path='/admin/adddistrict' element={<AddDistrict />}></Route>
                    <Route exact path='/admin/addstate' element={<AddState />}></Route>
                    <Route exact path='/admin/dashboard' element={<DashBoard />}></Route>
                    <Route exact path='/admin/addcategory' element={<AddCategory />}></Route>
                    <Route exact path='/admin/addstatus' element={<AddStatus />}></Route>
                    <Route exact path='/admin/addclassifieds' element={<AddClassifieds />}></Route>                    
                    {/* <Route exact path='/adscategory' element={<AdsCategory />}></Route> */}
                    <Route exact path='/admin/registration' element={<Registration />}></Route>
                    <Route exact path='/admin/login' element={<Login />}></Route>
                    <Route exact path='/admin/logout' element={<Logout />}></Route>
                    <Route exact path='/' element={< Display />}></Route>
                    <Route exact path='/admin' element={< Login />}></Route>
                    <Route exact path='/admin/edit-dashboard' element={< EditDashBoard />}></Route>
                    <Route exact path='/contactus' element={< ContactUs />}></Route>
                    <Route exact path='/aboutus' element={< AboutUs />}></Route>
                    <Route exact path='/admin/forgotpassword' element={< ForgotPassword />}></Route>
                    <Route exact path='/admin/adsBulkUpdate' element={< AdsBulkUpdate />}></Route>
                    <Route exact path='/admin/userreport' element={< UserReport />}></Route>
                </Routes>
                <Footer></Footer>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
    )
      
  }

export default Index;