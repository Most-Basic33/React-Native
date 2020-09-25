const initialState = {
    user: {},
    video: {}
}

const GET_USER = 'GET_USER';
 


 export function getUser(user) {
console.log(user, 'user redux')
    return {
        type: GET_USER,
        payload: user
    }
}



export default function reducer(state = initialState, action) {
    const {type, payload} = action
    switch(type){
        case GET_USER:
            console.log(payload)
            return {...state, user: payload}
                
            default:
                return state
    }
}