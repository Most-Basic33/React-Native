const initialState = {
    user: {},
    video: {}
}

const GET_USER = 'GET_USER',
      GET_MUSIC = 'GET_MUSIC';


export function getUser(user){
console.log(user)

    return {
        type: GET_USER,
        payload: user
    }

}

export default function reducer(state = initialState, action){
    const {type, payload} = action

    switch (type) {
        case GET_USER:
            return {...state, user:payload}
            
            break;
    
        default:
            break;
    }
}
