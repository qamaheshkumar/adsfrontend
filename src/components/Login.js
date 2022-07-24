import { useNavigate, Link } from 'react-router-dom';
import React, { useContext } from 'react';
import axios from 'axios';
import { UserContext } from "./UserContext.js";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';



function Login() {
    const history = useNavigate();
    const { contextState, contextDispatch } = useContext(UserContext);
    const initialValues = { username: "", password: "" };
    const SignInSchema = Yup.object().shape({
        username: Yup.string().required("User name is required")
            .matches(/^[a-zA-Z0-9]*$/),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password is too short - should be 4 chars minimum")
            .max(15, "Password is too long - should be less than 20 chars"),
    });


    async function handleLogin(loginCredentials) {
        const response = '';
        let navigateTo = '';

        var url = 'https://www.janathads.com/api/user-login/' + loginCredentials.username + '/'
        try {
            const response = await axios.get(url);
            var strResponseData = (response.data); // stringify it
            if (strResponseData.user_password === loginCredentials.password) {
                const userDetail = JSON.stringify({ 'userId': strResponseData.id, 'userName': strResponseData.user_name }); // stringify it
                localStorage.setItem('user_detail', userDetail);
                contextDispatch({ type: 'user', payload: { 'isLoggedIn': true, 'userId': strResponseData.id, 'userName': strResponseData.user_name } })
                navigateTo = '/';
            } else {
                alert('Invalid login credentials.')
                navigateTo = '/superadmin/login/';
            }
        } catch (error) {
            navigateTo = '/superadmin/login';
        }
        history(navigateTo)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={(values) => { handleLogin(values); }}>
            {(formik) => {
                return (
                    <div id="task-container" className="container py-5">
                        <div className="row d-flex align-items-center justify-content-center">
                            <div className="col-md-6 col-lg-4">
                                <Form className="shadow p-5">
                                    <h4 className="heading text-center mb-4" >Login</h4>
                                    <div className="form-group">
                                        <Field type="text" name="username" id="username" className="form-control" placeholder="Username" />
                                        <ErrorMessage name="username" component="span" className="error small text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <Field type="password" name="password" id="password" className="form-control" placeholder="Password" />
                                        <ErrorMessage name="password" component="span" className="error small text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <Link to="/superadmin/forgotpassword">Forgot password?</Link>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-block">Sign in</button>
                                    </div>

                                </Form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    )

}

export default Login;