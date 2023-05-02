import request from '@/utils/request';

export const postSaveSkuInfo = (data) => {
    return request({
        method: 'post',
        url: "/admin/product/saveSkuInfo",
        data
    })
}

export const getFindBySpuId = (spuId) => {
    return request({
        method: 'get',
        url: `/admin/product/findBySpuId/${spuId}`
    })
}

export const getSkuList = (page, limit) => {
    return request({
        method: 'get',
        url: `/admin/product/list/${page}/${limit}`
    })
}

export const getOnSale = (skuId) => {
    return request({
        method: 'get',
        url: `/admin/product/onSale/${skuId}`
    })
}

export const getCancelSale = (skuId) => {
    return request({
        method: 'get',
        url: `/admin/product/cancelSale/${skuId}`
    })
}

export const getSkuById = (skuId) => {
    return request({
        method: "get",
        url: `/admin/product/getSkuById/${skuId}`
    })
}