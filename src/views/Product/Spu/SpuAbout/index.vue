<template>
  <div>
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>我是Spu相关页</span>
      </div>
      <el-form
        :model="spuForId"
        ref="form"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item label="SPU名称">
          <el-input v-model="spuForId.spuName" placeholder="SPU名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="spuForId.tmId"
            value-key=""
            placeholder="请选择品牌"
            filterable
          >
            <el-option
              v-for="trademarkItem in trademarkList"
              :key="trademarkItem.id"
              :label="trademarkItem.tmName"
              :value="trademarkItem.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input
            v-model="spuForId.description"
            rows="3"
            placeholder="SPU描述"
            clearable
          ></el-input>
        </el-form-item>
        <el-form-item label="SPU图片" size="normal">
          <!-- :on-exceed="超出个数限制时的钩子"
          :file-list="上传文件的列表" -->
          <el-upload
            action="/dev-api/admin/product/fileUpload"
            ref="upload"
            :on-remove="handleRemove"
            :on-preview="handlePictureCardPreview"
            multiple
            list-type="picture-card"
            :file-list="spuImageListShow"
            :on-success="handleUploadSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="销售属性" size="normal">
          <el-select
            v-model="addAttrNameAndId"
            :placeholder="`还有${unSelectAttr.length}未选择`"
            clearable
            filterable
          >
            <el-option
              :label="unSelect.name"
              :value="`${unSelect.id}:${unSelect.name}`"
              v-for="unSelect in unSelectAttr"
              :key="unSelect.id"
            >
            </el-option>
          </el-select>
          <el-button
            type="primary"
            size="default"
            icon="el-icon-plus"
            :disabled="!addAttrNameAndId"
            @click="btnAddAttrNameAndId"
            >添加销售属性</el-button
          >
          <el-table
            border
            stripe
            style="margin-top: 20px"
            :data="spuForId.spuSaleAttrList"
          >
            <el-table-column
              prop="prop"
              label="序号"
              width="80px"
              align="center"
              type="index"
            >
            </el-table-column>
            <el-table-column prop="saleAttrName" label="属性名">
            </el-table-column>
            <el-table-column prop="prop" label="属性值名称列表">
              <template v-slot="{ row }">
                <el-tag
                  :key="tag.id"
                  v-for="tag in row.spuSaleAttrValueList"
                  closable
                  :disable-transitions="false"
                  @close="
                    row.spuSaleAttrValueList.splice(
                      row.spuSaleAttrValueList.indexOf(tag),
                      1
                    )
                  "
                >
                  {{ tag.saleAttrValueName }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="row.inputVisible"
                  v-model="row.inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm(row)"
                  @blur="handleInputConfirm(row)"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput(row)"
                >
                  + 添加
                </el-button>
              </template>
            </el-table-column>
            <el-table-column prop="prop" label="操作">
              <template v-slot="{ row, $index }">
                <el-button
                  type="danger"
                  size="mini"
                  @click="spuForId.spuSaleAttrList.splice($index, 1)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item label="" size="normal">
          <el-button type="primary" size="default" @click="saveSpuInfo"
            >保存</el-button
          >
          <el-button @click="$emit('changeScene', 0)">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "clone-deep";
export default {
  data() {
    return {
      options: {},
      dialogImageUrl: "",
      dialogVisible: false,
      row: {},
      spuForId: {
        spuName: "",
        category3Id: 0,
        description: "",
        spuImageList: [],
        spuSaleAttrList: [],
        tmId: "",
      },
      trademarkList: [],
      spuImageList: [],
      spuImageListShow: [],
      saleAttrList: [],
      addAttrNameAndId: "",
    };
  },
  computed: {
    unSelectAttr() {
      let result = this.saleAttrList.filter((item) => {
        return this.spuForId.spuSaleAttrList.every((item1) => {
          return item.name != item1.saleAttrName;
        });
      });
      return result;
    },
  },
  methods: {
    handleRemove(file, fileList) {
      this.spuForId.spuImageList.forEach((item, index) => {
        if (item.id == file.id) {
          this.spuForId.spuImageList.splice(index, 1);
        }
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async reqInit(row) {
      let res = await this.$api.getSpuById(row.id);
      if (res.code == 200) {
        this.spuForId = res.data;
      } else {
        Promise.reject(res.message);
      }
      let trademarkRes = await this.$api.getTrademarkList();
      if (trademarkRes.code == 200) {
        this.trademarkList = trademarkRes.data;
      }
      let spuImageListRes = await this.$api.getSpuImageList(row.id);
      if (spuImageListRes.code == 200) {
        this.spuImageList = spuImageListRes.data;
      }
      let saleAttrListRes = await this.$api.getSaleAttrList();
      if (saleAttrListRes.code == 200) {
        this.saleAttrList = saleAttrListRes.data;
      }
    },
    async reqAddInit(categoryInfo) {
      this.spuForId = {
        spuName: "",
        category3Id: 0,
        description: "",
        spuImageList: [],
        spuSaleAttrList: [],
        tmId: "",
      };
      this.spuForId.category3Id = categoryInfo.category3;
      let trademarkRes = await this.$api.getTrademarkList();
      if (trademarkRes.code == 200) {
        this.trademarkList = trademarkRes.data;
      }
      let saleAttrListRes = await this.$api.getSaleAttrList();
      if (saleAttrListRes.code == 200) {
        this.saleAttrList = saleAttrListRes.data;
      }
    },
    handleUploadSuccess(response, file, fileList) {
      this.spuForId.spuImageList.push({
        imgName: file.name,
        imgUrl: response.data,
      });
    },
    btnAddAttrNameAndId() {
      const [baseSaleAttrId, saleAttrName] = this.addAttrNameAndId.split(":");
      this.spuForId.spuSaleAttrList.push({
        baseSaleAttrId: baseSaleAttrId * 1,
        saleAttrName,
        spuSaleAttrValueList: [],
      });
    },
    showInput(row) {
      this.$set(row, "inputVisible", true);
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
      this.$set(row, "inputValue", "");
    },
    handleInputConfirm(row) {
      row.inputVisible = false;
      const { baseSaleAttrId, inputValue } = row;
      if (!inputValue) {
        return;
      }
      let res = row.spuSaleAttrValueList.some((item) => {
        return item.saleAttrValueName == inputValue;
      });
      if (res) {
        this.$message("属性已存在");
        return;
      }
      row.spuSaleAttrValueList.push({
        baseSaleAttrId,
        saleAttrValueName: inputValue,
      });
    },
    async saveSpuInfo() {
      let res;
      if (this.spuForId.id) {
        res = await this.$api.postUpdateSpuInfo(this.spuForId);
      } else {
        res = await this.$api.postSaveSpuInfo(this.spuForId);
      }
      if (res.code == 200) {
        this.$message("修改成功");
        this.$emit("changeScene", 0);
      } else {
        Promise.reject(res.message);
        console.log(res.message);
      }
    },
  },
  watch: {
    spuImageList() {
      this.spuImageListShow = cloneDeep(this.spuImageList);
      this.spuForId.spuImageList = cloneDeep(this.spuImageList);
      let resArr = this.spuImageListShow.map((item) => {
        item.name = item.imgName;
        item.url = item.imgUrl;
        return item;
      });
    },
  },
  mounted() {},
};
</script>

<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>