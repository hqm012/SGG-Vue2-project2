import request from '@/utils/request';

const reqTrademarkInfo = (page, limit) => {
    return request({
        method: 'get',
        url: `/admin/product/baseTrademark/${page}/${limit}`
    })
}

const reqAddTrademark = (data) => {
    return request({
        method: 'post',
        url: `/admin/product/baseTrademark/save`,
        data
    })
}

const reqChangeTrademark = (data) => {
    return request({
        method: 'put',
        url: `/admin/product/baseTrademark/update`,
        data
    })
}

const reqFileUpload = () => {
    return request({
        method: 'get',
        url: `/admin/product/fileUpload`
    })
}
const reqDeleteTrademark = (id) => {
    return request({
        method: 'delete',
        url: `/admin/product/baseTrademark/remove/${id}`
    })
}

export { reqTrademarkInfo, reqAddTrademark, reqChangeTrademark, reqFileUpload, reqDeleteTrademark }