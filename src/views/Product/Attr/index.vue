<template>
  <div class="app-container">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <span>品类选择</span>
      </div>
      <CategorySelecter @getAttr="getAttr" />
    </el-card>
    <el-card
      shadow="always"
      :body-style="{ padding: '20px' }"
      style="margin-top: 20px"
    >
      <div v-show="cardIsShow">
        <el-button
          type="primary"
          size="default"
          icon="el-icon-plus"
          @click="addAtt"
          :disabled="attrInfo.length == 0"
          style="margin: 10px"
        >
          添加属性
        </el-button>
        <el-table :data="attrInfo" border stripe>
          <el-table-column
            v-for="(col, index) in columns"
            :key="col.id"
            :label="col.label"
            :width="col.width"
          >
            <template v-slot="{ row, $index }">
              <span v-if="index == 0">{{ $index + 1 }}</span>
              <span v-else-if="index == 1">{{ row.attrName }}</span>
              <span v-else-if="index == 2">
                <el-tag
                  type="success"
                  size="small"
                  effect="dark"
                  v-for="attrValue in row.attrValueList"
                  :key="attrValue.id"
                  style="margin: 5px 10px"
                >
                  {{ attrValue.valueName }}
                </el-tag>
              </span>
              <span v-else-if="index == 3">
                <el-button
                  type="warning"
                  size="small"
                  icon="el-icon-edit"
                  @click="changeAttVal(row)"
                  >编辑</el-button
                >
                <el-button type="danger" size="small" icon="el-icon-delete"
                  >删除</el-button
                >
              </span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!cardIsShow">
        <el-form :model="form" ref="form" :inline="true">
          <el-form-item label="属性名">
            <el-input
              v-model="form.attrName"
              placeholder="请输入属性名"
            ></el-input>
          </el-form-item>
          <el-button
            type="primary"
            size="default"
            icon="el-icon-plus"
            :disabled="!form.attrName"
            @click="addAttVal"
          >
            添加
          </el-button>
          <el-button
            type="warning"
            size="default"
            @click="cardIsShow = true"
            icon="el-icon-close"
          >
            取消
          </el-button>
          <el-table
            border
            stripe
            style="width: 100%; margin: 20px 0"
            :data="form.attrValueList"
          >
            <el-table-column type="index" label="序号" width="80">
            </el-table-column>
            <el-table-column label="属性值名称" width="width">
              <template v-slot="{ row, $index }">
                <el-input
                  v-model="row.valueName"
                  placeholder="请输入属性名称"
                  size="normal"
                  clearable
                  @blur="cheout(row)"
                  :ref="`inp${$index}`"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="width">
              <template v-slot="{ $index }">
                <el-popconfirm
                  title="这是一段内容确定删除吗？"
                  @onConfirm="delAtt($index)"
                >
                  <el-button
                    type="danger"
                    size="default"
                    icon="el-icon-delete"
                    slot="reference"
                    >删除</el-button
                  >
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="reqSave"
              >保存</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-close"
              @click="cardIsShow = true"
            >
              取消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import cloneDeep from "lodash/cloneDeep";
export default {
  name: "Attr",
  data() {
    return {
      categoryParams: {
        category1: "",
        category2: "",
        category3: "",
      },
      attrInfo: [],
      columns: [
        { label: "序号", width: "50px" },
        { label: "属性名称", prop: "attrName" },
        { label: "属性值列表" },
        { label: "操作" },
      ],
      cardIsShow: true,
      form: {
        attrName: "",
        attrValueList: [],
        categoryId: 0,
        categoryLevel: 3,
      },
    };
  },
  methods: {
    async getAttr(param) {
      this.categoryParams.category1 = param.category1;
      this.categoryParams.category2 = param.category2;
      this.categoryParams.category3 = param.category3;
      let res = await this.$api.reqAttrInfo(
        param.category1,
        param.category2,
        param.category3
      );
      if (res.code == 200) {
        this.attrInfo = res.data;
        this.form.categoryId = param.category3;
      } else {
        Promise.reject(res.message);
      }
    },
    addAtt() {
      this.cardIsShow = false;
      this.form.attrName = "";
      this.form.attrValueList = [];
      this.form.id = undefined;
    },
    addAttVal() {
      this.form.attrValueList.push({
        attrId: this.form.id,
        valueName: "",
      });
      this.$nextTick(() => {
        this.$refs[`inp${this.form.attrValueList.length - 1}`].focus();
        // console.log(this.$refs);
      });
    },
    changeAttVal(row) {
      this.form = cloneDeep(row);
      this.cardIsShow = false;
    },
    cheout(row) {
      if (row.valueName.trim() == "") {
        this.$message("输入不能为空");
        return;
      }
      let isRepat = this.form.attrValueList.some((item) => {
        if (row !== item) {
          return row.valueName == item.valueName;
        }
      });
      if (isRepat) {
        this.$message("输入的值已存在");
        row.valueName = "";
        return;
      }
    },
    delAtt(index) {
      this.form.attrValueList.splice(index, 1);
    },
    async reqSave() {
      let res = await this.$api.reqSaveAttr(this.form);
      if (res.code == 200) {
        await this.getAttr(this.categoryParams);
        this.cardIsShow = true;
      } else {
        this.$message.error(res.message);
        Promise.reject(res.message);
      }
    },
  },
};
</script>

<style>
</style>