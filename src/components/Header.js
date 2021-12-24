import {Link, useNavigate} from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import React, {useState, useEffect, useReducer} from 'react';

function Header() {
    console.log('check +--+---> header ')
    const {contextState, contextDispatch } = useContext(UserContext);

    const userContextDetails = JSON.parse(contextState)

    // const { user_detail_context } = useContext(UserContext);
    // console.log('props => ' + user_detail_context)  
    // // const [loginUserName, setLoginUserName] = useState('');
    // // const [state, dispatch] = useReducer(reducer, initialState);    
    // // console.log('props => ' + props)
    // // console.log('props 112 => ' + props.user_name)
    // // const user_detail = JSON.parse(props.value);
    // // const user_detail_1 = JSON.stringify(user_detail)
    // // const user_detail_2 = JSON.parse(props.value);
    // // console.log('props 11 => ' + JSON.stringify(props))
    // // console.log('props 222 => ' + JSON.parse(props.value))
    // // console.log('props 222 => ' + user_detail_2.user_name)
    // const user_detail_2 = ''
    // useEffect(()=> {
    //     console.log('props => ' + props);
    //     const user_detail_2 = JSON.parse(props.value);
    //     console.log('props 222 => ' + user_detail_2.user_name)
    // }, [])
    // // if(user_detail){
    // //     // setLoginUserName(user_detail.user_name);
    // //     console.log('header user_detail => ' + user_detail)
    // //     console.log('header user_detail => ' + user_detail.user_id)
    // // }

    // const history = useNavigate();

    // function login(props){
    //     console.log('header', props);
    //     history.push('/login');
    // }

    // function registration(){
    //     console.log('header', props);
    //     history.push('/registration');        
    // }

    // function home(){
    //     console.log('header', props);
    //     history.push('');        
    // }

    // function adsCategory(){
    //     console.log('header', props);
    //     history.push('/adscategory');        
    // }    

    // function addClassifieds(){
    //     console.log('header', props);
    //     history.push('/addclassifieds');        
    // }
    
    // function addCategory(){
    //     console.log('header', props);
    //     history.push('/addcategory');        
    // }
    
    // function addStatus(){
    //     console.log('header', props);
    //     history.push('/addstatus');        
    // }
    
    // function dashboard(){
    //     console.log('header', props);
    //     history.push('/dashboard');
    // }
    // useEffect(()=> {
    //     // contextDispatch(UserContext)
    //     console.log('contextState 00 ==> '+ contextState)        
    //     setUserDetail(contextState)
    //     console.log('inside use effect userDetailLocal ==> ', userDetailLocal) 
    //     console.log('inside use effect d ==> ', contextState.userId)       
    //     console.log('inside use effect id ==> ', userDetailLocal['userId'])             
    //     // contextDispatch({type:'user', payload:{'isLoggedIn':true, 'userId':userDetail.userId, 'userName':userDetail.userName}})        
    // }, [])
    // setUserId()
    // setUserName()
    useEffect(()=> {
    }, [userContextDetails])  
    console.log('contextState 55 ==> '+ userContextDetails)
    // console.log('userId ==> '+ userContextDetails.userId)
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <nav className="navbar navbar-expand-lg  navigation">
                        <Link className="navbar-brand" to="">
                            <img src="http://55mahesh.pythonanywhere.com/media/site_images/logo.png" alt="logo"/>
                        </Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto main-nav ">
                                <li className="nav-item active">
                                    <Link className="nav-link" to=''>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='{`${process.env.PUBLIC_URL}/aboutus`}'>About Us</Link>
                                </li>                                        
                                <li className="nav-item">
                                    <Link className="nav-link" to='{`${process.env.PUBLIC_URL}/contactus`}'>Contact Us</Link>
                                </li> 
                                {/* {console.log('contextState 11 => ', userContextDetails.userId)} */}
                                {contextState && userContextDetails.userId?
                                    <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='{`${process.env.PUBLIC_URL}/admin/dashBoard`}'>My Ads</Link>
                                    </li>    
                                    {/* <li className="nav-item">
                                        <Link className="nav-link" to='/adscategory'>Classifieds Category</Link>
                                    </li> */}
                                    <li className="nav-item dropdown dropdown-slide">
                                        <Link className="nav-link dropdown-toggle" to='' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Add Items <span><i className="fa fa-angle-down"></i></span>
                                        </Link>
                                        {/* Dropdown list */}
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/registration`}'>Add New Admin User</Link>
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/addclassifieds`}'>Add Classifieds</Link>
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/addcategory`}'>Add Category</Link>
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/addstatus`}'>Add Status</Link>
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/addstate`}'>Add State</Link>
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/adddistrict`}'>Add District</Link>
                                            <Link className="dropdown-item" to='{`${process.env.PUBLIC_URL}/admin/adsBulkUpdate`}'>Ads Bulk Hide</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to=''>{}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <h6 className="btn btn-outline-primary">{userContextDetails.userName}</h6>
                                    </li>
                                    <li className="nav-item">
                                        {/* <a className="nav-link login-button" href="index.html">Login</a> */}
                                        {/* <Link className="nav-link login-button" to='/login'>Login</Link> */}
                                        <Link className="btn btn-primary" to='{`${process.env.PUBLIC_URL}/admin/logout`}'>Logout</Link>
                                    </li>
                                </>
                                : 
                                <>
                                {/* 'none' */}
                                {/* <li className="nav-item active">
                                    <Link className="nav-link" to=''>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/adscategory'>Classifieds Category</Link>
                                </li> */}
                                </>
                                }
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
      
  }

export default Header;