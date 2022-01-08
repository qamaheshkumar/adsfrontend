import { useNavigate, Link } from 'react-router-dom';
import React, {useState, useContext, useReducer} from 'react';
import axios from 'axios';
import { UserContext } from "./UserContext.js";
import Header from './Header.js';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';



function Login() {
    const [user_name, setUserName] = useState('');
    const [user_password, setUserPassword] = useState('');
    const history = useNavigate();
    const {contextState, contextDispatch } = useContext(UserContext);
    const initialState = {count: 0};
    const initialValues = { username: "", password: "" };
    const SignInSchema = Yup.object().shape({
        username: Yup.string().required("user name is required").
            matches(/^[a-zA-Z0-9]*$/),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password is too short - should be 4 chars minimum")
            .max(15, "Password is too long - should be less than 20 chars"),
    });    


    async function handleLogin(loginCredentials){
        let userItems = {user_name, user_password}
        const response = '';
        let navigateTo = '';

        var url = 'http://55mahesh.pythonanywhere.com/api/user-login/'+loginCredentials.username+'/'
        try {
            const response = await axios.get(url);
            var strResponseData = (response.data); // stringify it
            if(strResponseData.user_password === loginCredentials.password){
                const userDetail = JSON.stringify({'userId':strResponseData.id, 'userName':strResponseData.user_name}); // stringify it
                localStorage.setItem('user_detail', userDetail);
                contextDispatch({type:'user', payload:{'isLoggedIn':true, 'userId':strResponseData.id, 'userName':strResponseData.user_name}})
                navigateTo = '/';
            } else {
                alert('Invalid login credentials.')
                navigateTo = '/admin/login/';
            }
        } catch (error) {
            navigateTo = '/admin/login';
        }
        history(navigateTo)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={(values) => {handleLogin(values);}}>
            {(formik) => {
                return (
                    <div id="task-container">
                        <div className="row d-flex align-items-center justify-content-center h-50">
                        <Form>
                            <div>
                                <label className="form-label" ><h4>User Login :</h4></label>
                                <div className="form-outline mb-4">
                                    <Field type="text" name="username" id="username" className="form-control" placeholder="user name"/>
                                        <ErrorMessage name="username" component="span" className="error" />
                                </div>
                                <div className="form-outline mb-4">
                                    <Field type="password" name="password" id="password" className="form-control" placeholder="password"/>
                                        <ErrorMessage name="password" component="span" className="error"/>
                                </div>
                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <Link to="/admin/forgotpassword">Forgot password?</Link>
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm btn-block">Sign in</button>
                                <br></br>
                            </div>
                        </Form>    
                        </div>
                    </div>                    
                );
            }}   
        </Formik>
    )
      
  }

export default Login;