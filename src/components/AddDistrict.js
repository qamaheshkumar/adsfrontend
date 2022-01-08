import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddDistrict() {
    const [addDistrict, setAddDistrict] = useState({'id':'', 'district':'', 'state_id':'0'});
    const [allDistrict, setAllDistrict] = useState('');
    const [allState, setAllState] = useState('');
    const [isEditDistrict, setIsEditDistrict] = useState(false);

   const handleDistrict = () => {
        requestAxios()
    }

    const requestAxios = async () => {
        if(isEditDistrict) {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/district-update/'+addDistrict.id+'/'
            await axios
            .put(baseURL, {'district':addDistrict.district, 'state_id':addDistrict.state_id})
            .then((response) => {
            });
            setIsEditDistrict(false)
        } else {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/district-create/'
            try{
                await axios
                .post(baseURL, {'district':addDistrict.district, 'state_id':addDistrict.state_id})
                .then((response) => {
                    setAllDistrict('')
                });                
            } catch (error) {
                console.log(error)
            }    
        }
        
        setAddDistrict({'id':'', 'district':'', 'state_id':addDistrict.state_id});
        axiosDistrictResponse()
    }

    const editDistrict = (district) => {
        setIsEditDistrict(true)    
        setAddDistrict(district)
    }

    const deleteDistrict = (district) => {
        var baseURL = 'http://55mahesh.pythonanywhere.com/api/district-delete/'+district.id+'/'
        axios
        .delete(baseURL)
        .then((response) => {
            axiosDistrictResponse()
        });
        
    }    

    const axiosDistrictResponse = async () => {
        const districtResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/district-list/')
        setAllDistrict(districtResponse.data)
        const allDistrict = await districtResponse.data

        const stateResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/state-list/')
        setAllState(stateResponse.data)
        const allState = await stateResponse.data
    }
    
    useEffect(() => {
        axiosDistrictResponse()
    }, [])


    return (
        <div className="container">
            <div className="col-md-8">
                <label className="form-label" ><h4>Add District Here...</h4></label>
                    <div className="flex-wrapper">
                        <div style={{flex: 6}} className="form-control" width = "800%">
                            <select onChange={(e)=>setAddDistrict({...addDistrict, 'state_id':e.target.value})}>
                                {isEditDistrict? <option value={addDistrict.state_id.id} >{addDistrict.state_id.state}</option>
                                : <option value="0">select</option>}
                                {allState?
                                    allState.map((state, index) =>{
                                        return <option key={index} value={state.id} >{state.state}</option>
                                    }) : <option >none</option>
                                }
                            </select>                        
                        </div>                        
                        <div style={{flex: 4}}>
                            <input onChange={(e)=>setAddDistrict({...addDistrict, 'id':addDistrict.id,'district':e.target.value})} value={addDistrict.district} className="form-control" id="title" type="text" placeholder="Add status here.." />
                        </div>
                        <div style={{flex: 1}}>
                            <button className="btn btn-primary" onClick={handleDistrict} type="submit">Add</button>                                        
                        </div>
                    </div>

                    <div className="">
                        {allDistrict? (
                        allDistrict.map(function(eachDistrict, index){
                            return(
                                <div key={index} className="task-wrapper flex-wrapper">

                                    <div style={{flex:7}}>
                                        <div style={{flex:2}}>
                                            <span>{eachDistrict.state_id.state}</span>
                                        </div>
                                        <div style={{flex:2}}>
                                            <span>{eachDistrict.district}</span>
                                        </div>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => editDistrict(eachDistrict)} className="btn btn-sm btn-outline-info">Edit</button>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => deleteDistrict(eachDistrict)} className="btn btn-sm btn-outline-dark delete">-</button>
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

export default AddDistrict;