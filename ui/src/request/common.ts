import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const ResponseDataOrNull = (response: AxiosResponse<any, any>) => {
	return response.data.message == "failure" ? null : response.data
}

export const GetRequest = (
	url: string,
	token: string,
	config?: AxiosRequestConfig<any> | undefined
) => {
	if (config == undefined) {
		config = {
			headers: {
				Authorization: token
			}
		}
		return axios.get(url, config)
	}
	if (config.headers == undefined) {
		config.headers = {
			Authorization: token
		}
		return axios.get(url, config)
	}
	config.headers.Authorization = token
	return axios.get(url, config)
}

export const PutRequest = (
	url: string,
	token: string,
	data?: any,
	config?: AxiosRequestConfig<any> | undefined
) => {
	if (data == null)
		throw new Error("No data was passed")
	if (config == undefined)
		return axios.put(url, data, config)
	if (config.headers == undefined) {
		config.headers = {
			Authorization: token
		}
		return axios.put(url, data, config)
	}
	config.headers.Authorization = token
	return axios.put(url, data, config)
}

export const PostRequest = (
	url: string,
	token: string,
	data?: any,
	config?: AxiosRequestConfig<any> | undefined
) => {
	if (data == null)
		throw new Error("No data was passed")
	if (config == undefined) {
		config = {
			headers: {
				Authorization: token
			}
		}
		return axios.post(url, data, config)
	}
	if (config.headers == undefined) {
		config.headers = {
			Authorization: token
		}
		return axios.post(url, data, config)
	}
	config.headers.Authorization = token
	return axios.post(url, data, config)
}

export const DeleteRequest = (
	url: string,
	token: string,
	config?: AxiosRequestConfig<any> | undefined
) => {
	if (config == undefined) {
		config = {
			headers: {
				Authorization: token
			}
		}
		return axios.delete(url)
	}
	if (config.headers == undefined) {
		config.headers = {
			Authorization: token
		}
		return axios.delete(url, config)
	}
	config.headers.Authorization = token
	return axios.delete(url, config)
}

export const PostRequestNoToken = (
	url: string,
	data?: any,
	config?: AxiosRequestConfig<any> | undefined
) => {
	if (data == null)
		throw new Error("No data was passed")
	return axios.post(url, data, config)
}