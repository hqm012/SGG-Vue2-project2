<template>
  <el-card shadow="always" :body-style="{ padding: '20px' }">
    <!-- <div slot="header">
      <span>
        
      </span>
    </div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="销售额" name="sale">
        <el-row :gutter="20">
          <el-col :span="20" :offset="0">
            <div class="cardBodyTitle">销售额趋势</div>
            <chart></chart>
          </el-col>
          <el-col :span="4" :offset="0">
            <div class="cardBodyTitle">门店销售额排名</div>
            <ul class="rank">
              <li>1.肯德基</li>
              <li>2.麦当劳</li>
              <li>3.必胜客</li>
              <li>4.黄焖Jimmy饭</li>
              <li>5.螺蛳粉</li>
              <li>6.桂林米粉</li>
            </ul>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="访问量" name="visit">访问量</el-tab-pane>
      <el-tab-pane disabled>
        <span slot="label">
          <el-button type="text" size="default">本日</el-button>
          <el-button type="text" size="default">本周</el-button>
          <el-button type="text" size="default">本月</el-button>
          <el-date-picker
            v-model="date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            style="margin-left: 20px"
          >
          </el-date-picker>
        </span>
      </el-tab-pane>

      <div class="btnGroup"></div>
    </el-tabs>
  </el-card>
</template>

<script>
import chart from "./chart";

export default {
  components: {
    chart,
  },
  data() {
    return {
      activeName: "sale",
      date: "",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
>>> .el-tabs__nav {
  width: 100%;
}

>>> #tab-2 {
  position: absolute;
  right: 0;
}

.cardBodyTitle {
  font-size: 20px;
  font-weight: 500;
}

.rank {
  list-style: none;
  padding: 0;
}
.rank li {
  padding-top: 10px;
}
</style>