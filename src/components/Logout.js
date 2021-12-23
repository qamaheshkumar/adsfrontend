import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext.js";
import { useContext, useEffect } from 'react';

function Logout() {
    const history = useNavigate();
    const {contextState, contextDispatch } = useContext(UserContext);
    const contextUserDetail = JSON.parse(contextState)
    console.log('logout ', contextUserDetail.userId)
    useEffect(() => {
        if(contextUserDetail.userId){
            localStorage.setItem('user_detail', JSON.stringify({'userId':'', 'userName':''}));
            if(!localStorage.getItem('user_detail').userId){
                contextDispatch({type:'user', payload:{'isLoggedIn':false, 'userId':'', 'userName':''}})
            }
        }         
    })

    // localStorage.clear()
    // if(contextState.isLoggedIn){
    //     localStorage.clear()
    //     contextDispatch({type:'user', payload:{'isLoggedIn':false, 'userId':'', 'userName':''}});
    // }

    function handleLogin(){
        // history.push('/admin/login')
        history('/admin/login')
    }


    return (
        <div id="task-container">
            <div className="row d-flex align-items-center justify-content-center h-50">
                <div className="col-md-5 col-sm-5 col-xl-5 offset-xl-1">
                    <div className="form-outline mb-4">
                        <h6>You have logged out successfully</h6>
                    </div>

                    <div className="form-outline mb-4">
                        <h6>Would you like to login again. Please click here..    <a href="" onClick={()=>{handleLogin()}}>Login</a></h6>
                    </div>
                </div>
            </div>
        </div>
    )    
}

export default Logout;