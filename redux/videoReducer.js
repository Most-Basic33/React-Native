const initialState = {
    user: {},
    location: {}
}

const GET_USER = 'GET_USER';
const GET_LOCATION = 'GET_LOCATION';
 
export function getLocation(location){
    console.log(location, "redux!!")
    return{
        type: GET_LOCATION,
        payload: location
    }
}


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
                case GET_LOCATION:
                    console.log(payload, "REDUX REDUCER")
                    return {...state, location: payload}
            default:
                return state
    }
}