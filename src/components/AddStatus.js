import React, {useState, useEffect} from 'react';
import axios from 'axios';

function AddStatus() {
    console.log('Status page ')
    const [addStatus, setAddStatus] = useState({'id':'', 'status':''});
    const [allStatus, setAllStatus] = useState('');
    const [isEditStatus, setIsEditStatus] = useState(false);

   const handleStatus= () => {
    //    e.preventDefault();
        requestAxios()
    }

    const requestAxios = async () => {
        if(isEditStatus) {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/status-update/'+addStatus.id+'/'
            await axios
            .put(baseURL, {'status':addStatus.status})
            .then((response) => {
                console.log(response.data);
            });
            setIsEditStatus(false)
        } else {
            var baseURL = 'http://55mahesh.pythonanywhere.com/api/status-create/'
            try{
                await axios
                .post(baseURL, {'status':addStatus.status})
                .then((response) => {
                    console.log(response.data);
                });                
            } catch (error) {
                console.log(error)
            }    
        }
        setAddStatus({'id':'', 'status':''});
        axiosStatusResponse()
    }

    const editStatus = (status) => {
        setIsEditStatus(true)    
        console.log('status => ', status)    
        setAddStatus(status)
    }

    const deleteStatus = (status) => {
        console.log("Div is delete clicked -> ", status)
        var baseURL = 'http://55mahesh.pythonanywhere.com/api/status-delete/'+status.id+'/'
        // alert(baseURL)
        axios
        .delete(baseURL)
        .then((response) => {
            console.log(response.data);
            axiosStatusResponse()
        });
        
    }    

    const axiosStatusResponse = async () => {
        const statusResponse = await axios.get('http://55mahesh.pythonanywhere.com/api/status-list/')
        setAllStatus(statusResponse.data)
        const allStatus = await statusResponse.data
        console.log('allStatus ==> ', allStatus)
    }
    
    useEffect(() => {
        axiosStatusResponse()
    }, [])


    return (
        <div className="container">
            <div className="col-md-8">
                <label className="form-label" ><h4>Add Status Here...</h4></label>
                    <div  className="">
                        <div className="flex-wrapper">
                            <div style={{flex: 4}}>
                                <input onChange={(e)=>setAddStatus({'id':addStatus.id, 'status':e.target.value})} value={addStatus.status} className="form-control" id="title" type="text" placeholder="Add status here.." />
                            </div>
                            <div style={{flex: 1}}>
                                <button className="btn btn-primary" onClick={handleStatus} type="submit">Add</button>                                        
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {allStatus? (
                        allStatus.map(function(eachStatus, index){
                            return(
                                <div key={index} className="task-wrapper flex-wrapper">

                                    <div style={{flex:7}}>
                                        <span>{eachStatus.status}</span>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => editStatus(eachStatus)} className="btn btn-sm btn-outline-info">Edit</button>
                                    </div>

                                    <div style={{flex:1}}>
                                        <button onClick={() => deleteStatus(eachStatus)} className="btn btn-sm btn-outline-dark delete">-</button>
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

export default AddStatus;