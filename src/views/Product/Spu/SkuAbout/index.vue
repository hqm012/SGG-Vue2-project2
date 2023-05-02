<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>我是Sku相关页</span>
      </div>
      <el-form
        :model="form"
        ref="form"
        label-width="100px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="SPU名称">
          {{ spuInfo }}
        </el-form-item>
        <el-form-item label="SKU名称" size="normal">
          <el-input
            v-model="form.skuName"
            placeholder="sku名称"
            size="normal"
          ></el-input>
        </el-form-item>
        <el-form-item label="价格（元）" size="normal">
          <el-input
            v-model="form.price"
            placeholder="价格（元）"
            size="normal"
          ></el-input>
        </el-form-item>
        <el-form-item label="重量（千克）" size="normal">
          <el-input
            v-model="form.weight"
            placeholder="重量（千克）"
            size="normal"
          ></el-input>
        </el-form-item>
        <el-form-item label="规格描述" size="normal">
          <el-input
            type="textarea"
            :rows="2"
            v-model="form.skuDesc"
            placeholder=""
            :maxlength="144"
            :show-word-limit="true"
            :autosize="{ minRows: 2, maxRows: 4 }"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="平台属性" size="normal">
          <span v-for="attrInfo in attrInfoList" :key="attrInfo.id"
            >{{ attrInfo.attrName }}：
            <el-select
              v-model="attrInfo.attrInfoIdAndAttrValueId"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="attrValue in attrInfo.attrValueList"
                :key="attrValue.id"
                :label="attrValue.valueName"
                :value="`${attrValue.attrId}:${attrValue.id}`"
              >
              </el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="销售属性" size="normal">
          <span v-for="spuSaleAttr in spuSaleAttrList" :key="spuSaleAttr.id"
            >{{ spuSaleAttr.saleAttrName }}：
            <el-select
              v-model="spuSaleAttr.spuIdAndSaleAttrId"
              placeholder="请选择"
              clearable
              filterable
            >
              <el-option
                v-for="spuSaleAttrValue in spuSaleAttr.spuSaleAttrValueList"
                :key="spuSaleAttrValue.id"
                :label="spuSaleAttrValue.saleAttrValueName"
                :value="`${spuSaleAttrValue.spuId}:${spuSaleAttrValue.id}`"
              >
              </el-option>
            </el-select>
          </span>
        </el-form-item>
        <el-form-item label="图片列表" size="normal">
          <el-table
            ref="multipleTable"
            border
            :data="spuImageList"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column label="图片" align="center">
              <template v-slot="{ row }">
                <img :src="row.imgUrl" alt="" style="width: 90px" />
              </template>
            </el-table-column>
            <el-table-column label="名称" prop="imgName"> </el-table-column>
            <el-table-column label="操作">
              <template v-slot="{ row }">
                <el-button
                  type="primary"
                  size="default"
                  v-if="row.isDefault == 0"
                  @click="changeDefault(row)"
                  >设为默认</el-button
                >
                <el-button size="default" v-else>默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="sendData">立即创建</el-button>
          <el-button @click="$emit('changeScene', 0)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        skuName: "",
        price: "",
        weight: "",
        skuDesc: "",
        skuDefaultImg: "",
      },
      categoryInfo: {},
      spuInfo: {},
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      sendImageList: [],
    };
  },
  methods: {
    async skuInit(categoryInfo, spuInfo) {
      this.categoryInfo = categoryInfo;
      this.spuInfo = spuInfo;
      if (spuInfo) {
        let res1 = await this.$api.getSpuImageList(spuInfo.id);
        if (res1.code == 200) {
          let list = res1.data;
          list.forEach((item) => {
            item.isDefault = 0;
          });
          this.spuImageList = list;
        }
        let res2 = await this.$api.getSpuSaleAttrList(spuInfo.id);
        if (res2.code == 200) {
          this.spuSaleAttrList = res2.data;
        }
        let res3 = await this.$api.reqAttrInfo(
          categoryInfo.category1,
          categoryInfo.category2,
          categoryInfo.category3
        );
        if (res3.code == 200) {
          this.attrInfoList = res3.data;
        }
      }
    },
    async sendData() {
      const data = {
        category3Id: this.spuInfo.category3Id,
        spuId: this.spuInfo.id,
        tmId: this.spuInfo.tmId,
        ...this.form,
      };
      data.skuAttrValueList = this.attrInfoList.reduce((result, item) => {
        if (item.attrInfoIdAndAttrValueId) {
          const [attrId, valueId] = item.attrInfoIdAndAttrValueId.split(":");
          result.push({ attrId, valueId });
        }
        return result;
      }, []);
      data.skuSaleAttrValueList = this.spuSaleAttrList.reduce(
        (result, item) => {
          if (item.spuIdAndSaleAttrId) {
            const [saleAttrId, saleAttrValueId] =
              item.spuIdAndSaleAttrId.split(":");
            result.push({ saleAttrId, saleAttrValueId });
          }
          return result;
        },
        []
      );
      data.spuImageList = this.sendImageList.map((item) => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id,
        };
      });
      console.log(data);
      let res = await this.$api.postSaveSkuInfo(data);
      if (res.code == 200) {
        this.$emit("changeScene", 0);
      }
    },
    changeDefault(row) {
      this.spuImageList.forEach((item) => {
        item.isDefault = 0;
      });
      row.isDefault = 1;
      this.form.skuDefaultImg = row.imgUrl;
    },
    handleSelectionChange(val) {
      this.sendImageList = val;
    },
  },
};
</script>

<style>
</style>