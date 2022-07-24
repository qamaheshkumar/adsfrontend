import React, { useState } from 'react';
import axios from 'axios';


function AdsBulkUpdate() {
    const [adsHideDays, setAdsHideDays] = useState('');

    const axiosBulkHideResponse = async () => {
        var baseURL = 'https://www.janathads.com/api/classified-bulk-update/?days=' + adsHideDays
        await axios
            .get(baseURL)
            .then((response) => {
                alert('Data successfully updated')
            });
    }

    return (
        <div className="container py-5">
            <h4 className="linetitle mb-4">Hide your ads</h4>
            <div className="row">
                <div className="col-md-8">
                    <div className="input-group">
                        <input onChange={(e) => setAdsHideDays(e.target.value)} value={adsHideDays} className="form-control" id="title" type="text" placeholder="No of days to hide ads" />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={axiosBulkHideResponse} type="submit" id="button-addon2">Add</button>
                        </div>
                    </div>

                </div>
            </div></div>
    )

}

export default AdsBulkUpdate;