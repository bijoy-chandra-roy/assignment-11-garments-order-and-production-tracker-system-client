import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_api_url
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;