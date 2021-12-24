import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {UserContext} from './UserContext';
import { useNavigate} from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddClassifieds() {
    console.log('AddClassifieds page')
    // const {contextState, contextDispatch } = useContext(UserContext);
    const history = useNavigate();
    const user_detail= JSON.parse(localStorage.getItem('user_detail'));
    console.log('header user_detail => ' + user_detail)
    console.log('header user_detail => ' + user_detail.userId)    
    const [addClassifieds, setClassifieds] = useState(
        {'id':'', 'title':'', 'description':'', 'images':'', 'state_id':'', 'district_id':'', 'zip_code':'',
        'category_id':'', 'status_id':'', 'users_id':user_detail.userId, 'is_hide':'0', 'phone_number':''}
    );
    const [allCategory, setAllCategory] = useState('');
    const [allStatus, setAllStatus] = useState('');
    const [allState, setAllState] = useState('');
    const [allDistrict, setAllDistrict] = useState('');
    const [allStatus1, setAllStatus1] = useState('');
    const [isEditCategory, setIsEditCategory] = useState(false);

    console.log('addClassifieds', addClassifieds)

    const initialValues = {
        classified_title : "", 
        classified_desc : "",
        classified_image : "",
        classified_category_id : "",
        classified_status_id : "",        
        classified_state_id : "",
        classified_district_id : "",
        classified_zipcode : "",
        classified_users_id : user_detail.userId,
        classified_is_hide : "",
        classified_phonenum : "",
    };

    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

    const adsSchema = Yup.object().shape({
        classified_title: Yup.string().required("Ads title is required")
            .min(5, "Minimum characters required are 7")
            .max(20, "Maximum characters required are 20"),
            // .matches(/^[\w+\s]*$/, "title should contain only strings and numbers"),
        classified_desc: Yup.string().required("Ads description is required")
            .min(5, "Minimum characters required are 7")
            .max(100, "Maximum characters required are 20"),
            // .matches(/^[a-zA-Z0-9-\.\*\#\$\%\&\(\)\s]*$/, "Ads description should contain only strings and numbers"),
        classified_image: Yup.mixed()
            // .required("Please upload images")
            .test("file_size", "Uploaded file is too big.", value => !value || (value && value.size <= 150000))
            .test("file_format", "Uploaded file has unsupported format.Please use jpeg, jpg, png", value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
        classified_category_id: Yup.string().required("Please select category"),
        classified_status_id: Yup.string().required("Please select status"),
        classified_state_id: Yup.string().nullable().required("Please select state"),
            // .test('len', 'Please select state', value => !value),
        classified_district_id: Yup.string().nullable().required("Please select district"),
        // classified_category_id: Yup.number().test('len', 'Please select category', classified_category_id => classified_category_id !== ""),
        // classified_status_id: Yup.number().test('len', 'Please select status', classified_status_id => classified_status_id === ""),
        // classified_state_id: Yup.number().test('len', 'Please select state', classified_state_id => classified_state_id === ""),
        // classified_district_id: Yup.number().test('len', 'Please select district', classified_district_id => classified_district_id === ""),
        classified_phonenum: Yup.string()
            .matches(/^\d{10,10}$/, "Must be digits and characters required are 10."),
        classified_zipcode: Yup.string()
            .matches(/^\d{6,6}$/, "Must be digits and characters required are 6."),
            // .test('len', 'Must be exactly 10 characters', user_number => user_number && user_number.toString().length === 10),
        classified_is_hide: Yup.number().required("Update hide unhide required"),
    });    

    const handleSubmitClick = (adsValues) => {
        console.log('values click ==> ', adsValues)
        // console.log('addClassifieds click ==> ', addClassifieds)
        // setClassifieds({...addClassifieds, 'images':addClassifieds.images})  
        // const jsonData = JSON.parse(addClassifieds);
        // console.log('addClassifieds temp jsonData -> ', jsonData)              
        axiosAddClassifiedResponse(adsValues)
    }

    const axiosAddClassifiedResponse = async (adsValues) => {
        // const classifiedResponse = await axios.post('http://55mahesh.pythonanywhere.com/api/classified-create/')
        // setAllCategory(classifiedResponse.data)
        // const allCategory = await categoryResponse.data
        // console.log('allCategory ==> ', allCategory)
        const formData = new FormData();
        // console.log('addClassifieds axios -> ', addClassifieds.images)
        // console.log('addClassifieds axios name -> ', addClassifieds.images.name)

        console.log('addClassifieds temp 11111 jsonData -> ', adsValues) 
        console.log('addClassifieds temp 11111 jsonData -> ', adsValues.classified_image.name) 
        console.log('addClassifieds temp 11111 jsonData -> ', adsValues.classified_image) 

        formData.append('title', adsValues.classified_title);
        formData.append('description', adsValues.classified_desc);
        formData.append('zip_code', adsValues.classified_zipcode);
        formData.append('is_hide', adsValues.classified_is_hide);
        formData.append('category_id', adsValues.classified_category_id);
        formData.append('status_id', adsValues.classified_status_id);        
        formData.append('users_id', adsValues.classified_users_id);        
        formData.append('district_id', adsValues.classified_district_id);        
        formData.append('state_id', adsValues.classified_state_id);
        formData.append('phone_number', adsValues.classified_phonenum);
        if(adsValues.classified_image != ''){
            formData.append('images', adsValues.classified_image, adsValues.classified_image.name); 
        }

        // formData.append('images', addClassifieds.images.name);
        // formData.append('users', JSON.stringify(addClassifieds));
        console.log('addClassifieds axios formData -> ', formData)
        const headers = {
            "content-type": "multipart/form-data",
        }

                // setClassifieds({...addClassifieds, 'images':'E:/Django_React/classifieds_app/ads/ads/'+addClassifieds.images})  

        let baseURL = 'http://55mahesh.pythonanywhere.com/api/classified-create/'
        try{
            await axios
            .post(baseURL, formData, {headers})
            .then((response) => {
                console.log('response data', response.data);
                history('/admin/dashboard')
            });
        } catch (error) {
            console.log(error)
        }
    }

    const axiosClassifiedResponse = async () => {
        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)
        const allCategory = await categoryResponse.data
        console.log('allCategory ==> ', allCategory)

        const statusResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/status-list/')
        setAllStatus(statusResponse.data)
        const allStatus = await statusResponse.data
        console.log('allStatus ==> ', allStatus)

        // const statusResponse1 = await axios.get('http://55mahesh.pythonanywhere.com/api/classified-list/')
        // setAllStatus1(statusResponse1.data)
        // const allStatus1 = await statusResponse1.data
        // console.log('allStatus1 ==> ', allStatus1)

        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
        const allState = await stateResponse.data
        console.log('allState ==> ', allState)
        
    }

    const onStateChange = async (stateValueId, setFieldValue) => {
        console.log('stateValueId -> ', stateValueId)
        setClassifieds({...addClassifieds, 'state_id':stateValueId})
        setFieldValue('classified_district_id', '')
        // values.classified_district_id = ''
        // classified_status_id=''
        if(stateValueId){
            await axios.get('http://55mahesh.pythonanywhere.com/api/state_dist-detail/'+stateValueId+'/')    
                .then((districResponse) => {
                    setAllDistrict(districResponse.data)
                }
            )
        }

        // await districResponse.data
        // setAllDistrict(districResponse)
        // allDistrict = 
        console.log('allDistrict ==> ', allDistrict)        
    }
    
    useEffect(() => {
        axiosClassifiedResponse()
    }, [])


    return (
        <Formik initialValues={initialValues} validationSchema={adsSchema} onSubmit={(values) => {handleSubmitClick(values);}}>
            {(formik) => {
                const { errors, touched, isValid, dirty, handleChange, setFieldValue, values } = formik;
                // console.log(formik)
                return (
                    <div className="container">
                        <Form>
                            <div className="col-md-8">
                                <label className="form-label" ><h3>Add Classifieds Here...</h3></label>                   
                                {/* <form onSubmit={handleSubmit}  id="form"> */}
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_title" type="text" name="classified_title" placeholder="ad title"/>
                                            <ErrorMessage name="classified_title" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'title':e.target.value})} className="form-control" id="classified_title" type="text" name="classified_title" placeholder="classified title"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="ad descriptions"/>
                                            <ErrorMessage name="classified_desc" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'description':e.target.value})} className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="classified description"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        {/* <Field className="form-control" id="classified_image" type="file" accept="image/png, image/jpeg" name="classified_image"/> */}
                                        <input className="form-control" id="classified_image" onChange={(e) => setFieldValue("classified_image", e.target.files[0])} type="file" accept="image/png, image/jpeg" name="classified_image"/>
                                            <ErrorMessage name="classified_image" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'images':e.target.files[0]})} className="form-control" id="classified_image" accept="image/png, image/jpeg" type="file" name="classified_image" placeholder="add classified image here"/> */}
                                    </div>                                        
                                    {/* <div style={{flex: 6}} className="form-group">
                                        <input onChange={(e)=>setClassifieds({...addClassifieds, 'state':e.target.value})} className="form-control" id="classified_state" type="text" name="classified_state" placeholder="state"/>
                                    </div> */}
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Category :</label>
                                        <Field as="select" name="classified_category_id">
                                            <option value="">select</option>
                                            {allCategory?
                                                allCategory.map((category, index) =>{
                                                    return <option key={index} value={category.id}>{category.category}</option>
                                                }) : <option >none</option>
                                            }
                                        </Field>
                                            <ErrorMessage name="classified_category_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                                        {/* <select onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})}>
                                            <option value="0">select</option>
                                        {allCategory?
                                            allCategory.map((category, index) =>{
                                                return <option key={index} value={category.id}>{category.category}</option>
                                            }) : <option >none</option>
                                        }
                                        </select> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Status :</label>
                                        <Field as="select" name="classified_status_id">
                                            <option value="">select</option>                            
                                            {allStatus?
                                                allStatus.map((status, index) =>{
                                                    return <option key={index} value={status.id}>{status.status}</option>
                                                }) : <option >none</option>
                                            }
                                        </Field>
                                            <ErrorMessage name="classified_status_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'status_id':e.target.value})} className="form-control" id="classified_status" type="text" name="classified_status" placeholder="status"/> */}
                                        {/* <select onChange={(e)=>setClassifieds({...addClassifieds, 'status_id':e.target.value})}>
                                        <option value="0">select</option>                            
                                        {allStatus?
                                            allStatus.map((status, index) =>{
                                                return <option key={index} value={status.id}>{status.status}</option>
                                            }) : <option >none</option>
                                        }
                                        </select>                         */}
                                    </div>                                    
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Location State :</label>
                                        <Field as="select" value={values.classified_state_id} name="classified_state_id" onChange={(e) => { handleChange(e);  onStateChange(e.target.value, setFieldValue); }}>
                                            <option value="">select</option>
                                        {allState?
                                            allState.map((state, index) =>{
                                                return <option key={index} value={state.id}>{state.state}</option>
                                            }) : <option >none</option>
                                        }
                                        </Field>
                                            <ErrorMessage name="classified_state_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                                        {/* <select onChange={(e)=>onStateChange(e.target.value) }>
                                            <option value="0">select</option>
                                        {allState?
                                            allState.map((state, index) =>{
                                                return <option key={index} value={state.id}>{state.state}</option>
                                            }) : <option >none</option>
                                        }
                                        </select> */}
                                    </div>                    
                                    {/* <div style={{flex: 6}} className="form-group">
                                        <input onChange={(e)=>setClassifieds({...addClassifieds, 'district':e.target.value})} className="form-control" id="classified_district" type="email" name="classified_district" placeholder="district"/>
                                    </div> */}
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Location District :</label>
                                        <Field as="select" name="classified_district_id">
                                            <option value="">select</option>
                                        {allDistrict?
                                            allDistrict.map((district, index) =>{
                                                return <option key={index} value={district.id}>{district.district}</option>
                                            }) : <option >none</option>
                                        }
                                        </Field>
                                            <ErrorMessage name="classified_district_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                                        {/* <select onChange={(e)=>setClassifieds({...addClassifieds, 'district_id':e.target.value})}>
                                            <option value="0">select</option>
                                        {allDistrict?
                                            allDistrict.map((district, index) =>{
                                                return <option key={index} value={district.id}>{district.district}</option>
                                            }) : <option >none</option>
                                        }
                                        </select> */}
                                    </div>                    
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zip code"/>
                                            <ErrorMessage name="classified_zipcode" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'zip_code':e.target.value})} className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zipcode"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_phonenum" type="text" name="classified_phonenum" placeholder="phone number"/>
                                            <ErrorMessage name="classified_phonenum" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'zip_code':e.target.value})} className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zipcode"/> */}
                                    </div>                                    
                                    {/* <div style={{flex: 6}} className="form-group">
                                        <input onChange={(e)=>setClassifieds({'is_hide':e.target.value})} className="form-control" id="classified_hide" type="radio" name="classified_hide" />
                                    </div>                     */}
                                    <div className="form-check">
                                        <label className="form-control-label" >is hide</label>
                                        <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="0"/>
                                        {/* <input className="form-control-input" onChange={(e)=>setClassifieds({...addClassifieds, 'is_hide':e.target.value})} type="radio" name="user_is_admin" id="user_is_admin" value="1"/> */}
                                    </div>
                                    <div className="form-check">
                                        <label className="form-control-label" >Un hide</label>
                                        <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="1"/>
                                            <ErrorMessage name="classified_is_hide" component="span" className="error" />
                                        {/* <input className="form-control-input" onChange={(e)=>setClassifieds({...addClassifieds, 'is_hide':e.target.value})} type="radio" name="user_is_admin" id="user_is_admin" value="1"/> */}
                                    </div>                                    
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
                                        {/* <button onClick={handleSubmitClick} className="btn btn-primary">Submit</button> */}
                                        {/* <input onclick={handleSubmitClick} id="submit" className="btn btn-warning" name="Submit" /> */}
                                    </div>
                                {/* </form> */}
                            </div>
                        </Form>
                        {/* {allStatus1?
                            allStatus1.map((statis, index) => {
                                return <div key={index}> <img src={'http://55mahesh.pythonanywhere.com'+statis.images}  alt={statis.images} />  </div>
                            })
                        : 'none'
                        } */}
            
                    </div>                    
                );
            }}
        </Formik>    
    )
      
  }

export default AddClassifieds;