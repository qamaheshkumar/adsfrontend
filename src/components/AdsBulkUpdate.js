import { useNavigate } from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function AdsBulkUpdate() {
    console.log('District page')
    const [adsHideDays, setAdsHideDays] = useState('');

    const axiosBulkHideResponse = async () => {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/classified-bulk-update/?days='+adsHideDays
            await axios
            .get(baseURL)
            .then((response) => {
                console.log(response.data);
            });
            // setIsEditDistrict(false)
    }

    
    // useEffect(() => {
    //     axiosBulkHideResponse()
    // }, [])

    return (
        <div className="container">
            <div className="col-md-8">
                <label className="form-label" ><h4>Hide your ads here...</h4></label>
                    <div className="flex-wrapper">
                        <div style={{flex: 4}}>
                            <label className="form-label" >No of days to hide ads </label>
                            <input onChange={(e)=>setAdsHideDays(e.target.value)} value={adsHideDays} className="form-control" id="title" type="text" placeholder="Add status here.." />
                        </div>
                        <div style={{flex: 1}}>
                            <button className="btn btn-primary" onClick={axiosBulkHideResponse} type="submit">Add</button>                                        
                        </div>
                    </div>
            </div>
        </div>
    )
      
}

export default AdsBulkUpdate;