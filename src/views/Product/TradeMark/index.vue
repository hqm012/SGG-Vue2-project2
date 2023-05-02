<template>
  <div class="app-container">
    <el-button type="primary" icon="el-icon-plus" @click="addTrademark"
      >添加</el-button
    >
    <el-table
      border
      stripe
      :data="trademarkInfo.records"
      style="margin-top: 10px"
    >
      <el-table-column
        v-for="col in columns"
        :type="col.type"
        :prop="col.prop"
        :key="col.id"
        :label="col.label"
        :width="col.width"
        :align="col.align"
        @size-change="sizeChange"
      >
        <template v-slot="{ row, $index }">
          <span v-if="col.id == 0">{{ $index + 1 }}</span>
          <span v-if="col.id == 1">{{ row.tmName }}</span>
          <img
            v-if="col.id == 2"
            :src="row.logoUrl"
            alt=""
            style="width: 82px; height: 82px"
          />
          <el-button
            v-if="col.id == 3"
            type="warning"
            icon="el-icon-edit"
            size="default"
            @click="changeTrademark(row)"
          >
            修改
          </el-button>
          <el-button
            v-if="col.id == 3"
            type="danger"
            icon="el-icon-delete"
            size="default"
            @click="deleteTrandemark(row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page.sync="currentPage"
      :page-sizes="[3, 5, 10, 20, 30]"
      :page-size="pageSize"
      layout=" prev, pager, next, jumper,->,total, sizes"
      :total="trademarkInfo.total"
      background
      :pager-count="7"
      align="center"
      @current-change="currentChange"
      @size-change="sizeChange"
    >
    </el-pagination>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form style="width: 80%" :model="form" :rules="rules" ref="ruleForm">
        <el-form-item
          label="品牌名称"
          :label-width="formLabelWidth"
          prop="tmName"
        >
          <el-input v-model="form.tmName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="上传logo"
          :label-width="formLabelWidth"
          prop="logoUrl"
        >
          <el-upload
            class="avatar-uploader"
            :action="imgurl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btnTrademark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "TradeMark",
  data() {
    return {
      columns: [
        {
          id: "0",
          label: "序号",
          width: "80",
          align: "center",
          type: "index",
        },
        { id: "1", label: "品牌名称", width: "width", prop: "tmName" },
        { id: "2", label: "品牌logo", width: "width", prop: "logoUrl" },
        { id: "3", label: "操作", width: "width" },
      ],
      currentPage: 1,
      pageSize: 5,
      trademarkInfo: [],
      dialogFormVisible: false,
      form: {
        tmName: "",
        logoUrl: "",
      },
      imageUrl: "",
      formLabelWidth: "120px",
      rules: {
        tmName: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        logoUrl: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
      },
    };
  },
  computed: {
    imgurl() {
      return process.env.VUE_APP_BASE_API + "/admin/product/fileUpload";
    },
  },
  methods: {
    async getTradeMarkInfo() {
      const { currentPage, pageSize } = this;
      let res = await this.$api.reqTrademarkInfo(currentPage, pageSize);
      if (res.code === 200) {
        this.trademarkInfo = res.data;
      } else {
        Promise.reject(res.message);
      }
    },
    currentChange(page) {
      this.currentPage = page;
      this.getTradeMarkInfo();
    },
    sizeChange(a) {
      this.pageSize = a;
      this.getTradeMarkInfo();
    },

    handleAvatarSuccess(res, file) {
      if (res.code == 200) {
        console.log(file);
        this.imageUrl = URL.createObjectURL(file.raw);
        this.form.logoUrl = res.data;
      } else {
        console.log(res.message);
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    addTrademark() {
      this.form = {
        tmName: "",
        logoUrl: "",
      };
      this.dialogFormVisible = true;
    },
    changeTrademark(row) {
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    btnTrademark() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          let res;
          if (this.form.id) {
            res = await this.$api.reqChangeTrademark(this.form);
          } else {
            res = await this.$api.reqAddTrademark(this.form);
          }
          if (res.code == 200) {
            this.$message(res.message);
            this.dialogFormVisible = false;
            this.getTradeMarkInfo();
          } else {
            return Promise.reject(res.message);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    deleteTrandemark(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          let res = await this.$api.reqDeleteTrademark(id);
          if (res.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getTradeMarkInfo();
          } else {
            this.$message({
              type: "info",
              message: res.message,
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.getTradeMarkInfo();
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>