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
    const pathHistory = useNavigate()

    function returnToPrev(){
        pathHistory(-1)
    }

    const axiosClassifiedResponse = async () => {
        const classifiedResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/classified-view/'+addId+'/')
        setUpdateAds(classifiedResponse.data)

        const categoryResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/category-list/')
        setAllCategory(categoryResponse.data)

        const statusResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/status-list/')
        setAllStatus(statusResponse.data)

        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
    }    

    useEffect(() => {
        axiosClassifiedResponse()
    }, [])    

    return (
        <div className="container">
            <div  className="col-md-8">
                <label className="form-label" ><h3>Classified Details :</h3></label>                   
                    <div style={{flex: 1}}>
                        <button onClick={returnToPrev} className="btn btn-primary">Back</button>
                    </div> 
                    <div style={{flex: 6}} className="form-group">
                    <label className="form-control-label" >Ad Title :</label>    
                        <label className="form-control-label">{updateAds?updateAds.title:''}</label>
                    </div>
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Description :</label>
                        <label className="form-control-label">{updateAds?updateAds.description:''}</label>
                    </div>
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Category :</label>
                        <label className="form-control-label">{updateAds?updateAds.category_id.category:''}</label>
                    </div>
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Status :</label>
                        <label className="form-control-label">{updateAds?updateAds.status_id.status:''}</label>
                    </div>                    
                    <div style={{flex: 6}} className="form-group">
                        <label className="form-control-label" >Ad Phone Number :</label>
                        <label className="form-control-label">{typeof updateAds.phone_number !=='undefined'|| ''?updateAds.phone_number:''}</label>
                    </div>                    
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
                            <img className="card-img-top img-fluid" src={ "http://55mahesh.pythonanywhere.com/media/"+updateAds.images} alt="image description"/>
                    </div>
                    : ''
                    }
            </div>  
        </div>
    )    
}

export default ViewClassified;