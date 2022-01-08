import { useNavigate } from 'react-router-dom';
import React from 'react';
import axios from 'axios';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';


function Registration() {
    const history = useNavigate();

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
        user_is_admin: Yup.number().required("Is Admin required"),                
    });    

    async function handleSubmitClick(userRegisterValues){
        let userItems = {
            'user_name':userRegisterValues.user_name, 
            'first_name':userRegisterValues.first_name, 
            'last_name':userRegisterValues.last_name, 
            'user_password':userRegisterValues.user_password, 
            'user_email':userRegisterValues.user_email, 
            'user_number':userRegisterValues.user_number, 
            'is_admin':userRegisterValues.user_is_admin
        }

        // const response = '';
        var baseURL = 'http://55mahesh.pythonanywhere.com/api/user-create/'
        await axios
        .post(baseURL, userItems)
        .then((response) => {
            alert('Registration successful..')
            history('/admin/dashBoard')
        });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={RegistrationSchema} onSubmit={(values) => {handleSubmitClick(values);}}>
            {(formik) => {
                return (
                    <div id="task-container">
                        <Form>
                            <div className="col-md-12">
                                <label className="form-label" ><h3>Add New Admin User</h3></label>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_name" id="user_name" className="form-control form-control-sm" placeholder="user name"/>
                                            <ErrorMessage name="user_name" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="first_name" id="first_name" className="form-control form-control-sm" placeholder="first name"/>
                                            <ErrorMessage name="first_name" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="last_name" id="last_name" className="form-control form-control-sm" placeholder="last name"/>
                                            <ErrorMessage name="last_name" component="span" className="error" />
                                    </div>                                        
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_password" id="user_password" className="form-control form-control-sm" placeholder="password"/>
                                            <ErrorMessage name="user_password" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_email" id="user_email" className="form-control form-control-sm" placeholder="email"/>
                                            <ErrorMessage name="user_email" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field type="text" name="user_number" id="user_number" className="form-control form-control-sm" placeholder="phone number"/>
                                            <ErrorMessage name="user_number" component="span" className="error" />                                        
                                    </div>
                                    <div style={{flex: 1}}>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                            </div>
                        </Form>
                    </div>                    
                );
            }}        
        </Formik>
    )
      
}

export default Registration;