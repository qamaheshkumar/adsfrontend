import { useNavigate } from 'react-router-dom';
import { UserContext } from "./UserContext.js";
import { useContext, useEffect } from 'react';

function Logout() {
    const history = useNavigate();
    const { contextState, contextDispatch } = useContext(UserContext);
    const contextUserDetail = JSON.parse(contextState)
    useEffect(() => {
        if (contextUserDetail.userId) {
            localStorage.setItem('user_detail', JSON.stringify({ 'userId': '', 'userName': '' }));
            if (!localStorage.getItem('user_detail').userId) {
                contextDispatch({ type: 'user', payload: { 'isLoggedIn': false, 'userId': '', 'userName': '' } })
            }
        }
    })

    function handleLogin() {
        history('/superadmin/login')
    }


    return (
        <div id="task-container" className="container py-5">

            <h4>You have logged out successfully</h4>
            <p className="text-muted">Would you like to login again. Please click here..    <a href="" onClick={() => { handleLogin() }}>Login</a></p>
        </div>
    )
}

export default Logout;