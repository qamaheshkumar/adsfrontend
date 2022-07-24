import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddDistrict() {
    const [addDistrict, setAddDistrict] = useState({ 'id': '', 'district': '', 'state_id': '0' });
    const [allDistrict, setAllDistrict] = useState('');
    const [allState, setAllState] = useState('');
    const [isEditDistrict, setIsEditDistrict] = useState(false);

    const handleDistrict = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if (isEditDistrict) {
            var baseURL = 'https://www.janathads.com/api/district-update/' + addDistrict.id + '/'
            await axios
                .put(baseURL, { 'district': addDistrict.district, 'state_id': addDistrict.state_id })
                .then((response) => {
                });
            setIsEditDistrict(false)
        } else {
            baseURL = 'https://www.janathads.com/api/district-create/'
            try {
                await axios
                    .post(baseURL, { 'district': addDistrict.district, 'state_id': addDistrict.state_id })
                    .then((response) => {
                        setAllDistrict('')
                    });
            } catch (error) {
                console.log(error)
            }
        }

        setAddDistrict({ 'id': '', 'district': '', 'state_id': addDistrict.state_id });
        axiosDistrictResponse()
    }

    const editDistrict = (district) => {
        setIsEditDistrict(true)
        setAddDistrict(district)
    }

    const deleteDistrict = (district) => {
        var baseURL = 'https://www.janathads.com/api/district-delete/' + district.id + '/'
        axios
            .delete(baseURL)
            .then((response) => {
                axiosDistrictResponse()
            });

    }

    const axiosDistrictResponse = async () => {
        const districtResponse = await axios.get('https://www.janathads.com/api/district-list/')
        setAllDistrict(districtResponse.data)
        // const allDistrict = await districtResponse.data

        const stateResponse = await axios.get('https://www.janathads.com/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
    }

    useEffect(() => {
        axiosDistrictResponse()
    }, [])


    return (
        <div className="container py-5">
            <h4 className="linetitle mb-4">Add District</h4>
            <div className="row">
                <div className="col-md-8">
                    <div className="form-inline mb-3">
                        <select className="custom-select mr-3" onChange={(e) => setAddDistrict({ ...addDistrict, 'state_id': e.target.value })}>
                            {isEditDistrict ? <option value={addDistrict.state_id.id} >{addDistrict.state_id.state}</option>
                                : <option value="0">Select State</option>}
                            {allState ?
                                allState.map((state, index) => {
                                    return <option key={index} value={state.id} >{state.state}</option>
                                }) : <option >none</option>
                            }
                        </select>


                        <div className="input-group">
                            <input onChange={(e) => setAddDistrict({ ...addDistrict, 'id': addDistrict.id, 'district': e.target.value })} value={addDistrict.district} className="form-control" id="title" type="text" placeholder="Add District here.." />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" onClick={handleDistrict} type="submit" id="button-addon2">Add</button>
                            </div>
                        </div>


                    </div>

                    <ul className="list-group list-group-flush">
                        {allDistrict ? (
                            allDistrict.map(function (eachDistrict, index) {
                                return (
                                    <li className="list-group-item d-flex px-0" key={index}>
                                        {eachDistrict.state_id.state},
                                    {eachDistrict.district}
                                        <button onClick={() => editDistrict(eachDistrict)} className="btn btn-sm btn-warning ml-auto mr-2"><i className="fa fa-pencil mr-1"></i>Edit</button>
                                        <button onClick={() => deleteDistrict(eachDistrict)} className="btn btn-sm btn-danger delete"><i className="fa fa-trash mr-1"></i>Delete</button></li>

                                )
                            })
                        ) : null}
                    </ul>

                </div>
            </div></div>
    )

}

export default AddDistrict;