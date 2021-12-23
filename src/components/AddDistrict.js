import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddDistrict() {
    console.log('District page')
    const [addDistrict, setAddDistrict] = useState({'id':'', 'district':'', 'state_id':'0'});
    const [allDistrict, setAllDistrict] = useState('');
    // const [selectState, setSelectState] = useState({'id':'', 'state':''});
    const [allState, setAllState] = useState('');
    const [isEditDistrict, setIsEditDistrict] = useState(false);

   const handleDistrict = () => {
    //    e.preventDefault();
    console.log('addDistrict -> ', addDistrict)
    // console.log('selectState => ', selectState)
        requestAxios()
    }

    const requestAxios = async () => {
        if(isEditDistrict) {
            var baseURL = 'http://127.0.0.1:8000/api/district-update/'+addDistrict.id+'/'
            await axios
            .put(baseURL, {'district':addDistrict.district, 'state_id':addDistrict.state_id})
            .then((response) => {
                console.log(response.data);
            });
            setIsEditDistrict(false)
        } else {
            var baseURL = 'http://127.0.0.1:8000/api/district-create/'
            try{
                await axios
                .post(baseURL, {'district':addDistrict.district, 'state_id':addDistrict.state_id})
                .then((response) => {
                    console.log(response.data);
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
        console.log('status edit => ', district)    
        setAddDistrict(district)
    }

    const deleteDistrict = (district) => {
        console.log("Div is delete clicked -> ", district)
        var baseURL = 'http://127.0.0.1:8000/api/district-delete/'+district.id+'/'
        // alert(baseURL)
        axios
        .delete(baseURL)
        .then((response) => {
            console.log(response.data);
            axiosDistrictResponse()
        });
        
    }    

    const axiosDistrictResponse = async () => {
        const districtResponse = await axios.get('http://127.0.0.1:8000/api/district-list/')
        setAllDistrict(districtResponse.data)
        const allDistrict = await districtResponse.data
        console.log('allDistrict ==> ', allDistrict)

        const stateResponse = await axios.get('http://127.0.0.1:8000/api/state-list/')
        setAllState(stateResponse.data)
        const allState = await stateResponse.data
        console.log('allState ==> ', allState)        
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
                            {/* <input onChange={(e)=>setClassifieds({...addClassifieds, 'status_id':e.target.value})} className="form-control" id="classified_status" type="text" name="classified_status" placeholder="status"/> */}
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