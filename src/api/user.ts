import axios from "axios"
import { ISignUp } from "../store/slices/userSlice";

export const getTest = () => axios.get('/user/test');
export const signUp = (formData:ISignUp) => axios.post('/user/signup',formData);
export const signIn = (formData:ISignUp) => axios.post('/user/signin',formData);
export const getCurrentUser = () => axios.get('/user/current');
export const createTodo = (label:string) => axios.post('/todo/create',{label})
export const deleteTodo = (id: string) => axios.delete(`/todo/${id}`) 
export const checkTodo = (id: string) => axios.post(`/todo/check/${id}`)