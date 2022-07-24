import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddStatus() {
    const [addStatus, setAddStatus] = useState({ 'id': '', 'status': '' });
    const [allStatus, setAllStatus] = useState('');
    const [isEditStatus, setIsEditStatus] = useState(false);

    const handleStatus = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if (isEditStatus) {
            var baseURL = 'https://www.janathads.com/api/status-update/' + addStatus.id + '/'
            await axios
                .put(baseURL, { 'status': addStatus.status })
                .then((response) => {
                });
            setIsEditStatus(false)
        } else {
            baseURL = 'https://www.janathads.com/api/status-create/'
            try {
                await axios
                    .post(baseURL, { 'status': addStatus.status })
                    .then((response) => {
                    });
            } catch (error) {
                console.log(error)
            }
        }
        setAddStatus({ 'id': '', 'status': '' });
        axiosStatusResponse()
    }

    const editStatus = (status) => {
        setIsEditStatus(true)
        setAddStatus(status)
    }

    const deleteStatus = (status) => {
        var baseURL = 'https://www.janathads.com/api/status-delete/' + status.id + '/'
        axios
            .delete(baseURL)
            .then((response) => {
                axiosStatusResponse()
            });

    }

    const axiosStatusResponse = async () => {
        const statusResponse = await axios.get('https://www.janathads.com/api/status-list/')
        setAllStatus(statusResponse.data)
        // const allStatus = await statusResponse.data
    }

    useEffect(() => {
        axiosStatusResponse()
    }, [])


    return (
        <div className="container py-5">
            <h4 className="linetitle mb-4">Add Status</h4>
            <div className="row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input onChange={(e) => setAddStatus({ 'id': addStatus.id, 'status': e.target.value })} value={addStatus.status} className="form-control" id="title" type="text" placeholder="Add Status here.." />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={handleStatus} type="submit" id="button-addon2">Add</button>
                        </div>
                    </div>

                    <ul className="list-group list-group-flush">
                        {allStatus ? (
                            allStatus.map(function (eachStatus, index) {
                                return (
                                    <li className="list-group-item d-flex px-0" key={index}>
                                        {eachStatus.status}
                                        <button onClick={() => editStatus(eachStatus)} className="btn btn-sm btn-warning ml-auto mr-2"><i className="fa fa-pencil mr-1"></i>Edit</button>
                                        <button onClick={() => deleteStatus(eachStatus)} className="btn btn-sm btn-danger delete"><i className="fa fa-trash mr-1"></i>Delete</button></li>

                                )
                            })
                        ) : null}
                    </ul>

                </div>
            </div></div>
    )

}

export default AddStatus;