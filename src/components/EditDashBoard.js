import {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from "./UserContext.js";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function EditDashBoard(props){
    const {contextState, contextDispatch } = useContext(UserContext);    
    let location = useLocation();
    const objLoggedInUserId = JSON.parse(contextState)
    const loggedInUserId = objLoggedInUserId.userId
    const [userDetail, setUserDetail] = useState('');
    const [user_name, setUserName] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_password, setUserPassword] = useState('');
    const [user_email, setUserEmail] = useState('');
    const [user_number, setUserNumber] = useState('');
    const [user_is_admin, setIsAdmin] = useState("0");  
    
    const history = useNavigate();

    function handleCacelClick(){
        history('/admin/dashboard')
    }

    const initialValues = {
        user_name : userDetail.user_name, 
        first_name : userDetail.first_name,
        last_name : userDetail.last_name,
        user_password : userDetail.user_password,
        user_email : userDetail.user_email,
        user_number : userDetail.user_number,
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

    async function handleSubmitClick(formValues){
        let userItems = {
            'user_name':formValues.user_name, 
            'first_name':formValues.first_name, 
            'last_name':formValues.last_name, 
            'user_password':formValues.user_password, 
            'user_email':formValues.user_email, 
            'user_number':formValues.user_number, 
            'is_admin':'0'
        }
        var baseURL = 'http://55mahesh.pythonanywhere.com/api/user-update/'+loggedInUserId+'/'
        await axios
        .put(baseURL, userItems)
        .then((response) => {
            alert('Updated user details successfully..')
            history('/admin/dashboard')
        });
    }    

    const axiosUserDetailResponse = async () => {
        await axios.get('http://55mahesh.pythonanywhere.com/api/user-detail/'+loggedInUserId)
            .then((adsResponse) => {
                setUserDetail(adsResponse.data);
                setUserName(userDetail.user_name);
                setFirstName(userDetail.first_name);
                setLastName(userDetail.last_name);
                setUserPassword(userDetail.user_password);
                setUserEmail(userDetail.user_email);
                setUserNumber(userDetail.user_number);
                setIsAdmin("0");                
            }
		)
    }
        
	useEffect(() => {
        axiosUserDetailResponse()
    }, [user_name])

    return (
        <Formik initialValues={initialValues} enableReinitialize={true} validationSchema={RegistrationSchema} onSubmit={(values) => {handleSubmitClick(values);}}>
        {(formik) => {
            return (
                <div id="task-container">
                    <Form>
                        <div className="col-md-12">
                            <label className="form-label" ><h3>Edit User Profile</h3></label>                   
                                <div style={{flex: 10}} className="form-group">
                                    <Field disabled name="user_name" id="user_name" className="form-control form-control-sm" placeholder="user name"/>
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
                                <div style={{flex: 2}} className="form-group">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button onClick={handleCacelClick} className="btn btn-primary">Cancel</button>
                                </div>
                        </div>
                    </Form>
                </div>
            );    
        }}        
        </Formik>        
    )    
}

export default EditDashBoard;