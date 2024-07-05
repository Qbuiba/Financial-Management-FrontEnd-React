import axios from 'axios';

const API_URL = 'api/auth/';

const register = async(username, password) => {
    try{
        const response = await axios.post(API_URL+'register', {
            username,
            password
        });

        if(response.data.token){
            localStorage.setItem('user',JSON.stringify(response.data))
        }
        return response.data;
    }catch(error){
        throw error.response.data.message || `Registration failed`;
    }
};

const login = async (username,password) =>{
    try {
        const response = await axios.post(API_URL + 'login', {
          username,
          password
        });
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      } catch (error) {
        throw error.response.data.message || 'Login failed';
      }
};

const logout = () =>{
    localStorage.removeItem('user');
}

export default{
    register,
    login,
    logout
};