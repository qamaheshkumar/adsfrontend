import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddState() {
    const [addState, setAddState] = useState({'id':'', 'state':''});
    const [allState, setAllState] = useState('');
    const [isEditState, setIsEditState] = useState(false);

   const handleState = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if(isEditState) {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/state-update/'+addState.id+'/'
            await axios
            .put(baseURL, {'state':addState.state})
            .then((response) => {
            });
            setIsEditState(false)
        } else {
            baseURL = 'http://55mahesh.pythonanywhere.com/api/state-create/'
            try{
                await axios
                .post(baseURL, {'state':addState.state})
                .then((response) => {
                });                
            } catch (error) {
                console.log(error)
            }    
        }
        setAddState({'id':'', 'state':''});
        axiosStateResponse()
    }

    const editState = (state) => {
        setIsEditState(true)    
        setAddState(state)
    }

    const deleteState = (state) => {
        var baseURL = 'http://55mahesh.pythonanywhere.com/api/state-delete/'+state.id+'/'
        axios
        .delete(baseURL)
        .then((response) => {
            axiosStateResponse()
        });
        
    }    

    const axiosStateResponse = async () => {
        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
        // const allState = await stateResponse.data
    }
    
    useEffect(() => {
        axiosStateResponse()
    }, [])


    return (
        <div className="container">
            <div className="col-md-8 justify-content-center">
                <label className="form-label" ><h4>Add State Here...</h4></label>
                    <div className="">
                        <div className="flex-wrapper">
                            <div style={{flex: 4}}>
                                <input onChange={(e)=>setAddState({'id':addState.id, 'state':e.target.value})} value={addState.state} className="form-control" id="title" type="text" placeholder="Add status here.." />
                            </div>
                            <div style={{flex: 1}}>
                                <button className="btn btn-primary" onClick={handleState} type="submit">Add</button>                                        
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {allState? (
                        allState.map(function(eachState, index){
                            return(
                                <div key={index} className="task-wrapper flex-wrapper">

                                    <div style={{flex:7}}>
                                        <span>{eachState.state}</span>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => editState(eachState)} className="btn btn-sm btn-outline-info">Edit</button>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => deleteState(eachState)} className="btn btn-sm btn-outline-dark delete">-</button>
                                    </div>

                                </div>
                            )
                        })
                        ): null}
                    </div>                            

            </div>

        </div>
    )
      
  }

export default AddState;