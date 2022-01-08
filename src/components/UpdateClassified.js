import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UpdateClassified() {
    const pathHistory = useNavigate()
    const [addClassifieds, setClassifieds] = useState(
        {'id':'', 'title':'', 'description':'', 'images':'', 'state_id':'', 'district_id':'', 'zip_code':'',
        'category_id':'', 'status_id':'', 'users_id':'1', 'is_hide':'', 'phone_number':''}
    );
    const [allCategory, setAllCategory] = useState('');
    const [allStatus, setAllStatus] = useState('');
    const [allState, setAllState] = useState('');
    const [allDistrict, setAllDistrict] = useState('');
    const [updateAds, setUpdateAds] = useState('');
    const [isEditCategory, setIsEditCategory] = useState(false);
    const user_detail= JSON.parse(localStorage.getItem('user_detail'));
    const { addId } = useParams();

    const handleUpdateSubmitClick = (updateAdsValues) => {
        axiosAddClassifiedResponse(updateAdsValues)
    }

    const onStateChange = async (stateValueId) => {
    
    await axios.get('http://55mahesh.pythonanywhere.com/api/state_dist-detail/'+stateValueId+'/')
        .then((districResponse) => {
            setAllDistrict(districResponse.data)
        }
    )
}

    let initialValues = {
        classified_title : updateAds.title,
        classified_desc : updateAds.description,
        classified_image : updateAds.images,
        classified_category_id : updateAds.category_id,
        classified_status_id : updateAds.status_id,        
        classified_state_id : updateAds.state_id,
        classified_district_id : updateAds.district_id,
        classified_zipcode : updateAds.zip_code,
        classified_users_id : user_detail.userId,
        classified_phoneno : updateAds.phone_number,
        classified_is_hide : '',
    };
    if(isEditCategory){
        initialValues = {
            classified_title : updateAds.title,
            classified_desc : updateAds.description,
            classified_image : updateAds.images,
            classified_category_id : updateAds.category_id.id,
            classified_status_id : updateAds.status_id.id,        
            classified_state_id : updateAds.state_id.id,
            classified_district_id : updateAds.district_id.id,
            classified_zipcode : updateAds.zip_code,
            classified_users_id : user_detail.userId,
            classified_phoneno : updateAds.phone_number,
            classified_is_hide : '',
        };
    }


    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

    const adsSchema = Yup.object().shape({
        classified_title: Yup.string().required("User name is required")
            .min(5, "Minimum characters required are 7")
            .max(20, "Maximum characters required are 20"),
        classified_desc: Yup.string().required("First name is required")
            .min(5, "Minimum characters required are 7")
            .max(100, "Maximum characters required are 20"),
        classified_image: Yup.mixed()
            .when({
                is : (value) => typeof value==='string',
                then : Yup.string().test("file_format", "Uploaded 11 file has unsupported format.", value => value.length <= 60),
            otherwise : Yup.mixed()
                .test("file_size", "Uploaded file is too big.", value => !value || (value && value.size <= 150000))
                .test("file_format", "Uploaded file has unsupported format.", value => !value || (value && SUPPORTED_FORMATS.includes(value.type))),
            }),
        classified_category_id: Yup.string().required("Please select category")
        .test("file_size", "Uploaded file is too big.", value => !value || (value >= 1)),
        classified_status_id: Yup.string().nullable().required("Please select status"),
        classified_state_id: Yup.string().nullable().required("Please select state"),
        classified_district_id: Yup.string().nullable().required("Please select district"),
        classified_phoneno: Yup.string()
            .matches(/^\d{10,10}$/, "Must be only digits and exactly 10 characters")
            .nullable(),
        classified_zipcode: Yup.string().nullable()
            .matches(/^\d{6,6}$/, "Must be only digits and exactly 6 characters"),
        classified_is_hide: Yup.number().required("Is Admin required"),
    });

    const axiosAddClassifiedResponse = async (updateAdsValues) => {
        const formData = new FormData();
        if(updateAdsValues.classified_image && updateAdsValues.classified_image.name){
            formData.append('images', updateAdsValues.classified_image, updateAdsValues.classified_image.name);
        }
        formData.append('title', updateAdsValues.classified_title);
        formData.append('description', updateAdsValues.classified_desc);
        formData.append('state_id', updateAdsValues.classified_state_id);
        formData.append('district_id', updateAdsValues.classified_district_id);
        formData.append('zip_code', updateAdsValues.classified_zipcode);
        formData.append('is_hide', updateAdsValues.classified_is_hide);
        formData.append('category_id', updateAdsValues.classified_category_id);
        formData.append('status_id', updateAdsValues.classified_status_id);
        formData.append('users_id', updateAdsValues.classified_users_id);
        formData.append('phone_number', updateAdsValues.classified_phoneno);
        const headers = {
            "content-type": "multipart/form-data",
        }

        let baseURL = 'http://55mahesh.pythonanywhere.com/api/classified-update/'+addId+'/'
        try{
            await axios
            .put(baseURL, formData, {headers})
            .then((response) => {
                pathHistory('/admin/dashboard')
            });                
        } catch (error) {
            console.log(error)
        }
    }

    const axiosClassifiedResponse = async () => {
        const headers = {
            "content-type": "multipart/form-data",
        }        
        await axios.get('http://55mahesh.pythonanywhere.com/api/classified-edit/'+addId+'/', {headers})
        .then((classifiedResponse) =>{
            setUpdateAds(classifiedResponse.data)
            setIsEditCategory(true)
        })
    }    
    
    const axiosClassifiedOtherResponse = async () => {
        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)

        const statusResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/status-list/')
        setAllStatus(statusResponse.data)

        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
    }

    function returnToPrev(){
        pathHistory(-1)
    }    

   
    useEffect(() => {
        axiosClassifiedResponse()
        axiosClassifiedOtherResponse()
        if(isEditCategory){
            onStateChange(updateAds.state_id.id)
        }
        

    }, [isEditCategory])


    return (
        <Formik enableReinitialize initialValues={initialValues} validationSchema={adsSchema} onSubmit={(values) => {handleUpdateSubmitClick(values);}}>
            {(formik) => {
                const { errors, touched, isValid, dirty, handleChange, setFieldValue, values } = formik;
                return (
                    <div className="task-container">
                        <Form>
                            <div className="col-md-12">
                                <label className="form-label" ><h3>Update Classified Here...</h3></label>                   
                                    {updateAds.images ? 
                                    <div className="product-thumb">
                                        <label className="form-control-label" >Ad Image :</label>
                                        <img width="500px" height="300px" src={ "http://55mahesh.pythonanywhere.com/media/"+updateAds.images} alt="image description"/>
                                    </div>
                                    : ''
                                    }
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_title" type="text" name="classified_title" placeholder="ad title"/>
                                            <ErrorMessage name="classified_title" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="ad title"/>
                                            <ErrorMessage name="classified_desc" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <input className="form-control" id="classified_image" onChange={(e) => setFieldValue("classified_image", e.target.files[0])} type="file" accept="image/png, image/jpeg" name="classified_image"/>
                                            <ErrorMessage name="classified_image" component="span" className="error" />
                                    </div>                                        
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Category :</label>
                                            <Field as="select" name="classified_category_id">
                                                {isEditCategory && allCategory?
                                                    allCategory.map((category, index) =>{
                                                        if(values.classified_category_id.id !== category.id){
                                                            return <option key={index} value={category.id}>{category.category}</option>
                                                        }
                                                    }) : <option >none</option>
                                                }
                                            </Field>
                                                <ErrorMessage name="classified_category_id" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Status :</label>
                                            <Field as="select" name="classified_status_id" >
                                                {isEditCategory && allStatus?
                                                    allStatus.map((status, index) =>{
                                                        if(values.classified_status_id.id !== status.id){
                                                            return <option key={index} value={status.id}>{status.status}</option>
                                                        }    
                                                    }) : <option >none</option>
                                                }
                                            </Field>
                                                <ErrorMessage name="classified_status_id" component="span" className="error" />
                                    </div>

                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Location State :</label>
                                            <Field as="select" name="classified_state_id" onChange={(e) => { handleChange(e);  onStateChange(e.target.value, setFieldValue); }}>
                                            {isEditCategory && allState?
                                                allState.map((state, index) =>{
                                                    if(values.classified_state_id.id !== state.id){
                                                        return <option key={index} value={state.id}>{state.state}</option>
                                                    }
                                                }) : <option >none</option>
                                            }
                                            </Field>
                                                <ErrorMessage name="classified_state_id" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Location District :</label>
                                            <Field as="select" name="classified_district_id" >
                                            {allDistrict?
                                                allDistrict.map((district, index) =>{
                                                        return <option key={index} value={district.id}>{district.district}</option>
                                                }) : <option >none</option>
                                            }
                                            </Field>
                                                <ErrorMessage name="classified_district_id" component="span" className="error" />
                                    </div>                                    
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zip code"/>
                                            <ErrorMessage name="classified_zipcode" component="span" className="error" />
                                    </div>

                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_phoneno" type="text" name="classified_phoneno" placeholder="phone number"/>
                                            <ErrorMessage name="classified_phoneno" component="span" className="error" />
                                    </div>
                                    <div className="form-check">
                                        <label className="form-control-label" >{updateAds.is_hide == 0?'This ad is hidden from users':'This ad is viewable from users'}</label>
                                        <p>Please do update while updating the Ad.</p>
                                    </div>                                    
                                    <div className="form-check">
                                        <label className="form-control-label" >is hide</label>
                                            <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="0"/>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-control-label" >Un hide</label>
                                            <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="1"/>
                                                <ErrorMessage name="classified_is_hide" component="span" className="error" />
                                    </div>    

                                    <div style={{flex: 1}}>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                    <div style={{flex: 1}}>
                                        <button onClick={returnToPrev} className="btn btn-primary">Back</button>
                                    </div>                                    
                            </div>
                        </Form>
                    </div>
                );
            }}                
        </Formik>
    )
      
}

export default UpdateClassified;