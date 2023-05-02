<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span>总销售额</span>
          </div>
          <cardContent>
            <template v-slot:headNum>
              <div class="headNum">￥126560</div>
            </template>
            <template slot="foot">
              <div>日销售额￥12423</div>
            </template>
            <template slot="chart">
              <div style="padding-top: 60px">周通比 56.67% 日同比 1916%</div>
            </template>
          </cardContent>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span>访问量</span>
          </div>
          <cardContent>
            <template v-slot:headNum>
              <div class="headNum">697</div>
            </template>
            <template slot="foot">
              <div>总访问量：99</div>
            </template>
            <template slot="chart">
              <lineChart></lineChart>
            </template>
          </cardContent>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span>支付笔数</span>
          </div>
          <cardContent>
            <template v-slot:headNum>
              <div class="headNum">998</div>
            </template>
            <template slot="foot">
              <div>总支付：$9528</div>
            </template>
            <template slot="chart">
              <barChart></barChart>
            </template>
          </cardContent>
        </el-card>
      </el-col>
      <el-col :span="6" :offset="0">
        <el-card shadow="always" :body-style="{ padding: '20px' }">
          <div slot="header">
            <span>运营活动效果</span>
          </div>
          <cardContent>
            <template v-slot:headNum>
              <div class="headNum">78%</div>
            </template>
            <template slot="foot">
              <div>总进度99%</div>
            </template>
            <template slot="chart">
              <progressChart></progressChart>
            </template>
          </cardContent>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import cardContent from "./cardContent";
import lineChart from "./lineChart";
import barChart from "./barChart";
import progressChart from "./progressChart";

export default {
  components: { cardContent, lineChart, barChart, progressChart },
};
</script>

<style>
.headNum {
  font-size: 28px;
}
</style>