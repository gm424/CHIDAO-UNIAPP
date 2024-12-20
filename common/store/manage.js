import Http from './http'
import { DEVELOP_HOST, PRODUCT_HOST, isDevelopModel } from '@/config/index.js'

const API_HOST = isDevelopModel ? DEVELOP_HOST : PRODUCT_HOST

/**
 * 获取 Token
 */
const getToken = () => {
  let token = uni.getStorageSync('token')
  console.log('token', token)
  return token
}

/**
 * 获取 语言
 */
const getApplicationLocale = () => {
  let applicationLocale = uni.getStorageSync('applicationLocale')
  return applicationLocale
}

/**
 * 获取 货币
 */
const getCurrency = () => {
  let currency = 'CNY'
  if (!uni.$u.test.isEmpty(uni.getStorageSync('currency'))) {
    currency = uni.getStorageSync('currency')
  }
  return currency
}

//post
export function postAction(url, data) {
  return Http.request(API_HOST + url, 'POST', 'json', data)
}

//get
export function getAction(url, data) {
  return Http.request(API_HOST + url, 'GET', 'json', data)
}

//put
export function putAction(url, data) {
  return Http.request(API_HOST + url, 'PUT', 'json', data)
}

//delete
export function deleteAction(url) {
  return Http.request(API_HOST + url, 'DELETE', 'json')
}
