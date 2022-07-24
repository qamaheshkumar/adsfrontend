import { useParams, useNavigate,} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import draftToHtml from 'draftjs-to-html';

function ViewClassified() {

    const [allCategory, setAllCategory] = useState('');
    const [allStatus, setAllStatus] = useState('');
    const [allState, setAllState] = useState('');
    const [updateAds, setUpdateAds] = useState('');

    const { addId } = useParams();
    const pathHistory = useNavigate()

    function returnToPrev() {
        pathHistory(-1)
    }

    const axiosClassifiedResponse = async () => {
        const classifiedResponse = await axios.get('https://www.janathads.com/api/classified-view/' + addId + '/')
        setUpdateAds(classifiedResponse.data)

        const categoryResponse = await axios.get('https://www.janathads.com/api/category-list/')
        setAllCategory(categoryResponse.data)

        const statusResponse = await axios.get('https://www.janathads.com/api/status-list/')
        setAllStatus(statusResponse.data)

        const stateResponse = await axios.get('https://www.janathads.com/api/state-list/')
        setAllState(stateResponse.data)
    }  

    useEffect(() => {
        axiosClassifiedResponse()
    }, [])

    return (
        <div>
            <section className="hero-area bg-1 text-center text-white overlay">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="content-block">
                                <h1 className="display-4 mb-3">{updateAds ? updateAds.title : ''}</h1>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            <section className="">
                <div className="container bg-white mt-n5 z-index-1 position-relative rounded shadow p-4 mb-4">
                    <div className="row">
                        <div className="col-md-8">
                            <h2>{updateAds && updateAds.title !== '-' ? updateAds.title : ''} <span className="badge badge-success">{updateAds ? updateAds.status_id.status : ''}</span></h2>
                            <p className="text-muted pt-4" dangerouslySetInnerHTML={{ __html: updateAds ? updateAds.description.replace('/\n/g', '<br />') : ''}}></p>
                            {/* <p className="text-muted pt-4" >{updateAds && updateAds.description !== '-' ? updateAds.description : ''}</p> */}
                            {/* <p><i className="fa fa-tag mr-2 text-info"></i> {updateAds ? updateAds.category_id.category : ''}</p> */}
                            

                            <ul className="list-group list-group-flush">
                                <li className="list-group-item pl-0"><i className="fa fa-phone mr-3"></i>{typeof updateAds.phone_number !== 'undefined' && updateAds.phone_number !=='' && updateAds.phone_number !== 'null' ? updateAds.phone_number : ''}</li>
                                <li className="list-group-item pl-0"><i className="fa fa-map-o mr-3"></i>{updateAds && updateAds.description !== '' ? updateAds.state_id.state : ''}</li>
                                <li className="list-group-item pl-0"><i className="fa fa-map-marker mr-3"></i>{updateAds ? updateAds.district_id.district : ''}</li>
                                <li className="list-group-item pl-0"><i className="fa fa-calendar mr-3"></i>{updateAds.updated_at ? new Date(updateAds.updated_at).toISOString().slice(0, 10) : ''}</li>
                            </ul>

                        </div>
                        <div className="col-md-4">

                            {updateAds.images ?
                                <div className="">
                                    <img className="card-img-top img-fluid" src={"https://www.janathads.com/media/" + updateAds.images} alt="adsimage" />
                                </div>
                                : ''
                            }</div>
                    </div>
					<div className='d-flex justify-content-center'>
						{updateAds ? <button type="submit" onClick={returnToPrev} className="btn rounded-pill text-white mt-3 btn-brand">Back to My Ads</button> : ('No ads found for this category') }
					</div>                    
                </div>
            </section>

        </div>
    )
}

export default ViewClassified;