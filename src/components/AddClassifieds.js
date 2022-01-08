import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function AddClassifieds() {
    const history = useNavigate();
    const user_detail= JSON.parse(localStorage.getItem('user_detail'));
    const [addClassifieds, setClassifieds] = useState(
        {'id':'', 'title':'', 'description':'', 'images':'', 'state_id':'', 'district_id':'', 'zip_code':'',
        'category_id':'', 'status_id':'', 'users_id':user_detail.userId, 'is_hide':'0', 'phone_number':''}
    );
    const [allCategory, setAllCategory] = useState('');
    const [allStatus, setAllStatus] = useState('');
    const [allState, setAllState] = useState('');
    const [allDistrict, setAllDistrict] = useState('');

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
        if(adsValues.classified_image !== ''){
            formData.append('images', adsValues.classified_image, adsValues.classified_image.name); 
        }

        // formData.append('images', addClassifieds.images.name);
        // formData.append('users', JSON.stringify(addClassifieds));
        const headers = {
            "content-type": "multipart/form-data",
        }

        let baseURL = 'http://55mahesh.pythonanywhere.com/api/classified-create/'
        try{
            await axios
            .post(baseURL, formData, {headers})
            .then((response) => {
                history('/admin/dashboard')
            });
        } catch (error) {
            console.log(error)
        }
    }

    const axiosClassifiedResponse = async () => {
        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)
        // const allCategory = await categoryResponse.data

        const statusResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/status-list/')
        setAllStatus(statusResponse.data)
        // const allStatus = await statusResponse.data

        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
    }

    const onStateChange = async (stateValueId, setFieldValue) => {
        setClassifieds({...addClassifieds, 'state_id':stateValueId})
        setFieldValue('classified_district_id', '')
        if(stateValueId){
            await axios.get('http://55mahesh.pythonanywhere.com/api/state_dist-detail/'+stateValueId+'/')    
                .then((districResponse) => {
                    setAllDistrict(districResponse.data)
                }
            )
        }
    }
    
    useEffect(() => {
        axiosClassifiedResponse()
    }, [])


    return (
        <Formik initialValues={initialValues} validationSchema={adsSchema} onSubmit={(values) => {handleSubmitClick(values);}}>
            {(formik) => {
                const {handleChange, setFieldValue, values } = formik;
                return (
                    <div className="container">
                        <Form>
                            <div className="col-md-8">
                                <label className="form-label" ><h3>Add Classifieds Here...</h3></label>                   
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_title" type="text" name="classified_title" placeholder="ad title"/>
                                            <ErrorMessage name="classified_title" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="ad descriptions"/>
                                            <ErrorMessage name="classified_desc" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <input className="form-control" id="classified_image" onChange={(e) => setFieldValue("classified_image", e.target.files[0])} type="file" accept="image/png, image/jpeg" name="classified_image"/>
                                            <ErrorMessage name="classified_image" component="span" className="error" />
                                    </div>                                        
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
                                    </div>                    
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
                                    </div>                    
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zip code"/>
                                            <ErrorMessage name="classified_zipcode" component="span" className="error" />
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_phonenum" type="text" name="classified_phonenum" placeholder="phone number"/>
                                            <ErrorMessage name="classified_phonenum" component="span" className="error" />
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
                            </div>
                        </Form>
                    </div>                    
                );
            }}
        </Formik>    
    )
      
  }

export default AddClassifieds;