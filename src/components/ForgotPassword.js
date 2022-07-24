import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

function ForgotPassword() {
    const [userDetails, setUserDetails] = useState('');
    const history = useNavigate();
    const initialValues = { username: "", password: "" };
    const SignInSchema = Yup.object().shape({
        username: Yup.string().required("user name is required")
            .matches(/^[a-zA-Z0-9]*$/),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Password is too short - should be 4 chars minimum")
            .max(15, "Password is too long - should be less than 20 chars"),
    });

    async function setPassword(setPasswordData) {
        const userVerifyDetails = userDetails.filter(item => {
            return Object.keys(item).some(key => {
                return item[key].toString().toLowerCase() === (setPasswordData.username).toString().toLowerCase()
            })
        })
        if (userVerifyDetails.length === 1) {
            const userId = userVerifyDetails[0].id
            let userItems = {
                'user_name': userVerifyDetails[0].user_name,
                'first_name': userVerifyDetails[0].first_name,
                'last_name': userVerifyDetails[0].last_name,
                'user_password': setPasswordData.password,
                'user_email': userVerifyDetails[0].user_email,
                'user_number': userVerifyDetails[0].user_number,
                'is_admin': '0'
            }
            var baseURL = 'https://www.janathads.com/api/user-update/' + userId + '/'
            await axios
                .put(baseURL, userItems)
                .then((response) => {
                    alert('Updated user details successfully..')
                    history('/superadmin/login')
                });
        } else {
            alert('Invalid user name')
        }

    }

    function handleCacelClick() {
        history('/superadmin/login')
    }

    async function getAllUserDetails() {
        var url = 'https://www.janathads.com/api/user-list/'
        const response = await axios.get(url);
        setUserDetails(response.data)
    }

    useEffect(() => {
        getAllUserDetails()
    }, [])

    return (
        <Formik initialValues={initialValues} validationSchema={SignInSchema} onSubmit={(values) => { setPassword(values); }}>
            {(formik) => {
                return (
                    <div id="task-container" className="container py-5">
                        <div className="row d-flex align-items-center justify-content-center h-50">
                            <div className="col-md-6 col-lg-4">
                                <Form className="shadow p-5">
                                    <div>
                                        <h4 className="heading text-center mb-4">Reset Your Password</h4>
                                        <div className="form-group">
                                            <Field type="text" name="username" id="username" className="form-control" placeholder="Username" />
                                            <ErrorMessage name="username" component="span" className="error" />
                                        </div>
                                        <div className="form-group">
                                            <Field type="password" name="password" id="password" className="form-control" placeholder="New password" />
                                            <ErrorMessage name="password" component="span" className="error" />
                                        </div>
                                        <div className="form-group">
                                            <button type="submit" className="btn btn-primary btn-sm btn-block">Update Password</button>
                                            <button onClick={handleCacelClick} className="btn btn-link btn-sm btn-block">Back To Login</button>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );

}

export default ForgotPassword;