import { Link } from 'react-router-dom';
import { useContext } from "react";
import { UserContext } from "./UserContext.js";
import React, { useEffect } from 'react';
import logo from '../utilities/images/logo.png';

function Header() {
    const { contextState, contextDispatch } = useContext(UserContext);
    const userContextDetails = JSON.parse(contextState)
    useEffect(() => {
    }, [userContextDetails])

    return (
        <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light shadow">
            <div className="container">
                <Link className="navbar-brand" to="">
                    <img src={logo} alt="logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav main-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to=''>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/aboutus'>About Us</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to='/contactus'>Contact Us</Link>
                        </li>
                        {contextState && userContextDetails.userId ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/superadmin/dashBoard'>My Ads</Link>
                                </li>
                                <li className="nav-item dropdown dropdown-slide">
                                    <Link className="nav-link dropdown-toggle" to='' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Add Items
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to='/superadmin/addclassifieds'>Add Classifieds</Link>
                                        <Link className="dropdown-item" to='/superadmin/addcategory'>Add Category</Link>
                                        <Link className="dropdown-item" to='/superadmin/addstatus'>Add Status</Link>
                                        <Link className="dropdown-item" to='/superadmin/addstate'>Add State</Link>
                                        <Link className="dropdown-item" to='/superadmin/adddistrict'>Add District</Link>
                                        <Link className="dropdown-item" to='/superadmin/adsBulkUpdate'>Ads Bulk Hide</Link>
                                        <Link className="dropdown-item" to='/superadmin/registration'>Add New Admin User</Link>
                                        <Link className="dropdown-item" to='/superadmin/userreport'>Admin Users Report</Link>
                                    </div>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to=''>{}</Link>
                                </li>
                                <li className="nav-item dropdown dropdown-slide">
                                    <Link className="nav-link dropdown-toggle text-capitalize" to='' data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {userContextDetails.userName}
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <Link className="dropdown-item" to='/superadmin/logout'>Logout</Link>
                                    </div>
                                </li>
                            </>
                            :
                            <>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>


    )

}

export default Header;