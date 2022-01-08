export const initialState = localStorage.getItem('user_detail');

export const reducer = (state, action) => {
    if(action.type === 'user'){
        const sessionItem = localStorage.getItem('user_detail')
        return JSON.stringify(action.payload);
    }

    return state;
}