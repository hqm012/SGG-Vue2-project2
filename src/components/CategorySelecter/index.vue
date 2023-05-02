<template>
  <el-form ref="form" :model="form" label-width="80px" :inline="true">
    <el-form-item label="品类1">
      <el-select
        v-model="form.category1"
        placeholder="请选择品类一"
        @change="sel1"
      >
        <el-option
          v-for="cg1Item in category1List"
          :key="cg1Item.id"
          :label="cg1Item.name"
          :value="cg1Item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="品类2">
      <el-select
        v-model="form.category2"
        placeholder="请选择品类二"
        @change="sel2"
      >
        <el-option
          v-for="cg2Item in category2List"
          :key="cg2Item.id"
          :label="cg2Item.name"
          :value="cg2Item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="品类3">
      <el-select
        v-model="form.category3"
        placeholder="请选择品类三"
        @change="sel3"
      >
        <el-option
          v-for="cg3Item in category3List"
          :key="cg3Item.id"
          :label="cg3Item.name"
          :value="cg3Item.id"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "CategorySelecter",
  data() {
    return {
      category1List: [],
      category2List: [],
      category3List: [],
      form: {
        category1: "",
        category2: "",
        category3: "",
      },
    };
  },
  methods: {
    async getCategory1Info() {
      let res = await this.$api.reqCategory1();
      if (res.code == 200) {
        this.category1List = res.data;
      } else {
        Promise.reject(res.message);
      }
    },
    async sel1() {
      let res = await this.$api.reqCategory2(this.form.category1);
      if (res.code == 200) {
        this.category2List = res.data;
        this.form.category2 = "";
        this.form.category3 = "";
      } else {
        Promise.reject(res.message);
      }
    },
    async sel2() {
      let res = await this.$api.reqCategory3(this.form.category2);
      if (res.code == 200) {
        this.category3List = res.data;
        this.form.category3 = "";
      } else {
        Promise.reject(res.message);
      }
    },
    sel3() {
      this.$emit("getAttr", this.form);
    },
  },
  mounted() {
    this.getCategory1Info();
  },
};
</script>

<style>
</style>