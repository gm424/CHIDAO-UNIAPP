//切换正式与测试站 HOST
export const isDevelopModel = process.env.NODE_ENV === 'development' ? true : false

// 测试环境

export const DEVELOP_HOST = `http://47.119.132.63:8091`

// 正式环境

export const PRODUCT_HOST = `http://erp.api.jiwangyun.com`
// export const PRODUCT_HOST = `http://47.119.132.63:8091`
