import * as api from '../../api'

export const getUser = (email: string) => async() => {
    try{
        const result =  await api.getUser(email)
        return result.data
    } catch(error){
        alert(error.message)
    }
}
