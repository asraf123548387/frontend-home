import axios from "axios";
const API_URL = "http://localhost:8080/api";

class UserService{
    saveUser(user){
        return axios.post(API_URL+"/saveUser",user);
    }
    saveAddUser(user){
        return axios.post(API_URL+"/adminSaveAddUser",user)
    }
    userLogin(formData){
        return axios.post(API_URL+"/login",formData)
    }
    forgotPassword(email){
        return axios.post(API_URL+"/forgotPassword",email)
    }
    resetPassword({otp,newPassword}){
        return axios.post(API_URL+"/verifyForgotPassword",{
            otp,
            newPassword
        })
    }
    

   
}
export default new UserService()