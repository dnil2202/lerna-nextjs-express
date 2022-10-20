export const loginAction=(data)=>{
    console.log('data dari page LOGIN', data)
    return{
        type:"LOGIN_SUCCESS",
        payload : data
    }
}

export const logoutAction=()=>{
    localStorage.removeItem('guild')
    return {
        type: "LOGOUT_SUCCESS"
    }
}