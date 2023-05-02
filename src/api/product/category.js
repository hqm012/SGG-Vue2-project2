import request from '@/utils/request';

const reqCategory1 = () => {
    return request({
        method: 'get',
        url: 'admin/product/getCategory1'
    })
}

const reqCategory2 = (category1Id) => {
    return request({
        method: 'get',
        url: `admin/product/getCategory2/${category1Id}`
    })
}

const reqCategory3 = (category2Id) => {
    return request({
        method: 'get',
        url: `admin/product/getCategory3/${category2Id}`
    })
}

export { reqCategory1, reqCategory2, reqCategory3 }