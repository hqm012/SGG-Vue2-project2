<template>
  <div class="app-container">
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      style="margin-bottom: 20px"
    >
      <div slot="header">
        <span>分类选择</span>
      </div>
      <CategorySelecter @getAttr="getAttr" />
    </el-card>
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      v-if="scene == 0"
    >
      <div slot="header">
        <span>spu管理</span>
      </div>
      <el-button
        type="primary"
        size="default"
        :disabled="!spuInfo.records"
        @click="showSpuAbout"
        >添加SPU</el-button
      >
      <el-table :data="spuInfo.records" border stripe>
        <el-table-column
          v-for="col in columns"
          :key="col.id"
          :label="col.label"
          :width="col.width"
          :type="col.type"
          :prop="col.prop"
        >
          <template v-if="col.id == 3" v-slot="{ row }">
            <div v-if="col.id == 3">
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-plus"
                @click="showSkuAbout(row)"
                >添加SKU</el-button
              >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-edit"
                @click="showSpuAbout(row)"
                >修改SPU</el-button
              >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-view"
                @click="checkSkuList(row)"
                >查看当前spu全部sku列表</el-button
              >
              <el-button
                type="primary"
                size="mini"
                icon="el-icon-delete"
                @click="delSpu(row)"
                >删除spu</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        align="center"
        layout=" prev, pager, next, jumper,->,total, sizes"
        :page-sizes="[5, 10, 20]"
        :page-size="limit"
        :pager-count="7"
        :current-page.sync="page"
        :total="spuInfo.total"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
      <el-dialog :title="dialogTitle" :visible.sync="dialogTableVisible">
        <el-table :data="skuList">
          <el-table-column label="名称" prop="skuName"> </el-table-column>
          <el-table-column label="价格" prop="price"> </el-table-column>
          <el-table-column label="重量" prop="weight"> </el-table-column>
          <el-table-column label="默认图片">
            <template v-slot="{ row }">
              <img :src="row.skuDefaultImg" alt="" style="width: 100px" />
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
    <SpuAbout v-show="scene == 1" @changeScene="changeScene" ref="SpuAbout" />
    <SkuAbout v-show="scene == 2" @changeScene="changeScene" ref="SkuAbout" />
  </div>
</template>

<script>
import SpuAbout from "./SpuAbout";
import SkuAbout from "./SkuAbout";

export default {
  name: "Spu",
  components: { SpuAbout, SkuAbout },
  data() {
    return {
      columns: [
        { id: 0, label: "序号", width: "width", type: "index" },
        { id: 1, label: "SPU名称", width: "width", prop: "spuName" },
        { id: 2, label: "SPU描述", width: "width", prop: "description" },
        { id: 3, label: "操作", width: "width" },
      ],
      categoryInfo: {},
      page: 1,
      limit: 5,
      spuInfo: {},
      scene: 0,
      dialogTableVisible: false,
      dialogTitle: "",
      skuList: [],
    };
  },
  methods: {
    getAttr(categoryInfo) {
      this.categoryInfo = categoryInfo;
      this.getSpuInfo();
    },
    currentChange(val) {
      this.page = val;
      this.getSpuInfo();
    },
    sizeChange(val) {
      this.limit = val;
      this.getSpuInfo();
    },
    async getSpuInfo() {
      let res = await this.$api.getSpu(
        this.page,
        this.limit,
        this.categoryInfo.category3
      );
      if (res.code == 200) {
        this.spuInfo = res.data;
      } else {
        Promise.reject(res.message);
      }
    },
    showSpuAbout(row) {
      this.scene = 1;
      if (row.id) {
        this.$refs.SpuAbout.reqInit(row);
      } else {
        this.$refs.SpuAbout.reqAddInit(this.categoryInfo);
      }
    },
    showSkuAbout(row) {
      this.scene = 2;
      if (row.id) {
        this.$refs.SkuAbout.skuInit(this.categoryInfo, row);
      } else {
        this.$refs.SkuAbout.skuInit(this.categoryInfo);
      }
    },
    async changeScene(val) {
      await this.getSpuInfo();
      this.scene = val;
    },
    async delSpu(row) {
      let res = await this.$api.reqDeleteSpu(row.id);
      this.getSpuInfo();
    },
    async checkSkuList(row) {
      console.log(row);
      this.dialogTitle = row.spuName;
      this.dialogTableVisible = true;
      this.skuList = [];
      let res = await this.$api.getFindBySpuId(row.id);
      if (res.code == 200) {
        this.skuList = res.data;
      }
      console.log(res);
    },
  },
  mounted() {},
};
</script>

<style>
</style>