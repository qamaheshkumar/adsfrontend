import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, convertToRaw, EditorState, convertFromRaw  } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

function AddClassifieds() {
    const history = useNavigate();
    const user_detail = JSON.parse(localStorage.getItem('user_detail'));
    const [addClassifieds, setClassifieds] = useState(
        {
            'id': '', 'title': '', 'description': '', 'images': '', 'state_id': '', 'district_id': '', 'zip_code': '',
            'category_id': '', 'status_id': '', 'users_id': user_detail.userId, 'is_hide': '0', 'phone_number': ''
        }
    );
    const [allCategory, setAllCategory] = useState('');
    const [allStatus, setAllStatus] = useState('');
    const [allState, setAllState] = useState('');
    const [allDistrict, setAllDistrict] = useState('');
    const [imgPath, setImagePath] = useState('');    

    const initialValues = {
        classified_title: "-",
        classified_desc:convertToRaw(ContentState.createFromText('-')),
        classified_image: "",
        classified_category_id: "",
        classified_status_id: "",
        classified_state_id: "",
        classified_district_id: "",
        classified_zipcode: "",
        classified_users_id: user_detail.userId,
        classified_is_hide: "",
        classified_phonenum: "",
    };

    const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

    const adsSchema = Yup.object().shape({
        // classified_title: Yup.string().required("Ads title is required")
        //     .min(1, "Minimum characters required are 7")
        //     .max(250, "Maximum characters required are 250"),
        //     // .matches(/^[\w+\s]*$/, "title should contain only strings and numbers"),
        // classified_desc: Yup.string().required("Ads description is required")
        //     .min(1, "Minimum characters required are 7")
        //     .max(768, "Maximum characters required are 768"),
            // .matches(/^[a-zA-Z0-9-\.\*\#\$\%\&\(\)\s]*$/, "Ads description should contain only strings and numbers"),
        classified_image: Yup.mixed()
            // .required("Please upload images")
            .test("file_size", "Uploaded file is too big.", value => !value || (value && value.size <= 15000000))
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
        axiosAddClassifiedResponse(adsValues)
    }

    const axiosAddClassifiedResponse = async (adsValues) => {
        const formData = new FormData();

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
        if (adsValues.classified_image !== '') {
            formData.append('images', adsValues.classified_image, adsValues.classified_image.name); 
        }

        // formData.append('images', addClassifieds.images.name);
        // formData.append('users', JSON.stringify(addClassifieds));
        const headers = {
            "content-type": "multipart/form-data",
        }
        
        let baseURL = 'https://www.janathads.com/api/classified-create/'
        try {
            await axios
            
                .post(baseURL, formData, { headers })
            .then((response) => {
                    history('/superadmin/dashboard')
            });
        } catch (error) {
            console.log(error)
        }
    }

    const axiosClassifiedResponse = async () => {
        const categoryResponse = await axios.get('https://www.janathads.com/api/category-list/')
        setAllCategory(categoryResponse.data)
        // const allCategory = await categoryResponse.data

        const statusResponse = await axios.get('https://www.janathads.com/api/status-list/')
        setAllStatus(statusResponse.data)
        // const allStatus = await statusResponse.data

        const stateResponse = await axios.get('https://www.janathads.com/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
    }

    const onStateChange = async (stateValueId, setFieldValue) => {
        setClassifieds({ ...addClassifieds, 'state_id': stateValueId })
        setFieldValue('classified_district_id', '')
        if (stateValueId) {
            await axios.get('https://www.janathads.com/api/state_dist-detail/' + stateValueId + '/')
                .then((districResponse) => {
                    setAllDistrict(districResponse.data)
                }
            )
        }
    }
    
    useEffect(() => {
        setImagePath(initialValues.classified_image)
        axiosClassifiedResponse()
    }, [])


    return (
        <Formik initialValues={initialValues} validationSchema={adsSchema} onSubmit={(values) => { handleSubmitClick(values); }}>
            {(formik) => {
                const { handleChange, setFieldValue, values } = formik;
                return (
                    <div className="container py-5">
                        <Form>
                            <div className="row">
                            <div className="col-md-8">
                                    <h3 className="linetitle mb-4">Add Classifieds</h3>
                                    <div className="form-group">
                                        <Field className="form-control" id="classified_title" type="text" name="classified_title" placeholder="Ad title" />
                                        <ErrorMessage name="classified_title" component="span" className="error small text-danger" />
                                    </div>
                                    <div className="form-group border border-secondary">
                                        {/* <Field className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="Ad descriptions" /> */}
                                        <Editor
                                            editorStyle={{ height: '200px' }}
                                            className="form-control"
                                            id="classified_desc"    
                                            type="text" 
                                            name="classified_desc"
                                            // editorState={initialValues.classified_desc}
                                            defaultContentState={initialValues.classified_desc}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"                                            
                                            onContentStateChange={(editorState) => 
                                                setFieldValue("classified_desc", draftToHtml(editorState))
                                            } 
                                        />  
                                        <ErrorMessage name="classified_desc" component="span" className="error small text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <div className="custom-file">
                                            <input className="custom-file-input" id="classified_image" onChange={(e) => {setFieldValue("classified_image", e.target.files[0]); setImagePath(e.target.files[0].name)}} type="file" accept="image/png, image/jpeg" name="classified_image" />
                                            <label className="custom-file-label" for="classified_image">{imgPath !=='' ? imgPath : 'Upload ads image here'}</label>
                                            <ErrorMessage name="classified_image" component="span" className="error small text-danger" /></div>
                                    </div>                                        
                                    <div className="form-group">
                                        <label className="form-control-label" >Ad Category :</label>
                                        <Field as="select" name="classified_category_id" className="custom-select">
                                            <option value="">Select</option>
                                            {allCategory ?
                                                allCategory.map((category, index) => {
                                                    return <option key={index} value={category.id}>{category.category}</option>
                                                }) : <option >none</option>
                                            }
                                        </Field>
                                        <ErrorMessage name="classified_category_id" component="span" className="error small text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label" >Ad Status :</label>
                                        <Field as="select" name="classified_status_id" className="custom-select">
                                            <option value="">Select</option>
                                            {allStatus ?
                                                allStatus.map((status, index) => {
                                                    return <option key={index} value={status.id}>{status.status}</option>
                                                }) : <option >none</option>
                                            }
                                        </Field>
                                        <ErrorMessage name="classified_status_id" component="span" className="error small text-danger" />
                                    </div>                                    
                                    <div className="form-group">
                                        <label className="form-control-label" >Ad Location State :</label>
                                        <Field as="select" value={values.classified_state_id} name="classified_state_id" onChange={(e) => { handleChange(e); onStateChange(e.target.value, setFieldValue); }} className="custom-select">
                                            <option value="">Select</option>
                                            {allState ?
                                                allState.map((state, index) => {
                                                return <option key={index} value={state.id}>{state.state}</option>
                                            }) : <option >none</option>
                                        }
                                        </Field>
                                        <ErrorMessage name="classified_state_id" component="span" className="error small text-danger" />
                                    </div>                    
                                    <div className="form-group">
                                        <label className="form-control-label" >Ad Location District :</label>
                                        <Field as="select" name="classified_district_id" className="custom-select">
                                            <option value="">Select</option>
                                            {allDistrict ?
                                                allDistrict.map((district, index) => {
                                                return <option key={index} value={district.id}>{district.district}</option>
                                            }) : <option >none</option>
                                        }
                                        </Field>
                                        <ErrorMessage name="classified_district_id" component="span" className="error small text-danger" />
                                    </div>
                                    <div className="form-group">
                                        <Field className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="Zip code" />
                                        <ErrorMessage name="classified_zipcode" component="span" className="error small text-danger" />
                                    </div>                    
                                    <div className="form-group">
                                        <Field className="form-control" id="classified_phonenum" type="text" name="classified_phonenum" placeholder="Phone number" />
                                        <ErrorMessage name="classified_phonenum" component="span" className="error small text-danger" />
                                    </div>
                                    {/* <div className="form-group">
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="classified_is_hide" name="classified_is_hide" className="custom-control-input" />
                                            <label className="custom-control-label" for="classified_is_hide">Is hide</label>
                                        </div>                                    
                                        <div className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" id="classified_un_hide" name="classified_is_hide" className="custom-control-input" />
                                            <label className="custom-control-label" for="classified_un_hide">Un hide</label>
                                        </div>
                                    </div>                */}
                                    <div className="form-group">
                                        <div className="custom-control custom-control-inline">
                                            <label>is hide</label>
                                            <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="0"/>
                                        </div>
                                        <div className="custom-control custom-control-inline">
                                            <label>Un hide</label>
                                            <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="1"/>
                                                <ErrorMessage name="classified_is_hide" component="span" className="error small text-danger" />
                                        </div>  
                                    </div>                                                           
                                    <div>
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                            </div>
                            </div>
                        </Form>
                    </div>                    
                );
            }}
        </Formik>    
    )
      
  }

export default AddClassifieds;