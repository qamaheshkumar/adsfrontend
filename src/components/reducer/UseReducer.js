export const initialState = localStorage.getItem('user_detail');

export const reducer = (state, action) => {
    if(action.type === 'user'){
        localStorage.getItem('user_detail')
        return JSON.stringify(action.payload);
    }

    return state;
}