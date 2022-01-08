import { useParams, useNavigate } from 'react-router-dom';
import React, {useState, useEffect } from 'react';
import axios from 'axios';

function ViewClassified(){

    const [allCategory, setAllCategory] = useState('');
    const [allStatus, setAllStatus] = useState('');
    const [allState, setAllState] = useState('');
    const [allDistrict, setAllDistrict] = useState('');    
    const [updateAds, setUpdateAds] = useState('');

    const { addId } = useParams();
    console.log('addId ==> ', addId)

    const pathHistory = useNavigate()
    // console.log('pathHistory ==> ', pathHistory)

    function returnToPrev(){
        // pathHistory.goBack()
        pathHistory(-1)
    }

    const axiosClassifiedResponse = async () => {
        console.log('addId ++++++ ==> ', addId)
        // const tempId = addId.addId
        // const updateUrl = 'http://55mahesh.pythonanywhere.com/api/classified-update/'+addId+'/'
        // console.log('updateUrl ++++++ ==> ', updateUrl)
        const classifiedResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/classified-view/'+addId+'/')
        setUpdateAds(classifiedResponse.data)
        // const allState = await stateResponse.data
        console.log('updateAds **** ==> ', updateAds)

        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)
        // const allCategory = await categoryResponse.data
        console.log('allCategory ==> ', allCategory)

        const statusResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/status-list/')
        setAllStatus(statusResponse.data)
        // const allStatus = await statusResponse.data
        console.log('allStatus ==> ', allStatus)

        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
        console.log('allState ==> ', allState)
        
    }    

    useEffect(() => {
        axiosClassifiedResponse()
    }, [])    

    return (
        <div className="container">
            <div  className="col-md-8">
                <label className="form-label" ><h3>Classified Details :</h3></label>                   
                {/* <form onSubmit={handleSubmit}  id="form"> */}
                    <div style={{flex: 1}}>
                        <button onClick={returnToPrev} className="btn btn-primary">Back</button>
                    </div> 
                    <div style={{flex: 6}} className="form-group">
                    <label className="form-control-label" >Ad Title :</label>    
                        <label className="form-control-label">{updateAds?updateAds.title:''}</label>
                        {/* <input value={updateAds.title} className="form-control" id="classified_title" type="text" name="classified_title" placeholder="classified title"/> */}
                    </div>
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Description :</label>
                        <label className="form-control-label">{updateAds?updateAds.description:''}</label>
                        {/* <input value={updateAds.description} className="form-control" id="classified_desc" type="text" name="classified_desc" placeholder="classified description"/> */}
                    </div>
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Category :</label>
                        <label className="form-control-label">{updateAds?updateAds.category_id.category:''}</label>
                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                        {/*<select>
                        {updateAds?<option value={updateAds.category_id.id}>{updateAds.category_id.category}</option>:<option value="0">select</option>}
                        {/* {allCategory?
                            allCategory.map((category, index) =>{
                                return <option key={index} value={category.id}>{category.category}</option>
                            }) : <option >none</option>
                        } 
                        </select> */}
                    </div>
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Status :</label>
                        <label className="form-control-label">{updateAds?updateAds.status_id.status:''}</label>
                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'status_id':e.target.value})} className="form-control" id="classified_status" type="text" name="classified_status" placeholder="status"/> */}
                        {/*<select>
                        {updateAds?<option value={updateAds.status_id.id}>{updateAds.status_id.status}</option>:<option value="0">select</option>}
                         {allStatus?
                            allStatus.map((status, index) =>{
                                return <option key={index} value={status.id}>{status.status}</option>
                            }) : <option >none</option>
                        } 
                        </select>  */}                      
                    </div>                    
                    {/* <div style={{flex: 6}} className="form-group">
                        <input onChange={(e)=>setClassifieds({...addClassifieds, 'state':e.target.value})} className="form-control" id="classified_state" type="text" name="classified_state" placeholder="state"/>
                    </div> */}
                    {/*<div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Location State :</label>
                        <label className="form-control-label">{updateAds?updateAds.state_id.state:''}</label>
                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                        {/*<select >
                            {updateAds?<option value={updateAds.state_id.id}>{updateAds.state_id.state}</option>:<option value="0">select</option>}
                             {allState?
                                allState.map((state, index) =>{
                                    return <option key={index} value={state.id}>{state.state}</option>
                                }) : <option >none</option>
                            } 
                        </select>
                    </div>   */}                 
                    {/* <div style={{flex: 6}} className="form-group">
                        <input onChange={(e)=>setClassifieds({...addClassifieds, 'district':e.target.value})} className="form-control" id="classified_district" type="email" name="classified_district" placeholder="district"/>
                    </div> */}
                    {/*<div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Location District :</label>
                        <label className="form-control-label">{updateAds?updateAds.district_id.district:''}</label>
                        {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'category_id':e.target.value})} className="form-control" id="classified_category" type="text" name="classified_category" placeholder="category"/> */}
                        {/* <select >
                        {updateAds?<option value={updateAds.district_id.id}>{updateAds.district_id.district}</option>:<option value="0">select</option>}
                        {/* {allDistrict?
                            allDistrict.map((district, index) =>{
                                return <option key={index} value={district.id}>{district.district}</option>
                            }) : <option >none</option>
                        } 
                        </select>
                    </div>    */}                
                    {/* <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Zip Code :</label>
                        <label className="form-control-label">{typeof updateAds.zip_code !=='undefined' ?updateAds.zip_code:''}</label> */}
                        {/* <input value={typeof updateAds.zip_code !=='undefined'|| ''?updateAds.zip_code:''} className="form-control" id="classified_zipcode" type="text" name="classified_zipcode" placeholder="zipcode"/> */}
                    {/* </div> */}
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Phone Number :</label>
                        <label className="form-control-label">{typeof updateAds.phone_number !=='undefined'|| ''?updateAds.phone_number:''}</label>
                        {/* <input value={typeof updateAds.phone_number !=='undefined'|| ''?updateAds.phone_number:''} className="form-control" id="classified_phone_number" type="text" name="classified_phone_number" placeholder="phone number"/> */}
                    </div>                    

                    {/* <div style={{flex: 6}} className="form-group">
                        <input onChange={(e)=>setClassifieds({'is_hide':e.target.value})} className="form-control" id="classified_hide" type="radio" name="classified_hide" />
                    </div>                     */}
                    {/* <div className="form-check">
                        <label className="form-control-label" >is hide</label>
                        <input value={updateAds.is_hide?"1":"0"} checked={updateAds.is_hide?true:false} className="form-control-input" type="radio" name="user_is_admin" id="user_is_admin" />
                    </div> */}
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
                    {/* <div style={{flex: 1}}>
                        <button onClick={handleUpdateSubmitClick} className="btn btn-primary">Submit</button>
                        <input onclick={handleSubmitClick} id="submit" className="btn btn-warning" name="Submit" />
                    </div> */}

                    <ul className="list-inline product-meta">
                        <li className="list-inline-item">
                            <i className="fa fa-folder-open-o"></i>{updateAds?updateAds.state_id.state:''}
                        </li>										
                        <li className="list-inline-item">
                            <i className="fa fa-folder-open-o"></i>{updateAds?updateAds.district_id.district:''}
                        </li>
                        <li className="list-inline-item">
                            <i className="fa fa-calendar"></i>{typeof updateAds.zip_code !=='undefined' ?updateAds.zip_code:''}
                        </li>
                    </ul>

                    {updateAds.images ?
                    <div className="thumb-content">
                        {/* <div className="price">$200</div> */}
                        {/* <a href=""> */}
                            {/* <img className="card-img-top img-fluid" src="images/products/products-1.jpg" alt="Card image cap"/> */}
                            <img className="card-img-top img-fluid" src={ "http://55mahesh.pythonanywhere.com/media/"+updateAds.images} alt="image description"/>
                        {/* </a> */}
                    </div>
                    : ''
                    }

                   
                {/* </form> */}
            </div>  
            {/* {allStatus1?
                allStatus1.map((statis, index) => {
                    return <div key={index}> <img src={'http://55mahesh.pythonanywhere.com'+statis.images}  alt={statis.images} />  </div>
                })
            : 'none'
            } */}

        </div>
    )    
}

export default ViewClassified;