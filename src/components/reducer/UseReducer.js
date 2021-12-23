export const initialState = localStorage.getItem('user_detail');

export const reducer = (state, action) => {
    if(action.type === 'user'){
        const sessionItem = localStorage.getItem('user_detail')
        console.log('sessionItem ==> '+ sessionItem);
        // if(action.payload.isLoggedIn){
        //     return action.payload;            
        // } else {
        //     return action.payload.isLoggedIn=false;
        // }
        return JSON.stringify(action.payload);
    }

    return state;
}