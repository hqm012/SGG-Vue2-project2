<template>
  <div class="lineChaContent" ref="lineChaContent"></div>
</template>

<script>
// 引入 echarts
import * as echarts from "echarts";

export default {
  methods: {
    chartInit() {
      const cha = echarts.init(this.$refs.lineChaContent);
      cha.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "bar",
          },
        ],
        grid: {
          left: 0,
          right: 0,
          bottom: 0,
          top: 0,
        },
      });
    },
  },
  mounted() {
    this.chartInit();
  },
};
</script>

<style scoped>
.lineChaContent {
  width: 100%;
  height: 100%;
}
</style>