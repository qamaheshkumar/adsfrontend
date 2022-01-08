import {Link} from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import React, {useEffect} from 'react';

function Header() {
    const {contextState, contextDispatch } = useContext(UserContext);
    const userContextDetails = JSON.parse(contextState)
    useEffect(()=> {
    }, [userContextDetails])  

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
                                    <Link className="nav-link" to='/aboutus'>About Us</Link>
                                </li>                                        
                                <li className="nav-item">
                                    <Link className="nav-link" to='/contactus'>Contact Us</Link>
                                </li> 
                                {contextState && userContextDetails.userId?
                                    <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to='/admin/dashBoard'>My Ads</Link>
                                    </li>    
                                    <li className="nav-item dropdown dropdown-slide">
                                        <Link className="nav-link dropdown-toggle" to='' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Add Items <span><i className="fa fa-angle-down"></i></span>
                                        </Link>
                                        <div className="dropdown-menu dropdown-menu-right">
                                            <Link className="dropdown-item" to='/admin/addclassifieds'>Add Classifieds</Link>
                                            <Link className="dropdown-item" to='/admin/addcategory'>Add Category</Link>
                                            <Link className="dropdown-item" to='/admin/addstatus'>Add Status</Link>
                                            <Link className="dropdown-item" to='/admin/addstate'>Add State</Link>
                                            <Link className="dropdown-item" to='/admin/adddistrict'>Add District</Link>
                                            <Link className="dropdown-item" to='/admin/adsBulkUpdate'>Ads Bulk Hide</Link>
                                            <Link className="dropdown-item" to='/admin/registration'>Add New Admin User</Link>
                                            <Link className="dropdown-item" to='/admin/userreport'>Admin Users Report</Link>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to=''>{}</Link>
                                    </li>
                                    <li className="nav-item">
                                        <h6 className="btn btn-outline-primary">{userContextDetails.userName}</h6>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="btn btn-primary" to='/admin/logout'>Logout</Link>
                                    </li>
                                </>
                                : 
                                <>
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