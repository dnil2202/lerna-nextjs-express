const INITIAL_STATE={
    id: null, 
    fullname: '',
    username: '',
    bio:'',
    email: '',
    status: '',
    status_id:null,
    images:'',
    posting:[],
    likes:[],
}

export const userReducer=(state=INITIAL_STATE,action)=>{
    console.log("Data Action", action)
    console.log(action.type)
    switch (action.type){
        case "LOGIN_SUCCESS":
            //state akan di concade dengan action pilot u/ mendptkan data terbaru
            console.log(action.payload)
            return{...state, ...action.payload}
        case "UPDATE_PROFILE":
            return {...state, ...action.payload}
        case "LOGOUT_SUCCESS":
            return INITIAL_STATE
        default:
            return state
    }
}