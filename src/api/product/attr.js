import request from '@/utils/request';

const reqAttrInfo = (category1Id, category2Id, category3Id) => {
    return request({
        method: 'get',
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`
    })
}

const reqSaveAttr = (data) => {
    return request({
        method: 'post',
        url: `/admin/product/saveAttrInfo`,
        data
    })
}
/*
{
    attrName:'',
    attrValueList:[
        {
            attrId:0,
            valueName:''
        }
    ],
    categoryId:0,
    categoryLevel:0
}
*/
export { reqAttrInfo, reqSaveAttr }