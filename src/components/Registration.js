import { useNavigate } from 'react-router-dom';
import React, {useState} from 'react';
import axios from 'axios';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Registration() {
    console.log( ' Registration page')
    const [user_name, setUserName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_number, setUserNumber] = useState('');
    const [user_is_admin, setIsAdmin] = useState("0");

    const history = useNavigate();
    // const [user_email, setUserEmail] = useState('');
    // const [user_gender, setUserGender] = useState('');

    const initialValues = {
        user_name : "", 
        first_name : "",
        last_name : "",
        user_password : "",
        user_email : "",
        user_number : "",
        user_is_admin : "0",
    };
    const RegistrationSchema = Yup.object().shape({
        user_name: Yup.string().required("User name is required")
            .min(5, "Minimum characters required are 7")
            .max(20, "Maximum characters required are 20")
            .matches(/^[a-zA-Z0-9]*$/),
        first_name: Yup.string().required("First name is required")
            .min(1, "Minimum characters required are 7")
            .max(20, "Maximum characters required are 20"),
        last_name: Yup.string().required("Last name is required")
            .min(1, "Minimum characters required are 7")
            .max(20, "Maximum characters required are 20"),        
        user_password: Yup.string()
            .required("Password is required")
            .min(7, "Minimum characters required are 7")
            .max(20, "Maximum characters required are 20"),
        user_email: Yup.string().email().required("Email is required"),
        user_number: Yup.string().required("Phone Number is required")
            .matches(/^\d{10,10}$/, "Must be only digits and exactly 10 characters"),
            // .test('len', 'Must be exactly 10 characters', user_number => user_number && user_number.toString().length === 10),
        user_is_admin: Yup.number().required("Is Admin required"),                
    });    

    async function handleSubmitClick(userRegisterValues){
        
        // userGender = setUserGender()
        // user_is_admin = setIsAdmin()
        console.log('userItems 11 ==> ', userRegisterValues)
        let userItems = {
            'user_name':userRegisterValues.user_name, 
            'first_name':userRegisterValues.first_name, 
            'last_name':userRegisterValues.last_name, 
            'user_password':userRegisterValues.user_password, 
            'user_email':userRegisterValues.user_email, 
            'user_number':userRegisterValues.user_number, 
            'is_admin':userRegisterValues.user_is_admin
        }

        console.log('userItems ==> ', userItems)
        const response = '';
        // console.log(userItems)

        var baseURL = 'http://55mahesh.pythonanywhere.com/api/user-create/'
        await axios
        .post(baseURL, userItems)
        .then((response) => {
            console.log(response.data);
            alert('Registration successful..')
            // history.push('/admin/dashBoard')
            history('/admin/dashBoard')
        });

        // console.log('final -> ', response.data)
        // alert('Registration successful..')
        // history.push('/')
    }

    return (
        <Formik initialValues={initialValues} validationSchema={RegistrationSchema} onSubmit={(values) => {handleSubmitClick(values);}}>
            {(formik) => {
                // const { errors, touched, isValid, dirty } = formik;
                return (
                    <div id="task-container">
                        <Form>
                            <div className="col-md-12">
                                <label className="form-label" ><h3>Add New Admin User</h3></label>
                                {/* <form onSubmit={handleSubmit}  id="form"> */}
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_name" id="user_name" className="form-control form-control-sm" placeholder="user name"/>
                                            <ErrorMessage name="user_name" component="span" className="error" />
                                        {/* <input onChange={(e)=>setUserName(e.target.value)} className="form-control" id="user_name" value={user_name} type="text" name="user_name" placeholder="user name"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="first_name" id="first_name" className="form-control form-control-sm" placeholder="first name"/>
                                            <ErrorMessage name="first_name" component="span" className="error" />
                                        {/* <input onChange={(e)=>setFirstName(e.target.value)} className="form-control" id="first_name" value={first_name} type="text" name="first_name" placeholder="First name"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="last_name" id="last_name" className="form-control form-control-sm" placeholder="last name"/>
                                            <ErrorMessage name="last_name" component="span" className="error" />
                                        {/* <input onChange={(e)=>setLastName(e.target.value)} className="form-control" id="last_name" value={last_name} type="text" name="last_name" placeholder="Last name"/> */}
                                    </div>                                        
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_password" id="user_password" className="form-control form-control-sm" placeholder="password"/>
                                            <ErrorMessage name="user_password" component="span" className="error" />
                                        {/* <input onChange={(e)=>setUserPassword(e.target.value)} className="form-control" id="user_password" value={user_password} type="text" name="user_password" placeholder="Password"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_email" id="user_email" className="form-control form-control-sm" placeholder="email"/>
                                            <ErrorMessage name="user_email" component="span" className="error" />
                                        {/* <input onChange={(e)=>setUserEmail(e.target.value)} className="form-control" id="user_email" value={user_email} type="text" name="user_email" placeholder="Email"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_number" id="user_number" className="form-control form-control-sm" placeholder="phone number"/>
                                            <ErrorMessage name="user_number" component="span" className="error" />                                        
                                        {/* <input onChange={(e)=>setUserNumber(e.target.value)} className="form-control" id="user_number" value={user_number} type="text" name="user_number" placeholder="Phone Number"/> */}
                                    </div>
                                    {/* <div className="form-check">
                                        <label className="form-control-label" >is Admin</label>
                                        <input className="form-control-input" onChange={(e)=>setIsAdmin(e.target.value)} type="radio" name="user_is_admin" id="user_is_admin" value="1"/>
                                    </div> */}
                                    {/* <div style={{flex: 6}} className="form-group">
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={(e)=>setUserGender(e.target.value)} type="radio" name="user_gender" id="user_gender" value="1"/>
                                            <label className="form-check-label">male</label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={(e)=>setUserGender(e.target.value)} type="radio" name="user_gender" id="user_gender" value="0"/>
                                            <label className="form-check-label" >female</label>
                                        </div>
                                    </div> */}
                                    <div style={{flex: 1}}>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        {/* <input onclick={handleSubmitClick} id="submit" className="btn btn-warning" name="Submit" /> */}
                                    </div>
                                {/* </form> */}
                            </div>
                        </Form>
                    </div>                    
                );
            }}        
        </Formik>
    )
      
}

export default Registration;