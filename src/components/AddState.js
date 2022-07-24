import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddState() {
    const [addState, setAddState] = useState({ 'id': '', 'state': '' });
    const [allState, setAllState] = useState('');
    const [isEditState, setIsEditState] = useState(false);

    const handleState = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if (isEditState) {
            var baseURL = 'https://www.janathads.com/api/state-update/' + addState.id + '/'
            await axios
                .put(baseURL, { 'state': addState.state })
                .then((response) => {
                });
            setIsEditState(false)
        } else {
            baseURL = 'https://www.janathads.com/api/state-create/'
            try {
                await axios
                    .post(baseURL, { 'state': addState.state })
                    .then((response) => {
                    });
            } catch (error) {
                console.log(error)
            }
        }
        setAddState({ 'id': '', 'state': '' });
        axiosStateResponse()
    }

    const editState = (state) => {
        setIsEditState(true)
        setAddState(state)
    }

    const deleteState = (state) => {
        var baseURL = 'https://www.janathads.com/api/state-delete/' + state.id + '/'
        axios
            .delete(baseURL)
            .then((response) => {
                axiosStateResponse()
            });

    }

    const axiosStateResponse = async () => {
        const stateResponse = await axios.get('https://www.janathads.com/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
    }

    useEffect(() => {
        axiosStateResponse()
    }, [])


    return (
        <div className="container py-5">
            <h4 className="linetitle mb-4">Add State</h4>
            <div className="row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input onChange={(e) => setAddState({ 'id': addState.id, 'state': e.target.value })} value={addState.state} className="form-control" id="title" type="text" placeholder="Add State here.." />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={handleState} type="submit" id="button-addon2">Add</button>
                        </div>
                    </div>

                    <ul className="list-group list-group-flush">
                        {allState ? (
                            allState.map(function (eachState, index) {
                                return (
                                    <li className="list-group-item d-flex px-0" key={index}>
                                        {eachState.state}
                                        <button onClick={() => editState(eachState)} className="btn btn-sm btn-warning ml-auto mr-2"><i className="fa fa-pencil mr-1"></i>Edit</button>
                                        <button onClick={() => deleteState(eachState)} className="btn btn-sm btn-danger delete"><i className="fa fa-trash mr-1"></i>Delete</button></li>

                                )
                            })
                        ) : null}
                    </ul>

                </div>
            </div>
        </div>
    )

}

export default AddState;