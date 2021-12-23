import { useNavigate, Link } from 'react-router-dom';
import React, {useState, useContext, useReducer} from 'react';
import axios from 'axios';
import { UserContext } from "./UserContext.js";
import Header from './Header.js';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';



function Login() {
    console.log( ' login page')
    const [user_name, setUserName] = useState('');
    const [user_password, setUserPassword] = useState('');
    const history = useNavigate();
    const {contextState, contextDispatch } = useContext(UserContext);
    // const [user_email, setUserEmail] = useState('');
    // const [user_gender, setUserGender] = useState('');

    const initialState = {count: 0};

    // console.log('user ==> ' + JSON.stringify(userDetails))
    
    // console.log('user 11 ==> ' + user.user_id)

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
        // userGender = setUserGender()
        let userItems = {user_name, user_password}

        // console.log(user_name, user_password)
        console.log('loginCredentials => ' + JSON.stringify(loginCredentials))
        console.log('loginCredentials 11 => ' + loginCredentials.username)
        const response = '';
        let navigateTo = '';
        // console.log(userItems)

        var url = 'http://127.0.0.1:8000/api/user-login/'+loginCredentials.username+'/'
        try {
            const response = await axios.get(url);
            // var strResponseData = JSON.stringify(response.data); // stringify it
            var strResponseData = (response.data); // stringify it
            if(strResponseData.user_password === loginCredentials.password){
                // console.log('login response => ' + strResponseData.id);
                // // setUser({user:strResponseData.id, 'user_name':strResponseData.user_name})
                // // console.log('login response user ==> ' + JSON.stringify(user));            
                const userDetail = JSON.stringify({'userId':strResponseData.id, 'userName':strResponseData.user_name}); // stringify it
                localStorage.setItem('user_detail', userDetail);
                // const [state, dispatch] = useReducer(reducer, initialState);    
                // () => dispatch({type: 'increment'})
                contextDispatch({type:'user', payload:{'isLoggedIn':true, 'userId':strResponseData.id, 'userName':strResponseData.user_name}})
                alert('Login successful..')
                navigateTo = '/';
            } else {
                alert('Invalid login credentials.')
                navigateTo = '/admin/login/';
            }
        } catch (error) {
            console.error(error);
            // () => dispatch({type: 'decrement'})
            // const [user, setUser] = useState({user_id:'1', user_name:'mahesh'});
            // setUser({user_id:'1', user_name:'mahesh kumar'})
            navigateTo = '/admin/login';
        }

        console.log('final -> ', response)
        // history.push(navigateTo) 
        history(navigateTo)
    }

    return (
        <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={(values) => {handleLogin(values);}}>
            {(formik) => {
                // const { errors, touched, isValid, dirty } = formik;
                return (
                    <div id="task-container">
                        <div className="row d-flex align-items-center justify-content-center h-50">
                        <Form>
                            <div>
                                <label className="form-label" ><h4>User Login :</h4></label>
                                <div className="form-outline mb-4">
                                    {/* <label className="form-label" >User Name</label>   */}
                                    <Field type="text" name="username" id="username" className="form-control" placeholder="user name"/>
                                        <ErrorMessage name="username" component="span" className="error" />
                                    {/* <input onChange={(event)=>setUserName(event.target.value)} type="text" id="username" name="username" className="form-control form-control-sm" /> */}
                                </div>

                                <div className="form-outline mb-4">
                                    {/* <label className="form-label">Password</label> */}
                                    <Field type="password" name="password" id="password" className="form-control" placeholder="password"/>
                                        <ErrorMessage name="password" component="span" className="error"/>
                                    {/* <input onChange={(event)=>setUserPassword(event.target.value)} type="password" id="password" name="password" className="form-control form-control-sm" /> */}
                                </div>

                                <div className="d-flex justify-content-around align-items-center mb-4">
                                    <Link to="/admin/forgotpassword">Forgot password?</Link>
                                </div>
                                <button type="submit" className="btn btn-primary btn-sm btn-block">Sign in</button>
                                {/* <button type="submit" onClick={()=>{handleLogin()}} className="btn btn-primary btn-sm btn-block">Sign in</button> */}
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