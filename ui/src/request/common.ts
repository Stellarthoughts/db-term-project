import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuth from '../auth/useAuth';

export const ResponseDataOrNull = (response: AxiosResponse<any, any>) => {
	return response.data.message == "failure" ? null : response.data
}

export const GetRequest = (
	url: string,
	config?: AxiosRequestConfig<any> | undefined
) => {
	const auth = useAuth()
	if (auth.user == null)
		throw new Error("Not signed in")
	if (config == undefined) {
		config = {
			headers: {
				Authorization: auth.user.token
			}
		}
		return axios.get(url)
	}
	if (config.headers == undefined) {
		config.headers = {
			Authorization: auth.user.token
		}
		return axios.get(url, config)
	}
	config.headers.Authorization = auth.user.token
	return axios.get(url, config)
}

export const PutRequest = (
	url: string,
	data?: any,
	config?: AxiosRequestConfig<any> | undefined
) => {
	const auth = useAuth()
	if (auth.user == null)
		throw new Error("Not signed in")
	if (data == null)
		throw new Error("No data was passed")
	if (config == undefined)
		return axios.put(url, data, config)
	if (config.headers == undefined) {
		config.headers = {
			Authorization: auth.user.token
		}
		return axios.put(url, data, config)
	}
	config.headers.Authorization = auth.user.token
	return axios.put(url, data, config)
}

export const PostRequest = (
	url: string,
	data?: any,
	config?: AxiosRequestConfig<any> | undefined
) => {
	const auth = useAuth()
	if (auth.user == null)
		throw new Error("Not signed in")
	if (data == null)
		throw new Error("No data was passed")
	if (config == undefined)
		return axios.post(url, data, config)
	if (config.headers == undefined) {
		config.headers = {
			Authorization: auth.user.token
		}
		return axios.post(url, data, config)
	}
	config.headers.Authorization = auth.user.token
	return axios.post(url, data, config)
}

export const DeleteRequest = (
	url: string,
	config?: AxiosRequestConfig<any> | undefined
) => {
	const auth = useAuth()
	if (auth.user == null)
		throw new Error("Not signed in")
	if (config == undefined) {
		config = {
			headers: {
				Authorization: auth.user.token
			}
		}
		return axios.delete(url)
	}
	if (config.headers == undefined) {
		config.headers = {
			Authorization: auth.user.token
		}
		return axios.delete(url, config)
	}
	config.headers.Authorization = auth.user.token
	return axios.delete(url, config)
}