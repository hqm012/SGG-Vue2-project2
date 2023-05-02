import request from '@/utils/request';

const postSaveSpuInfo = (data) => {
    return request({
        method: 'post',
        url: `/admin/product/saveSpuInfo`,
        data
    })
}

const postUpdateSpuInfo = (data) => {
    return request({
        method: 'post',
        url: `/admin/product/updateSpuInfo`,
        data
    })
}

const getSpu = (page, limit, category3Id) => {
    return request({
        method: 'get',
        url: `/admin/product/${page}/${limit}`,
        params: {
            category3Id
        }
    })
}

const getTrademarkList = () => {
    return request({
        method: 'get',
        url: `/admin/product/baseTrademark/getTrademarkList`
    })
}

const getSaleAttrList = () => {
    return request({
        method: 'get',
        url: `/admin/product/baseSaleAttrList`
    })
}

const getSpuById = (id) => {
    return request({
        method: 'get',
        url: `/admin/product/getSpuById/${id}`
    })
}

const getSpuImageList = (id) => {
    return request({
        method: 'get',
        url: `/admin/product/spuImageList/${id}`
    })
}

const reqDeleteSpu = (id) => {
    return request({
        method: 'delete',
        url: `/admin/product/deleteSpu/${id}`
    })
}

const getSpuSaleAttrList = (id) => {
    return request({
        method: 'get',
        url: `/admin/product/spuSaleAttrList/${id}`
    })
}

export { postSaveSpuInfo, postUpdateSpuInfo, getSpu, getTrademarkList, getSaleAttrList, getSpuById, getSpuImageList, reqDeleteSpu, getSpuSaleAttrList }