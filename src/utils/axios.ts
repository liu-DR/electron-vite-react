import instance from './request'
import { AxiosRequestConfig, Method } from 'axios'

const axios = <T>(
    url: string,
    params: any,
    method: Method,
    config?: AxiosRequestConfig,
): Promise<T> => {
    return new Promise((resolve, reject) => {
        let data = {};
        if(method === 'get' || method === 'delete') {
            data = { params }
        }
        if(method === 'post') {
            data = params ? { data: params } : {}
        }

        instance({
            url,
            method,
            ...config,
            ...data
        }).then(res => {
            if(res) {
                resolve(res?.data || '')
            }
        }).catch(error => {
            reject(error)
        })
    })
}

export const get = <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
) => {
    return axios<T>(url, params, 'get', config)
}

export const post = <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
) => {
    return axios<T>(url, params, 'post', config)
}

export const del = <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
) => {
    return axios<T>(url, params, 'delete', config)
}

export const put = <T>(
    url: string,
    params?: any,
    config?: AxiosRequestConfig
) => {
    return axios<T>(url, params, 'put', config)
}