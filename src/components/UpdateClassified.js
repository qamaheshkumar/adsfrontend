import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function UpdateClassified() {
    console.log('AddClassifieds page')
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

    // console.log('addClassifieds', addClassifieds)

    // const addId = useParams();
    // console.log('addId ++++++ ==> ', addId.addId)

    const user_detail= JSON.parse(localStorage.getItem('user_detail'));
    // console.log('header user_detail => ' + user_detail)
    // console.log('header user_detail => ' + user_detail.userId)

    const { addId } = useParams();
    console.log('addId ==> ', addId)

    const handleUpdateSubmitClick = (updateAdsValues) => {
        // console.log('addClassifieds click ==> ', updateAdsValues)
        // setClassifieds({...addClassifieds, 'images':addClassifieds.images})  
        // const jsonData = JSON.parse(addClassifieds);
        // console.log('addClassifieds temp jsonData -> ', jsonData)              
        axiosAddClassifiedResponse(updateAdsValues)
    }


//    const handleCategory = () => {
//     //    e.preventDefault();
//         requestAxios()
//     }

const onStateChange = async (stateValueId) => {
    console.log('stateValueId -> ', stateValueId)
    // setClassifieds({...addClassifieds, 'state_id':stateValueId})

    await axios.get('http://127.0.0.1:8000/api/state_dist-detail/'+stateValueId+'/')
        .then((districResponse) => {
            setAllDistrict(districResponse.data)
        }
    )
    // await districResponse.data
    // setAllDistrict(districResponse)
    // allDistrict = 
    // console.log('allDistrict ==> ', allDistrict)   
}

    console.log('+++++++++++ update ads ', updateAds)

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
            // .matches(/^[a-zA-Z0-9\s]*$/, "title should contain only strings and numbers"),
        classified_desc: Yup.string().required("First name is required")
            .min(5, "Minimum characters required are 7")
            .max(100, "Maximum characters required are 20"),
            // .matches(/^[a-zA-Z0-9-\.\*\#\$\%\&\(\)\s]*$/, "description should contain only strings and numbers"),
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
            // .test('len', 'Please select state', value => !value),
        classified_district_id: Yup.string().nullable().required("Please select district"),
        // classified_category_id: Yup.number().test('len', 'Please select category', classified_category_id => classified_category_id !== ""),
        // classified_status_id: Yup.number().test('len', 'Please select status', classified_status_id => classified_status_id === ""),
        // classified_state_id: Yup.number().test('len', 'Please select state', classified_state_id => classified_state_id === ""),
        // classified_district_id: Yup.number().test('len', 'Please select district', classified_district_id => classified_district_id === ""),
        classified_phoneno: Yup.string()
            .matches(/^\d{10,10}$/, "Must be only digits and exactly 10 characters")
            .nullable(),
        classified_zipcode: Yup.string().nullable()
            .matches(/^\d{6,6}$/, "Must be only digits and exactly 6 characters"),
            // .test('len', 'Must be exactly 10 characters', user_number => user_number && user_number.toString().length === 10),
        classified_is_hide: Yup.number().required("Is Admin required"),
    });

    const axiosAddClassifiedResponse = async (updateAdsValues) => {
        // const classifiedResponse = await axios.post('http://127.0.0.1:8000/api/classified-create/')
        // setAllCategory(classifiedResponse.data)
        // const allCategory = await categoryResponse.data
        // console.log('allCategory ==> ', allCategory)
        const formData = new FormData();
        // console.log('addClassifieds axios -> ', addClassifieds.images)
        // console.log('addClassifieds axios name -> ', addClassifieds.images.name)

        console.log('addClassifieds temp 11111 jsonData -> ', updateAdsValues.classified_image) 
        console.log('addClassifieds temp 11111 jsonData -> ', typeof updateAdsValues.classified_image)

        if(updateAdsValues.classified_image && updateAdsValues.classified_image.name){
            console.log('m herer image ');
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
        // formData.append('images', addClassifieds.images.name);
        // formData.append('users', JSON.stringify(addClassifieds));
        console.log('addClassifieds axios formData -> ', formData)
        const headers = {
            "content-type": "multipart/form-data",
        }

                // setClassifieds({...addClassifieds, 'images':'E:/Django_React/classifieds_app/ads/ads/'+addClassifieds.images})  

        let baseURL = 'http://127.0.0.1:8000/api/classified-update/'+addId+'/'
        try{
            await axios
            .put(baseURL, formData, {headers})
            .then((response) => {
                console.log('response data', response.data);
                pathHistory('/admin/dashboard')
            });                
        } catch (error) {
            console.log(error)
        }
    }

    const axiosClassifiedResponse = async () => {
        console.log('addId ++++++ ==> ', addId)
        const headers = {
            "content-type": "multipart/form-data",
        }        
        // const tempId = addId.addId
        // const updateUrl = 'http://127.0.0.1:8000/api/classified-update/'+addId+'/'
        // console.log('updateUrl ++++++ ==> ', updateUrl)
        // const classifiedResponse = await axios.get('http://127.0.0.1:8000/api/classified-edit/'+addId+'/')
        // setUpdateAds(classifiedResponse.data)
        // const allState = await stateResponse.data
        await axios.get('http://127.0.0.1:8000/api/classified-edit/'+addId+'/', {headers})
        .then((classifiedResponse) =>{
            setUpdateAds(classifiedResponse.data)
            setIsEditCategory(true)
            // console.log('test **** ==> ', isEditCategory)
        })
        console.log('updateAds **** ==> ', updateAds)
        // console.log('test **** ==> ', isEditCategory)
    }    
    
    const axiosClassifiedOtherResponse = async () => {
        const categoryResponse = await axios.get('http://127.0.0.1:8000/api/category-list/')
        setAllCategory(categoryResponse.data)
        // const allCategory = await categoryResponse.data
        console.log('allCategory ==> ', allCategory)

        const statusResponse = await axios.get('http://127.0.0.1:8000/api/status-list/')
        setAllStatus(statusResponse.data)
        // const allStatus = await statusResponse.data
        console.log('allStatus ==> ', allStatus)

        const stateResponse = await axios.get('http://127.0.0.1:8000/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
        console.log('allState ==> ', allState)
    }

    function returnToPrev(){
        // pathHistory.goBack()
        pathHistory(-1)
    }    


    // console.log('updateAds 11 **** ==> ', updateAds)
    // console.log('test      11 **** ==> ', isEditCategory)    
    
    useEffect(() => {
        // setClassifieds({...addClassifieds, 'title':updateAds.title})
        // setClassifieds({...addClassifieds, 'description':updateAds.description})
        // setClassifieds({...addClassifieds, 'images':addClassifieds.images})
        // setClassifieds({...addClassifieds, 'state_id':updateAds.state_id})
        // setClassifieds({...addClassifieds, 'zip_code':updateAds.zip_code})
        // setClassifieds({...addClassifieds, 'is_hide':updateAds.is_hide})
        // setClassifieds({...addClassifieds, 'category_id':updateAds.category_id})
        // setClassifieds({...addClassifieds, 'status_id':updateAds.status_id})
        // setClassifieds({...addClassifieds, 'users_id':updateAds.users_id})
        axiosClassifiedResponse()
        axiosClassifiedOtherResponse()
        if(isEditCategory){
            console.log('user effet *********** ', updateAds.state_id.id)
            onStateChange(updateAds.state_id.id)
        }
        

    }, [isEditCategory])

    console.log('updateAds.image,      22 **** ==> ', updateAds.images)


    return (
        <Formik enableReinitialize initialValues={initialValues} validationSchema={adsSchema} onSubmit={(values) => {handleUpdateSubmitClick(values);}}>
            {(formik) => {
                const { errors, touched, isValid, dirty, handleChange, setFieldValue, values } = formik;
                // console.log('values ===> ', values);
                // console.log('initialValues ===> ', initialValues);
                return (
                    <div className="task-container">
                        <Form>
                            <div className="col-md-12">
                                <label className="form-label" ><h3>Update Classified Here...</h3></label>                   
                                {/* <form onSubmit={handleSubmit}  id="form"> */}
                                    {updateAds.images ? 
                                    <div className="product-thumb">
                                        <label className="form-control-label" >Ad Image :</label>
                                        <img width="500px" height="300px" src={ "http://127.0.0.1:8000"+updateAds.images} alt="image description"/>
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'title':e.target.value})} value={updateAds.title} className="form-control" id="classified_title" type="text" name="classified_title" placeholder="classified title"/> */}
                                    </div>
                                    : ''
                                    }
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_title" type="text" name="classified_title" placeholder="ad title"/>
                                            <ErrorMessage name="classified_title" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'title':e.target.value})} value={updateAds.title} className="form-control" id="classified_title" type="text" name="classified_title" placeholder="classified title"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="ad title"/>
                                            <ErrorMessage name="classified_desc" component="span" className="error" />
                                        {/* <input value={updateAds.description} onChange={(e)=>setClassifieds({...addClassifieds, 'description':e.target.value})} className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="classified description"/> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
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
                                                {/* {isEditCategory && values.classified_category_id.id?<option value={values.classified_category_id.id}>{values.classified_category_id.category}</option>:<option value="0">select</option>} */}
                                                {isEditCategory && allCategory?
                                                    allCategory.map((category, index) =>{
                                                        if(values.classified_category_id.id !== category.id){
                                                            return <option key={index} value={category.id}>{category.category}</option>
                                                        }
                                                    }) : <option >none</option>
                                                }
                                            </Field>
                                                <ErrorMessage name="classified_category_id" component="span" className="error" />
                                      
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                                        {/* <select onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})}>
                                        {updateAds?<option value={updateAds.category_id.id}>{updateAds.category_id.category}</option>:<option value="0">select</option>}
                                        {allCategory?
                                            allCategory.map((category, index) =>{
                                                return <option key={index} value={category.id}>{category.category}</option>
                                            }) : <option >none</option>
                                        }
                                        </select> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Status :</label>
                                            <Field as="select" name="classified_status_id" >
                                            {/* {isEditCategory && values.classified_status_id.id?<option value={values.classified_status_id.id}>{values.classified_status_id.status}</option>:<option value="0">select</option>}     */}
                                            {/* {updateAds?<option value={updateAds.status_id.id}>{updateAds.status_id.status}</option>:<option value="0">select</option>} */}
                                                {isEditCategory && allStatus?
                                                    allStatus.map((status, index) =>{
                                                        if(values.classified_status_id.id !== status.id){
                                                            return <option key={index} value={status.id}>{status.status}</option>
                                                        }    
                                                    }) : <option >none</option>
                                                }
                                            </Field>
                                                <ErrorMessage name="classified_status_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'status_id':e.target.value})} className="form-control" id="classified_status" type="text" name="classified_status" placeholder="status"/> */}
                                        {/* <select onChange={(e)=>setClassifieds({...addClassifieds, 'status_id':e.target.value})}>
                                        {updateAds?<option value={updateAds.status_id.id}>{updateAds.status_id.status}</option>:<option value="0">select</option>}
                                        {allStatus?
                                            allStatus.map((status, index) =>{
                                                return <option key={index} value={status.id}>{status.status}</option>
                                            }) : <option >none</option>
                                        }
                                        </select>                         */}
                                    </div>

                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Location State :</label>
                                            <Field as="select" name="classified_state_id" onChange={(e) => { handleChange(e);  onStateChange(e.target.value, setFieldValue); }}>
                                            {/* {updateAds?<option value={updateAds.state_id.id}>{updateAds.state_id.state}</option>:<option value="0">select</option>} */}
                                            {isEditCategory && allState?
                                                allState.map((state, index) =>{
                                                    if(values.classified_state_id.id !== state.id){
                                                        return <option key={index} value={state.id}>{state.state}</option>
                                                    }
                                                }) : <option >none</option>
                                            }
                                            </Field>
                                                <ErrorMessage name="classified_state_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                                        {/* <select onChange={(e)=>onStateChange(e.target.value) }>
                                            {updateAds?<option value={updateAds.state_id.id}>{updateAds.state_id.state}</option>:<option value="0">select</option>}
                                            {allState?
                                                allState.map((state, index) =>{
                                                    return <option key={index} value={state.id}>{state.state}</option>
                                                }) : <option >none</option>
                                            }
                                        </select> */}
                                    </div>
                                    <div style={{flex: 6}} className="form-group">
                                        <label className="form-control-label" >Ad Location District :</label>
                                            <Field as="select" name="classified_district_id" >
                                            {/* {updateAds?<option value={updateAds.district_id.id}>{updateAds.district_id.district}</option>:<option value="0">select</option>} */}
                                            {allDistrict?
                                                allDistrict.map((district, index) =>{
                                                    // if(values.classified_district_id.id !== district.id){
                                                        return <option key={index} value={district.id}>{district.district}</option>
                                                    // }
                                                }) : <option >none</option>
                                            }
                                            </Field>
                                                <ErrorMessage name="classified_district_id" component="span" className="error" />
                                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                                        {/* <select onChange={(e)=>setClassifieds({...addClassifieds, 'district_id':e.target.value})}>
                                        {updateAds?<option value={updateAds.district_id.id}>{updateAds.district_id.district}</option>:<option value="0">select</option>}
                                        {allDistrict?
                                            allDistrict.map((district, index) =>{
                                                return <option key={index} value={district.id}>{district.district}</option>
                                            }) : <option >none</option>
                                        }
                                        </select> */}
                                    </div>                                    
                                    {/* <div style={{flex: 6}} className="form-group">
                                        <input onChange={(e)=>setClassifieds({...addClassifieds, 'district':e.target.value})} className="form-control" id="classified_district" type="email" name="classified_district" placeholder="district"/>
                                    </div> */}
                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zip code"/>
                                            <ErrorMessage name="classified_zipcode" component="span" className="error" />
                                        {/* <input value={updateAds.zip_code} onChange={(e)=>setClassifieds({...addClassifieds, 'zip_code':e.target.value})} className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zipcode"/> */}
                                    </div>

                                    <div style={{flex: 6}} className="form-group">
                                        <Field className="form-control" id="classified_phoneno" type="text" name="classified_phoneno" placeholder="phone number"/>
                                            <ErrorMessage name="classified_phoneno" component="span" className="error" />
                                        {/* <input value={updateAds.zip_code} onChange={(e)=>setClassifieds({...addClassifieds, 'zip_code':e.target.value})} className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zipcode"/> */}
                                    </div>
                                    {/* <div style={{flex: 6}} className="form-group">
                                        <input onChange={(e)=>setClassifieds({'is_hide':e.target.value})} className="form-control" id="classified_hide" type="radio" name="classified_hide" />
                                    </div>                     */}
                                    <div className="form-check">
                                        <label className="form-control-label" >{updateAds.is_hide == 0?'This ad is hidden from users':'This ad is viewable from users'}</label>
                                        <p>Please do update while updating the Ad.</p>
                                    </div>                                    
                                    <div className="form-check">
                                        <label className="form-control-label" >is hide</label>
                                            <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="0"/>
                                                {/* <ErrorMessage name="classified_is_hide" component="span" className="error" /> */}
                                        {/* <label className="form-control-label" >is hide</label>
                                        <input className="form-control-input" checked={updateAds.is_hide?true:false} onChange={(e)=>setClassifieds({...addClassifieds, 'is_hide':e.target.value})} type="radio" name="user_is_admin" id="user_is_admin" value={updateAds.is_hide?"1":"0"}/> */}
                                    </div>
                                    <div className="form-check">
                                        <label className="form-control-label" >Un hide</label>
                                            <Field id="classified_is_hide" type="radio" name="classified_is_hide" value="1"/>
                                                <ErrorMessage name="classified_is_hide" component="span" className="error" />
                                        {/* <label className="form-control-label" >is hide</label>
                                        <input className="form-control-input" checked={updateAds.is_hide?true:false} onChange={(e)=>setClassifieds({...addClassifieds, 'is_hide':e.target.value})} type="radio" name="user_is_admin" id="user_is_admin" value={updateAds.is_hide?"1":"0"}/> */}
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
                                        {/* <input onclick={handleSubmitClick} id="submit" className="btn btn-warning" name="Submit" /> */}
                                    </div>
                                    <div style={{flex: 1}}>
                                        <button onClick={returnToPrev} className="btn btn-primary">Back</button>
                                    </div>                                    
                                {/* </form> */}
                            </div>
                        </Form>
                    </div>
                );
            }}                
        </Formik>
    )
      
}

export default UpdateClassified;