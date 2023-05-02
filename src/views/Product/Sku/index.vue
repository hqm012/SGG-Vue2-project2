<template>
  <div class="app-container">
    <el-table border stripe :data="skuInfo.records">
      <el-table-column
        v-for="(col, index) in columns"
        :prop="col.prop"
        :key="index"
        :label="col.label"
        :width="col.width"
        :type="col.type"
      >
        <template v-if="index == 3 || index == 6" v-slot="{ row }">
          <img
            v-if="index == 3"
            :src="row.skuDefaultImg"
            alt=""
            style="height: 100px"
          />
          <div v-if="index == 6">
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-arrow-up"
              @click="btnOnSale(row)"
              >上架</el-button
            >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-arrow-down "
              @click="btnCancelSale(row)"
              >下架</el-button
            >
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-info"
              @click="showSkuInfo(row)"
            ></el-button>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-delete"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="->,total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      background
    >
      :pager-count="7">
    </el-pagination>
    <el-drawer
      title="SKU信息"
      :visible.sync="drawer"
      :direction="direction"
      size="50%"
    >
      <el-row :gutter="20">
        <el-col :span="5">名称</el-col
        ><el-col :span="16">{{ skuItemInfo.skuName }}</el-col>
        <el-col :span="5">描述</el-col
        ><el-col :span="16">{{ skuItemInfo.skuDesc }}</el-col>
        <el-col :span="5">价格</el-col
        ><el-col :span="16">{{ skuItemInfo.price }}</el-col>
      </el-row>

      <el-row :gutter="20">
        <el-col :span="5">平台属性</el-col
        ><el-col :span="16"
          ><el-tag
            v-for="skuAttrValue in skuItemInfo.skuAttrValueList"
            :key="skuAttrValue.id"
            size="mini"
            >{{ skuAttrValue.attrName }}</el-tag
          >
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="5">商品图片</el-col
        ><el-col :span="16"
          ><el-carousel height="150px">
            <el-carousel-item
              v-for="skuImage in skuItemInfo.skuImageList"
              :key="skuImage.id"
            >
              <img :src="skuImage.imgUrl" alt="" />
            </el-carousel-item> </el-carousel
        ></el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: "Sku",
  data() {
    return {
      columns: [
        { label: "序号", width: "80", type: "index" },
        { label: "名称", prop: "skuName" },
        { label: "描述", prop: "skuDesc" },
        { label: "默认图片", prop: "" },
        { label: "重量（KG）", prop: "weight" },
        { label: "价格（元）", prop: "price" },
        { label: "操作", prop: "" },
      ],
      currentPage: 1,
      pageSize: 5,
      totalNum: 100,
      skuInfo: {},
      drawer: false,
      direction: "rtl",
      skuItemInfo: {},
    };
  },
  methods: {
    async handleSizeChange(val) {
      this.pageSize = val;
      await this.skuPageInit();
    },
    async handleCurrentChange(val) {
      this.currentPage = val;
      await this.skuPageInit();
    },
    async skuPageInit() {
      let res = await this.$api.getSkuList(this.currentPage, this.pageSize);
      if (res.code == 200) {
        this.skuInfo = res.data;
        this.totalNum = res.data.total;
      }
    },
    async btnOnSale(row) {
      console.log(row);
      let res = await this.$api.getOnSale(row.id);
      if (res.code == 200) {
        console.log(res.data);
      }
    },
    async showSkuInfo(row) {
      this.drawer = true;
      let res = await this.$api.getSkuById(row.id);
      if (res.code == 200) {
        this.skuItemInfo = res.data;
      }
    },
  },
  mounted() {
    this.skuPageInit();
  },
};
</script>

<style scoped>
.el-row >>> .el-col-5 {
  text-align: right;
}
</style>