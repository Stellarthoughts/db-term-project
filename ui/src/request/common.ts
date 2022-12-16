/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { InvalidTokenError } from '../error/error'
import { LogFetchError } from './logError'

export const isFailed = (response: AxiosResponse<any, any>) => {
	return response.data.message == "failure"
}

export const isInvalidToken = (response: AxiosResponse<any, any>) => {
	return response.data.error == "Invalid Token" || response.data.error == "A token is required for authentication"
}

export const generalHandling = (err: any) => {
	if (err instanceof AxiosError) {
		LogFetchError(err)
		if (!err.response)
			throw err
		if (!isFailed(err.response))
			throw err
		if (isInvalidToken(err.response))
			throw new InvalidTokenError()
		else
			throw new Error("Response failed")
	}
	return null
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
		return axios.delete(url, config)
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